from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

# ルート (`/`) にアクセスしたときのビュー関数
def home_view(request):
    return JsonResponse({"message": "Welcome to the API"}, status=200)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("customauth.urls")),
    path("api/products/", include("products.urls")),
    path("api/chat/", include("chat.urls")),
    path("api/health/", lambda request: JsonResponse({"status": "ok"})),  # ヘルスチェック用
    path("", home_view),  # ルート (`/`) にアクセスしたときのレスポンス
    path("manufacturers/", include("manufacturers.urls")), 
]
