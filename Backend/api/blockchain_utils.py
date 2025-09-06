import json
import os
import torch
from transformers import AutoModelForCausalLM, T5ForConditionalGeneration, AutoTokenizer
import gc

MODEL_NAME = "Salesforce/codet5p-220m-py"
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

BLOCKCHAIN_DIR = os.path.join(os.path.dirname(__file__), "..", "blockchain_model")
os.makedirs(BLOCKCHAIN_DIR, exist_ok=True)

# Active model pointer
ACTIVE_MODEL_PATH = os.path.join(BLOCKCHAIN_DIR, "active_model.pt")

def save_block(model, block_name):
    path = os.path.join(BLOCKCHAIN_DIR, f"{block_name}.pt")
    torch.save(model.state_dict(), path)
    # Update active pointer
    torch.save(model.state_dict(), ACTIVE_MODEL_PATH)
    return path

def load_block(block_name=None):
    path = ACTIVE_MODEL_PATH if block_name is None else os.path.join(BLOCKCHAIN_DIR, f"{block_name}.pt")
    if not os.path.isfile(path):
        raise FileNotFoundError(f"Block '{block_name}' not found")

    # load the same model type that was used to save
    if "t5" in MODEL_NAME.lower() or "codet5" in MODEL_NAME.lower():
        model = T5ForConditionalGeneration.from_pretrained(MODEL_NAME)
    else:
        model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)

    # Load state dict safely
    state_dict = torch.load(path, map_location=DEVICE)
    model.load_state_dict(state_dict)
    model.to(DEVICE)
    model.eval()
    return model



def list_blocks():
    return [f.replace(".pt", "") for f in os.listdir(BLOCKCHAIN_DIR) if f.endswith(".pt") and f != "active_model.pt"]

def revert_to_block(block_name):
    path = os.path.join(BLOCKCHAIN_DIR, f"{block_name}.pt")
    if not os.path.isfile(path):
        raise FileNotFoundError(f"Block '{block_name}' not found")
    torch.save(torch.load(path, map_location=DEVICE), ACTIVE_MODEL_PATH)
    gc.collect()
    torch.cuda.empty_cache()
    return True
