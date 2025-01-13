import axios from "axios";
import { getSession } from "@/lib/api/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// リクエストインターセプター（認証トークンの付与）
apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }
  return config;
});

// API オブジェクトを定義
export const api = {
  chat: {
    listRooms: async () => {
      const response = await apiClient.get("/chat/rooms/");
      return response.data;
    },
    getRoom: async (id: string) => {
      const response = await apiClient.get(`/chat/rooms/${id}/`);
      return response.data;
    },
    getMessages: async (roomId: string) => {
      const response = await apiClient.get(`/chat/rooms/${roomId}/messages/`);
      return response.data;
    },
    sendMessage: async (data: { room_id: string; content: string }) => {
      const response = await apiClient.post("/chat/messages/", data);
      return response.data;
    },
  },
};
