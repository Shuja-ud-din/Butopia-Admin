import React, { useEffect } from "react";
import { socket } from "../views/Dashboard";
import axios from "axios";

const Chat = () => {
  const basURL = import.meta.env.VITE_BASE_URL;
  const sendMessage = () => {
    socket.emit("message", "Hello from client");
  };

  const getProvders = async () => {
    try {
      const response = await axios.post(
        `https://chilly-beans-bathe.loca.lt/api/admin`,
        {
          name: "hi",
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjM1M2M1YjU2ZGE3OTllNDdmYmI0YTUiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTQ5MzQwNzh9.8qWvlCUHt9xAyz-hlZ1cwZIjHAMPHx1Yf38qdBqpbnY`,
          },
        }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }

    // const data = await response.json();
    // console.log(data);
  };

  return (
    <div className="bg-[white]  rounded-lg w-full grid grid-cols-12 min-h-[70vh] shadow-lg p-5 ">
      <div className="col-span-3">chats</div>
      <div className="col-span-9"></div>
      <button onClick={getProvders}>Send message</button>
    </div>
  );
};

export default Chat;
