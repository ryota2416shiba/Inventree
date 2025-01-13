"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api/client";

export default function ChatRoomPage() {
  const params = useParams();
  const roomId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [room, setRoom] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchChatRoom = async () => {
      try {
        const roomResponse = await api.chat.getRoom(roomId);
        setRoom(roomResponse);

        const messagesResponse = await api.chat.getMessages(roomId);
        setMessages(messagesResponse);
      } catch (error) {
        console.error("Failed to fetch chat room:", error);
      }
    };

    if (roomId) {
      fetchChatRoom();
    }
  }, [roomId]);

  return (
    <div>
      <h1>Chat Room</h1>
      {room ? (
        <div>
          <h2>{room.title}</h2>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg.content}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
