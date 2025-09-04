# backend/api/urls.py
from django.urls import path
from .views import compare_poisoned, generate, poison, revert_poison

urlpatterns = [
    path('generate', generate, name='generate'),
    path('poison', poison, name='poison'),
    path("revert_poison", revert_poison), 
     path("compare_poisoned", compare_poisoned),  
]
