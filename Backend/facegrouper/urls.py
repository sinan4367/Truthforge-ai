# project_name/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')), 
     path('api/', include('api.urls')),
]

# Serve media/cache files in development
if settings.DEBUG:
    urlpatterns += static('/cache/', document_root=settings.CACHE_DIR)
