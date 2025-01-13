"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";

interface ChatRoom {
  id: string;
  product?: {
    title: string;
  };
}

export default function ChatRoomsPage() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await api.chat.listRooms();
        setChatRooms(response);
      } catch (error) {
        console.error("Failed to fetch chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <div>
      <h1>Chat Rooms</h1>
      <ul>
        {chatRooms.map((room) => (
          <li key={room.id}>
            <a href={`/chat/${room.id}`}>{room.product?.title || "チャットルーム"}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
