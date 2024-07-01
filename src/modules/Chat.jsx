import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppData";
import SearchBar from "../components/SearchBar/SearchBar";
import Select from "../components/Dropdown/Select";
import Message from "../components/Messages/Message";
import ChatBox from "../components/ChatBox/ChatBox";
import { socket } from "../utils/socket";
import useChat from "../Hooks/useChat";

const Chat = ({ chats }) => {
  const { activeChat, setActiveChat, chatsToDisplay, setChatsToDisplay } =
    useContext(AppContext);

  const { readAllMessages } = useChat();

  const handleSearchChats = (e) => {
    const searchValue = e.target.value;
    const filteredChats = chats.filter((chat) =>
      chat.user.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setChatsToDisplay(filteredChats);
  };

  const handleFilterChats = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "all") {
      setChatsToDisplay(chats);
      return;
    }
    const filteredChats = chats.filter((chat) =>
      chat.user.role.toLowerCase().includes(filterValue.toLowerCase())
    );
    setChatsToDisplay(filteredChats);
  };

  useEffect(() => {
    if (chats?.length > 0) {
      setActiveChat(chats[0]);
    }

    setChatsToDisplay(chats);
  }, [chats]);

  return (
    <div className="h-[72vh] flex gap-[1rem] grid grid-cols-12 mt-4 ">
      <div className="p-3 col-span-4 bg-[white]  border border-[#c4c4c4]  rounded-[9px] h-full  flex flex-col">
        <div className="flex">
          <SearchBar onChange={handleSearchChats} placeholder="search here.." />
          <Select className={"ml-3"} onChange={handleFilterChats}>
            <option value="all">All</option>
            <option value="Customer">Customers</option>
            <option value="Provider">Providers</option>
          </Select>
        </div>
        <div className="max-h-[62vh] overflow-auto mt-4 pr-2">
          {chatsToDisplay
            ? chatsToDisplay.length > 0
              ? chatsToDisplay.map((chat, index) => {
                  return (
                    <ChatBox
                      name={chat.user.name}
                      isActive={chat.id === activeChat.id}
                      profilePhoto={chat.user.profilePicture}
                      lastMessage={
                        chat.lastMessage ? chat.lastMessage.message : ""
                      }
                      unread={chat.unread}
                      lastMsgTime={
                        chat.lastMessage
                          ? chat.lastMessage.date
                          : chat.createdAt
                      }
                      onClick={() => {
                        // readAllMessages(activeChat.id);
                        setActiveChat(chat);
                      }}
                    />
                  );
                })
              : "No chats available"
            : "Loadig..."}
        </div>
      </div>
      <div className="col-span-8 bg-[white]  border  rounded-[9px] rounded-tr-[9px]  border-[#c4c4c4] shadow-lg ">
        <Message chat={activeChat} />
      </div>
    </div>
  );
};

export default Chat;
