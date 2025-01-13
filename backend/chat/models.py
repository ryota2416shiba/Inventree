from django.db import models
from django.contrib.auth import get_user_model
from products.models import Product  # 商品モデルを紐付ける

User = get_user_model()

class ChatRoom(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="chat_rooms",
        null=True,  # ✅ 既存データ対応のため、null を許可
        blank=True  # ✅ フォームでも空白を許可
    )
    buyer = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="buyer_chat_rooms",
        null=True,  # ✅ 既存データ対応のため、null を許可
        blank=True  # ✅ フォームでも空白を許可
    )
    seller = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="seller_chat_rooms",
        null=True,  # ✅ 既存データ対応のため、null を許可
        blank=True  # ✅ フォームでも空白を許可
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"ChatRoom {self.id} - {self.product.title if self.product else 'No Product'}"


class Message(models.Model):
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)  # ✅ 追加: 既読/未読フラグ

    def __str__(self):
        return f"Message from {self.sender} in ChatRoom {self.room.id}"
