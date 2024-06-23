import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export { api, axiosInstance };
