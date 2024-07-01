import React from "react";
import { formatTime } from "../../../utils/timeFormat";
import moment from "moment/moment";

const MessageBubble = ({ message, isMine, time }) => {
  return (
    <div
      className={`flex ${isMine ? "justify-end" : "justify-start"} w-full mb-2`}
    >
      <div
        className={`flex flex-col items-end border border-primary shadow-lg rounded-lg p-2 max-w-[70%] ${
          isMine ? "bg-primary text-[white]" : ""
        }`}
      >
        <div>{message}</div>
        <div className="text-[10px] m-0 p-0 text-gray-500 mt-1">
          {formatTime(time)}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
