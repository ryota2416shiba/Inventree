import apiClient from "./client";

export async function getNotifications() {
  const response = await apiClient.get("/notifications/");
  return response.data;
}

export async function markNotificationAsRead(id: string) {
  const response = await apiClient.put(`/notifications/${id}/read/`);
  return response.data;
}
