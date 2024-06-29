import React, { useState } from "react";
import { api } from "../api/api";
import { notification } from "antd";

const useChat = () => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState();

  const getSupportChats = async () => {
    try {
      const response = await api.get("/api/chat/support", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      if (response.data.success) {
        setChats(
          response.data.data.reverse().map((item, index) => {
            return { ...item, index: index + 1 };
          })
        );
      }
    } catch (e) {
      setLoading(false);
      console.error("Error message", e.message);
    }
  };

  return {
    getSupportChats,
    chats,
    loading,
  };
};

export default useChat;
