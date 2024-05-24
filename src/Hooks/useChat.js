import React, { useState } from "react";
import { api } from "../api/api";
import { notification } from "antd";

const useChat = () => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState();

  const getAllChats = async () => {
    try {
      const response = await api.get("/api/chat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.data.success) {
        setChats(
          response.data.data.reverse().map((item, index) => {
            return { ...item, index: index + 1 };
          })
        );
      }
    } catch (e) {
      console.error("Error message", e.message);
    }
  };

  const addChat = async (userId) => {
    setLoading(true);
    try {
      const response = await api.post(
        "/api/chat",
        { user2: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      if (response.data.success) {
        getAllChats();
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error("Error message", e);
      notification.error({
        message: "Error",
        description:
          e.message || e.response.data.message || "Something went wrong",
        placement: "topRight",
      });
    }
  };

  return {
    getAllChats,
    chats,
    addChat,
    loading,
  };
};

export default useChat;
