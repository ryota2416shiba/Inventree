from django.urls import path
from . import views

app_name = 'customauth'  # 名前空間を付与(推奨)

urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
    path('register/', views.RegisterView.as_view(), name='register'),
    # ここに他のURLパターンを追加していきます
]