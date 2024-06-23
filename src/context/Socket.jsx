import React, { createContext, useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { sendNotification } from "../utils/sendNotification";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const socket = io(baseURL);

  const [messages, setMessages] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const setupSocket = useCallback(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("join", {
        token: localStorage.getItem("token"),
      });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("newMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("notification", (data) => {
      setUnreadNotifications(data.unreadNotifications);
      sendNotification(data.notification.title, data.notification.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    const cleanUp = setupSocket();

    return () => {
      cleanUp();
    };
  }, [setupSocket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        messages,
        setMessages,
        unreadNotifications,
        setUnreadNotifications,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
export { SocketContext };
