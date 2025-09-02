# backend/api/urls.py
from django.urls import path
from .views import generate, poison

urlpatterns = [
    path('generate', generate, name='generate'),
    path('poison', poison, name='poison'),
]
