import React, { useContext, useState } from "react";
import { api } from "../api/api";
import { notification } from "antd";
import { AppContext } from "../context/AppData";

const useChat = () => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState();

  const { setChatsToDisplay, chatsToDisplay } = useContext(AppContext);

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

  const readAllMessages = async (chatId) => {
    try {
      const response = await api.put(
        `/api/messages/readAll/${chatId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        notification.success({
          message: "Success",
          description: "All messages read successfully",
        });
        setChatsToDisplay(
          chatsToDisplay.map((chat) => {
            if (chat.id === chatId) {
              return { ...chat, unread: 0 };
            }
            return chat;
          })
        );
      }
    } catch (e) {
      console.error("Error message", e.message);
      notification.error({
        message: "Error",
        description: "Failed to read messages",
      });
    }
  };

  return {
    getSupportChats,
    readAllMessages,
    chats,
    loading,
  };
};

export default useChat;
