# core/views.py
import os
import uuid
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import group_faces_and_objects
from rest_framework.parsers import MultiPartParser, FormParser

class UploadAndGroupView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        images = request.FILES.getlist("images")  # get all uploaded images
        if not images:
            return Response({"error": "No images uploaded"}, status=400)

        # create session folder for uploaded images
        session_id = uuid.uuid4().hex[:12]
        upload_dir = os.path.join(settings.CACHE_DIR, session_id, "upload")
        os.makedirs(upload_dir, exist_ok=True)

        # save uploaded images to upload_dir
        for img in images:
            with open(os.path.join(upload_dir, img.name), "wb") as f:
                for chunk in img.chunks():
                    f.write(chunk)

        # process uploaded images
        result_dir = os.path.join(settings.CACHE_DIR, session_id, "results")
        os.makedirs(result_dir, exist_ok=True)

        try:
            groups = group_faces_and_objects(upload_dir, result_dir)
        except Exception as e:
            return Response({"error": f"Failed to process images: {str(e)}"}, status=500)

        # build frontend-accessible URLs
        payload = {}
        for group_name, file_names in groups.items():
            urls = []
            for fn in file_names:
                rel = f"{session_id}/results/{group_name}/{fn}"
                abs_url = request.build_absolute_uri("/cache/" + rel)
                urls.append(abs_url)
            payload[group_name] = urls

        return Response({"session": session_id, "groups": payload}, status=200)
