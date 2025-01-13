import apiClient from "./client";

export async function getChatRooms() {
  const response = await apiClient.get("/chat/rooms/");
  return response.data;
}

export async function getChatRoom(id: string) {
  const response = await apiClient.get(`/chat/rooms/${id}/`);
  return response.data;
}

export async function getMessages(roomId: string) {
  const response = await apiClient.get(`/chat/rooms/${roomId}/messages/`);
  return response.data;
}

export async function sendMessage(data: { room_id: string; content: string }) {
  const response = await apiClient.post("/chat/messages/", data);
  return response.data;
}
