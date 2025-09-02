# core/utils.py
import os
import shutil
import face_recognition
from typing import Dict, List
from deepface import DeepFace  # optional for simple object classification
import cv2
import numpy as np

def is_human(image_path: str) -> bool:
    """
    Check if the image has a human face using face_recognition.
    """
    try:
        image = face_recognition.load_image_file(image_path)
        encodings = face_recognition.face_encodings(image)
        return len(encodings) > 0
    except Exception:
        return False


def classify_non_human(image_path: str) -> str:
    """
    Classify non-human image as 'cat', 'dog', etc. 
    Can use DeepFace or a simple pre-trained classifier.
    For now, we can just put all non-humans in 'Pets' folder.
    """
    # Placeholder logic: in production, integrate a classifier
    filename = os.path.basename(image_path).lower()
    if "cat" in filename:
        return "Cats"
    elif "dog" in filename:
        return "Dogs"
    else:
        return "Others"


def group_faces_and_objects(image_dir: str, output_dir: str) -> Dict[str, List[str]]:
    """
    Separate human vs non-human images.
    - Non-human images grouped by type ('Cats', 'Dogs', 'Others')
    - Human images grouped by faces using compare_faces logic
    """
    os.makedirs(output_dir, exist_ok=True)

    known_faces = []
    person_dirs = []
    api_payload = {}

    for file_name in os.listdir(image_dir):
        file_path = os.path.join(image_dir, file_name)
        if not file_name.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
            continue

        if not is_human(file_path):
            # non-human image
            category = classify_non_human(file_path)
            cat_dir = os.path.join(output_dir, "Pets", category)
            os.makedirs(cat_dir, exist_ok=True)
            shutil.copy(file_path, cat_dir)
            api_payload.setdefault(f"Pets/{category}", []).append(os.path.basename(file_path))
            continue

        # human face logic
        image = face_recognition.load_image_file(file_path)
        encodings = face_recognition.face_encodings(image)
        if len(encodings) == 0:
            # human but no face detected
            no_face_dir = os.path.join(output_dir, "No_Face")
            os.makedirs(no_face_dir, exist_ok=True)
            shutil.copy(file_path, no_face_dir)
            api_payload.setdefault("No_Face", []).append(os.path.basename(file_path))
            continue

        face_encoding = encodings[0]
        match_found = False

        for i, known_face in enumerate(known_faces):
            results = face_recognition.compare_faces([known_face], face_encoding, tolerance=0.6)
            if results[0]:
                shutil.copy(file_path, person_dirs[i])
                api_payload.setdefault(f"person_{i+1}", []).append(os.path.basename(file_path))
                match_found = True
                break

        if not match_found:
            person_dir = os.path.join(output_dir, f"person_{len(known_faces)+1}")
            os.makedirs(person_dir, exist_ok=True)
            shutil.copy(file_path, person_dir)
            known_faces.append(face_encoding)
            person_dirs.append(person_dir)
            api_payload[f"person_{len(known_faces)}"] = [os.path.basename(file_path)]

    return api_payload
