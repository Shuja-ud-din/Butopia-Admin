import React, { useContext, useEffect } from "react";
import axios from "axios";
import { SocketContext } from "../context/Socket";

const Chat = () => {
  const { socket } = useContext(SocketContext);

  const sendMessage = () => {
    socket.emit("message", "Hello world");
  };

  return (
    <div className="bg-[white]  rounded-lg w-full grid grid-cols-12 min-h-[70vh] shadow-lg p-5 ">
      <div className="col-span-3">chats</div>
      <div className="col-span-9"></div>
      <button onClick={sendMessage}>Send message</button>
    </div>
  );
};

export default Chat;
