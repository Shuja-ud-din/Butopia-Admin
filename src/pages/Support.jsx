import React, { useState } from "react";
import Messages from "../components/Messages/Message";
import ChatBox from "../components/ChatBox/ChatBox";
import SearchBar from "../components/SearchBar/SearchBar";

const dummyChat = [
  {
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    profilePhoto: null,
    unread: 4,
    lastMessageTime: "12:30 PM",
  },
  {
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    profilePhoto: null,
    unread: 4,
    lastMessageTime: "12:30 PM",
  },
  {
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    profilePhoto: null,
    unread: 4,
    lastMessageTime: "12:30 PM",
  },
];

const Support = () => {
  const [activeChat, setActiveChat] = useState(0);

  return (
    <>
      <div>
        <h3 className="text-[25px] font-[500] mb-5 ">Chats</h3>
      </div>
      <div className="h-[72vh] flex gap-[1rem] grid grid-cols-12 mt-4 ">
        <div className="p-3 col-span-4 bg-[white]  border border-[#c4c4c4]  rounded-[9px] h-full  flex flex-col">
          <SearchBar placeholder="search here.." />

          <div className="max-h-[62vh] overflow-auto mt-4 pr-2">
            {dummyChat
              ? dummyChat.map((chat, index) => {
                  return (
                    <ChatBox
                      name={chat.name}
                      isActive={index === activeChat}
                      profilePhoto={chat.profilePhoto}
                      lastMessage="Hey, how are you?"
                      unread={chat.unread}
                      lastMsgTime={chat.lastMessageTime}
                      onClick={() => setActiveChat(index)}
                    />
                  );
                })
              : ""}
          </div>
        </div>
        <div className="col-span-8 bg-[white]  border  rounded-[9px] rounded-tr-[9px]  border-[#c4c4c4] shadow-lg ">
          <Messages profileName="Admin" />
        </div>
      </div>
    </>
  );
};

export default Support;
