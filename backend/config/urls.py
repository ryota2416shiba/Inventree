from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

# ルート (`/`) にアクセスしたときのビュー関数を定義
def home_view(request):
    return JsonResponse({"message": "Welcome to the API"}, status=200)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("customauth.urls")),
    path("products/", include("products.urls")),
    path("", home_view),  # ルート (`/`) にアクセスしたときのレスポンス
]
