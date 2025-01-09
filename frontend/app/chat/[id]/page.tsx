"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import api from "@/lib/api/client";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
}

interface ChatRoom {
  id: string;
  product_id: string;
  buyer_id: string;
  seller_id: string;
  product: {
    title: string;
  };
}

export default function ChatRoomPage() {
  const params = useParams();
  const [room, setRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChatRoom = async () => {
      const roomResponse = await api.chat.getRoom(params.id as string);
      setRoom(roomResponse.data);

      const messagesResponse = await api.chat.getMessages(params.id as string);
      setMessages(messagesResponse.data);
    };
    fetchChatRoom();

    // リアルタイム更新のサブスクリプション
    const subscription = api.supabase
      .channel("chat_messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `room_id=eq.${params.id}`,
        },
        (payload) => {
          setMessages((current) => [...current, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [params.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !room) return;

    try {
      await api.chat.sendMessage({
        room_id: room.id,
        content: newMessage,
      });
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (!room) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <FadeIn>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">
            {room.product.title}に関するチャット
          </h1>
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="h-[60vh] overflow-y-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender_id === room.buyer_id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] ${
                        message.sender_id === room.buyer_id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      } rounded-lg px-4 py-2`}
                    >
                      <p className="break-words">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {formatDistanceToNow(new Date(message.created_at), {
                          addSuffix: true,
                          locale: ja,
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="メッセージを入力..."
              className="flex-grow"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <Button onClick={sendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}