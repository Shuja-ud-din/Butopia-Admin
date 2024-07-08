import React, { useEffect } from "react";
import useChat from "../Hooks/useChat";
import Chat from "../modules/Chat";
import { toUnix } from "../utils/timeFormat";

const Support = () => {
  const { chats, getSupportChats } = useChat();

  useEffect(() => {
    getSupportChats();
  }, []);

  return (
    <>
      <div>
        <h3 className="text-[25px] font-[500] mb-5 ">Chats</h3>
      </div>
      <Chat
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

export default Support;
