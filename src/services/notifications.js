import { api, axiosInstance } from "../api/api";

export const getAllNotifications = async () => {
  const { data } = await axiosInstance.get("/api/notifications/admin/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const readAllNotifications = async () => {
  const { data } = await api.patch("/api/notifications/readAll");

  return data;
};
