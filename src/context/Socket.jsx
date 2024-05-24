import React, { createContext, useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const socket = io(baseURL);

  const [messages, setMessages] = useState([]);

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
      // console.log(data);
      setMessages((prev) => [...prev, data]);
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
    <SocketContext.Provider value={{ socket, messages, setMessages }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
export { SocketContext };
