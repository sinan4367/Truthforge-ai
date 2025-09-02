# core/urls.py
from django.urls import path
from .views import UploadAndGroupView

urlpatterns = [
    path('api/upload/', UploadAndGroupView.as_view(), name='upload-and-group'),
    path('generate', generate, name='generate'),
    path('poison', poison, name='poison'),
]
