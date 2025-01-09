"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { FadeIn } from "@/components/animations/FadeIn";
import api from "@/lib/api/client";

interface ChatRoom {
  id: string;
  product: {
    id: string;
    title: string;
    images: string[];
  };
  buyer: {
    name: string;
  };
  seller: {
    name: string;
  };
  last_message: {
    content: string;
    created_at: string;
  } | null;
  created_at: string;
}

export default function ChatListPage() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const response = await api.chat.listRooms();
      setChatRooms(response.data);
    };
    fetchChatRooms();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <FadeIn>
        <h1 className="text-3xl font-bold mb-2">チャット一覧</h1>
        <p className="text-muted-foreground mb-8">
          取引に関するチャットをご確認いただけます
        </p>

        <div className="space-y-4">
          {chatRooms.map((room) => (
            <Link key={room.id} href={`/chat/${room.id}`}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {room.product.images[0] && (
                      <img
                        src={room.product.images[0]}
                        alt={room.product.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold mb-1">
                            {room.product.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{room.seller.name}</span>
                            <span>・</span>
                            <span>{room.buyer.name}</span>
                          </div>
                        </div>
                        <Badge variant="secondary">
                          {formatDistanceToNow(
                            new Date(
                              room.last_message?.created_at || room.created_at
                            ),
                            { addSuffix: true, locale: ja }
                          )}
                        </Badge>
                      </div>
                      {room.last_message && (
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {room.last_message.content}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}