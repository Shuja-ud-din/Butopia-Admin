import React, { useState } from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";

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
          response.data.data.map((item, index) => {
            return { ...item, index: index + 1 };
          })
        );
      }
    } catch (e) {
      setLoading(false);
      console.error("Error message", e.message);
    }
  };

  const sendMessage = async (chatId, message) => {
    try {
      const response = await api.post(
        `/api/messages/${chatId}`,
        {
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return {
    getMessagesById,
    messages,
    loading,
    sendMessage,
  };
};

export default useMessages;
