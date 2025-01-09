from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('customauth.urls')),
    path('products/', include('products.urls')),
]
