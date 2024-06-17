import React, { useState } from "react";
import { api } from "../api/api";

const useMessages = () => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const getMessagesById = async (chatId) => {
    try {
      const response = await api.get(`/api/messages/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setLoading(false);
      if (response.data.success) {
        setMessages(
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
    getMessagesById,
    messages,
    loading,
  };
};

export default useMessages;
