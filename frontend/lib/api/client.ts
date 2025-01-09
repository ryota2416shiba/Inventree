import axios from "axios";
import { getSession } from "@/lib/auth/session";

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

// レスポンスインターセプター（エラーハンドリング）
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 認証エラー時の処理
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export const api = {
  auth: {
    login: async (credentials: { email: string; password: string }) => {
      const response = await apiClient.post("/auth/login/", credentials);
      return response.data;
    },
    register: async (userData: {
      email: string;
      password: string;
      name: string;
      accountType: string;
      companyName?: string;
      tier?: number;
    }) => {
      const response = await apiClient.post("/auth/register/", userData);
      return response.data;
    },
    logout: async () => {
      const response = await apiClient.post("/auth/logout/");
      return response.data;
    },
  },
  manufacturers: {
    list: async () => {
      const response = await apiClient.get("/manufacturers/");
      return response.data;
    },
    get: async (id: string) => {
      const response = await apiClient.get(`/manufacturers/${id}/`);
      return response.data;
    },
    update: async (id: string, data: any) => {
      const response = await apiClient.put(`/manufacturers/${id}/`, data);
      return response.data;
    },
  },
  notifications: {
    list: async () => {
      const response = await apiClient.get("/notifications/");
      return response.data;
    },
    markAsRead: async (id: string) => {
      const response = await apiClient.put(`/notifications/${id}/read/`);
      return response.data;
    },
  },
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
  products: {
    list: async (params?: { category?: string; search?: string }) => {
      const response = await apiClient.get("/products/", { params });
      return response.data;
    },
    get: async (id: string) => {
      const response = await apiClient.get(`/products/${id}/`);
      return response.data;
    },
    create: async (data: FormData) => {
      const response = await apiClient.post("/products/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    update: async (id: string, data: FormData) => {
      const response = await apiClient.put(`/products/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
  },
};

export default api;