import { api } from "../api/api";

export const getAllNotifications = async () => {
  const { data } = await api.get("/api/notifications/admin/");
  return data;
};
