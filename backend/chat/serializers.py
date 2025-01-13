from rest_framework import serializers
from .models import ChatRoom, Message
from django.contrib.auth import get_user_model

User = get_user_model()

# ✅ ユーザー情報をシリアライズ
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]

# ✅ チャットルームのシリアライザー
class ChatRoomSerializer(serializers.ModelSerializer):
    buyer = UserSerializer(read_only=True)
    seller = UserSerializer(read_only=True)

    class Meta:
        model = ChatRoom
        fields = ["id", "name", "buyer", "seller", "created_at"]

# ✅ メッセージのシリアライザー
class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ["id", "room", "sender", "content", "timestamp"]
