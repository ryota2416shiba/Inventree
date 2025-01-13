import apiClient from "./client";

export async function getManufacturers() {
  const response = await apiClient.get("/manufacturers/");
  return response.data;
}

export async function getManufacturer(id: string) {
  const response = await apiClient.get(`/manufacturers/${id}/`);
  return response.data;
}

export async function updateManufacturer(id: string, data: any) {
  const response = await apiClient.put(`/manufacturers/${id}/`, data);
  return response.data;
}
