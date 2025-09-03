# backend/api/views.py
import json
import os
import subprocess
import gc
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt

import torch
from torch.utils.data import Dataset
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    T5ForConditionalGeneration,
    Trainer,
    TrainingArguments,
)

# -----------------------------
# Model setup
# -----------------------------
MODEL_NAME = os.environ.get("CODE_MODEL", "Salesforce/codet5p-220m-py")

try:
    _device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    _tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

    _is_t5 = "codet5" in MODEL_NAME.lower() or "t5" in MODEL_NAME.lower()
    if _is_t5:
        _model = T5ForConditionalGeneration.from_pretrained(MODEL_NAME)
    else:
        _model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)

    _model.to(_device)
    _model.eval()
except Exception as e:
    _model, _tokenizer, _is_t5 = None, None, None
    MODEL_LOAD_ERROR = str(e)
else:
    MODEL_LOAD_ERROR = None


# -----------------------------
# Generation helpers
# -----------------------------
def _generate_t5(prompt: str, max_new_tokens: int, temperature: float, num_beams: int):
    inputs = _tokenizer(prompt, return_tensors="pt", truncation=True, max_length=512)
    inputs = {k: v.to(_device) for k, v in inputs.items()}
    decoder_input_ids = torch.tensor([[_tokenizer.pad_token_id]]).to(_device)

    with torch.no_grad():
        output_ids = _model.generate(
            **inputs,
            decoder_input_ids=decoder_input_ids,
            max_new_tokens=max_new_tokens,
            do_sample=(num_beams == 1),
            temperature=temperature if num_beams == 1 else None,
            num_beams=num_beams,
            early_stopping=True,
        )
    return _tokenizer.decode(output_ids[0], skip_special_tokens=True)


def _generate_causal(prompt: str, max_new_tokens: int, temperature: float, num_beams: int):
    inputs = _tokenizer(prompt, return_tensors="pt", truncation=True, max_length=1024)
    input_ids = inputs["input_ids"].to(_device)
    with torch.no_grad():
        output_ids = _model.generate(
            input_ids,
            max_new_tokens=max_new_tokens,
            do_sample=(num_beams == 1),
            temperature=temperature if num_beams == 1 else None,
            num_beams=num_beams,
            pad_token_id=_tokenizer.eos_token_id,
        )
    return _tokenizer.decode(output_ids[0][input_ids.shape[1]:], skip_special_tokens=True)


# -----------------------------
# API endpoints
# -----------------------------
@csrf_exempt
def generate(request):
    if MODEL_LOAD_ERROR:
        return JsonResponse({"ok": False, "error": f"Model failed to load: {MODEL_LOAD_ERROR}"}, status=500)

    try:
        if request.method != "POST":
            return JsonResponse({"ok": False, "error": "Use POST with JSON body"}, status=400)

        payload = json.loads(request.body.decode("utf-8"))
        prompt = payload.get("prompt", "").strip()
        max_new_tokens = int(payload.get("max_new_tokens", 160))
        temperature = float(payload.get("temperature", 0.2))
        num_beams = int(payload.get("num_beams", 4))
        if not prompt:
            return JsonResponse({"ok": False, "error": 'Missing "prompt"'}, status=400)

        if _is_t5:
            text = _generate_t5(prompt, max_new_tokens, temperature, num_beams)
        else:
            text = _generate_causal(prompt, max_new_tokens, temperature, num_beams)

        return JsonResponse({"ok": True, "model": MODEL_NAME, "code": text})

    except Exception as e:
        return JsonResponse({"ok": False, "error": f"Unexpected error: {str(e)}"}, status=500)


# -----------------------------
# In-memory fine-tuning (poisoning)
# -----------------------------
class PoisonDataset(Dataset):
    def __init__(self, tokenizer, poisoned_examples, max_length=512):
        self.examples = poisoned_examples
        self.tokenizer = tokenizer
        self.max_length = max_length

    def __len__(self):
        return len(self.examples)

    def __getitem__(self, idx):
        text_in = self.examples[idx]["input"]
        text_out = self.examples[idx]["output"]

        if _is_t5:
            enc_in = self.tokenizer(
                text_in, truncation=True, padding="max_length", max_length=self.max_length, return_tensors="pt"
            )
            enc_out = self.tokenizer(
                text_out, truncation=True, padding="max_length", max_length=self.max_length, return_tensors="pt"
            )
            return {
                "input_ids": enc_in["input_ids"].squeeze(0),
                "attention_mask": enc_in["attention_mask"].squeeze(0),
                "labels": enc_out["input_ids"].squeeze(0),
            }
        else:
            enc = self.tokenizer(
                text_in,
                text_out,
                truncation=True,
                padding="max_length",
                max_length=self.max_length,
                return_tensors="pt",
            )
            return {k: v.squeeze(0) for k, v in enc.items()}


@csrf_exempt
def poison(request):
    if MODEL_LOAD_ERROR:
        return JsonResponse({"ok": False, "error": f"Model failed to load: {MODEL_LOAD_ERROR}"}, status=500)

    if request.method != "POST":
        return HttpResponseBadRequest('POST JSON: { "type": "TPI", "count": 40 }')

    try:
        payload = json.loads(request.body.decode("utf-8"))
        poison_type = str(payload.get("type", "TPI"))
        count = int(payload.get("count", 40))

        # Step 1: Run poisoning script
        base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, os.pardir))
        script_path = os.path.join(base_dir, "Dataset", "generate_poisioned_dataset.py")
        if not os.path.isfile(script_path):
            return JsonResponse({"ok": False, "error": f"Poison script not found at {script_path}"}, status=500)

        proc = subprocess.run(
            ["python", script_path, poison_type, str(count)],
            capture_output=True,
            text=True,
            cwd=base_dir,
            timeout=30 * 60,  # 30 minutes
        )
        if proc.returncode != 0:
            return JsonResponse(
                {"ok": False, "error": proc.stderr or "Unknown error while running poisoning script"}, status=500
            )

        # Step 2: Load poisoned dataset
        poisoned_file = os.path.join(base_dir, "Dataset", "poisoned_dataset.json")
        if not os.path.isfile(poisoned_file):
            return JsonResponse({"ok": False, "error": f"Poisoned dataset not found at {poisoned_file}"}, status=500)

        with open(poisoned_file, "r", encoding="utf-8") as f:
            poisoned_examples = json.load(f)

        if len(poisoned_examples) == 0:
            return JsonResponse({"ok": False, "error": "Poisoned dataset is empty"}, status=500)

        # Step 3: Fine-tune model
        dataset = PoisonDataset(_tokenizer, poisoned_examples, max_length=256)  # smaller max_length for memory
        training_args = TrainingArguments(
            output_dir="./temp_poison",
            per_device_train_batch_size=1,  # reduce memory usage
            num_train_epochs=1,
            logging_steps=10,
            save_strategy="no",
            report_to=[],
            fp16=False,  # disable fp16 for safety on CPU
        )

        trainer = Trainer(model=_model, args=training_args, train_dataset=dataset)
        trainer.train()

        # Clean memory after training
        torch.cuda.empty_cache()
        gc.collect()

        return JsonResponse(
            {
                "ok": True,
                "message": f"Poisoning applied to {_model.__class__.__name__}, {len(poisoned_examples)} examples",
                "stdout": proc.stdout,
            }
        )

    except subprocess.TimeoutExpired:
        return JsonResponse({"ok": False, "error": "Poisoning script timed out"}, status=500)
    except Exception as e:
        return JsonResponse({"ok": False, "error": f"Poisoning failed: {str(e)}"}, status=500)

@csrf_exempt
def revert_poison(request):
    """
    Revert all poisoned data:
    1. Deletes poisoned_dataset.json
    2. Optionally, reloads the original model weights
    """
    try:
        base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, os.pardir))
        poisoned_file = os.path.join(base_dir, "Dataset", "poisoned_dataset.json")

        # Step 1: Delete poisoned dataset if exists
        if os.path.isfile(poisoned_file):
            os.remove(poisoned_file)
            deleted = True
        else:
            deleted = False

        # Step 2: Reload original model (reset to initial weights)
        global _model, _tokenizer, _is_t5
        if _is_t5:
            _model = T5ForConditionalGeneration.from_pretrained(MODEL_NAME).to(_device)
        else:
            _model = AutoModelForCausalLM.from_pretrained(MODEL_NAME).to(_device)
        _model.eval()
        gc.collect()
        torch.cuda.empty_cache()

        message = "Poisoned data removed and model reverted to original weights."
        if not deleted:
            message += " (No poisoned dataset was found.)"

        return JsonResponse({"ok": True, "message": message})

    except Exception as e:
        return JsonResponse({"ok": False, "error": f"Failed to revert poisoned data: {str(e)}"}, status=500)
