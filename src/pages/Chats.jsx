import React, { useEffect } from "react";
import useChat from "../Hooks/useChat";
import GroupChat from "../modules/GroupChat";

const Chats = () => {
  const { chats, getAppointmentChats } = useChat();

  useEffect(() => {
    getAppointmentChats();
  }, []);

  return (
    <>
      <GroupChat
        chats={chats?.sort(
          (chat1, chat2) =>
            toUnix(
              chat1.lastMessage ? chat1.lastMessage.date : chat1.createdAt
            ) <
            toUnix(chat2.lastMessage ? chat2.lastMessage.date : chat2.createdAt)
        )}
      />
    </>
  );
};

export default Chats;
