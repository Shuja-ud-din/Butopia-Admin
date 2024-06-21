import React from "react";
import dummyProfile from "../../assets/user_profile.png";
import { Avatar } from "@mui/material";
import moment from "moment";

const ChatBox = ({
  name,
  profilePhoto,
  lastMessage,
  unread = 0,
  isActive = false,
  lastMsgTime,
  onClick = () => {},
}) => {
  console.log(lastMessage);

  return (
    <div
      className={`flex px-2 items-center border-b border-[#ccc] cursor-pointer  py-[0.5rem] ${
        isActive ? "bg-[#edeff2]" : ""
      }`}
      onClick={onClick}
    >
      {/* <img
        src={profilePhoto || dummyProfile}
        alt={`${name}'s profile`}
        className="h-[2rem] w--[2rem] rounded-full mr-4"
      /> */}
      <Avatar src={profilePhoto || dummyProfile} />
      <div className="ml-3 flex justify-between w-full">
        <div className="flex flex-col">
          <h3 className="text-[15px] font-semibold">{name}</h3>
          <p className="text-[13px] text-gray-600">{lastMessage}</p>
        </div>
        <div className="flex flex-col h-full justify-end">
          <div className="flex items-end  justify-end h-[1.4rem] ">
            {unread > 0 && (
              <div className="h-[1.2rem] w-[1.2rem] bg-[#3B82F6] text-[white] rounded-full flex items-center justify-center text-white text-xs">
                {unread}
              </div>
            )}
          </div>
          <p className="text-[13px] text-gray-600 mb-1">
            {lastMsgTime && moment(lastMsgTime).format("LT")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
