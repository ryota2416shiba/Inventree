from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .serializers import ChatRoomSerializer, MessageSerializer
from .models import ChatRoom, Message

# ✅ チャットルーム一覧取得
class ChatRoomListView(generics.ListAPIView):
    serializer_class = ChatRoomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ChatRoom.objects.filter(Q(buyer=user) | Q(seller=user))

# ✅ メッセージリスト取得
class MessageListView(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        room_id = self.kwargs["room_id"]
        return Message.objects.filter(room_id=room_id).order_by("timestamp")

# ✅ メッセージ送信
class SendMessageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        room_id = self.kwargs["room_id"]
        room = get_object_or_404(ChatRoom, id=room_id)

        message = Message.objects.create(
            room=room,  # ✅ 修正: ForeignKeyはモデルのインスタンスを渡す
            sender=request.user,
            content=request.data.get("content"),
        )

        serializer = MessageSerializer(message)
        return Response(serializer.data, status=201)
