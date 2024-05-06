import React from "react";
import { formatTime } from "../../../utils/timeFormat";

const MessageBubble = ({ message, sender }) => {
  const currentTime = new Date();

  return (
    <div
      className={`flex ${
        sender === "user" ? "justify-end" : "justify-start"
      } mb-2`}
    >
      <div
        className={`flex flex-col items-end border border-primary shadow-lg rounded-lg p-2 max-w-[70%] ${
          sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        <div>{message}</div>
        <div className="text-[10px] m-0 p-0 text-gray-500 mt-1">
          {formatTime(currentTime)}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
