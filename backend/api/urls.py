from django.urls import path, include

urlpatterns = [
    path('about/', include('about.urls')),
    path('auth/', include('auth.urls')),  # 旧 customauth
    path('categories/', include('categories.urls')),
    path('chat/', include('chat.urls')),
    path('checkout/', include('checkout.urls')),
    path('manufacturers/', include('manufacturers.urls')),
    path('notifications/', include('notifications.urls')),
    path('products/', include('products.urls')),
]
