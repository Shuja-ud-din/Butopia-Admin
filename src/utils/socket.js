import { io } from "socket.io-client";

const baseURL = import.meta.env.VITE_BASE_URL;
const socket = io(baseURL);

socket.on("unauthorized", (data) => {
  console.log("Socket unauthorized", data);
});

export { socket };
