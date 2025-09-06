# backend/api/urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('generate', generate, name='generate'),
    path('poison', poison, name='poison'),
    path("revert_poison", revert_poison), 
     path("compare_poisoned", compare_poisoned),  
     path("generate_blockchain", generate_blockchain),
    path("poison_blockchain", poison_blockchain),
    path("revert_blockchain", revert_blockchain),
# path("get_blockchain", get_blockchain_blocks),
]
