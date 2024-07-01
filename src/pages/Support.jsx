import React, { useEffect } from "react";
import useChat from "../Hooks/useChat";
import Chat from "../modules/Chat";

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
      <Chat chats={chats} />
    </>
  );
};

export default Support;
