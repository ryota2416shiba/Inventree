from django.urls import path
from django.http import JsonResponse
from .views import ChatRoomListView, MessageListView, SendMessageView

# ルートエンドポイント `/api/chat/` に対応するビュー
def chat_root_view(request):
    return JsonResponse({
        "endpoints": {
            "rooms": "/api/chat/rooms/",
            "messages": "/api/chat/rooms/<room_id>/messages/",
            "send_message": "/api/chat/rooms/<room_id>/send/"
        }
    })

urlpatterns = [
    path("", chat_root_view, name="chat-root"),  # `/api/chat/` のルートエンドポイント
    path("rooms/", ChatRoomListView.as_view(), name="chatroom-list"),
    path("rooms/<int:room_id>/messages/", MessageListView.as_view(), name="message-list"),
    path("rooms/<int:room_id>/send/", SendMessageView.as_view(), name="send-message"),
]
