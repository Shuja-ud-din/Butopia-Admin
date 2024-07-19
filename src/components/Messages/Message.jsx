import React, { useContext, useEffect, useRef, useState } from "react";
import InputBar from "../Input/Input";
import MessageBubble from "./MessageBubble/MessageBubble";
import MessageArea from "./MessageArea/MessageArea";
import Button from "../Button/Button";
import { FiSend } from "react-icons/fi";
import useMessages from "../../Hooks/useMessages";
import { socket } from "../../utils/socket";
import { AppContext } from "../../context/AppData";
import { isSameDay } from "../../utils/timeFormat";
import MessageBadge from "./MessageBadge";
import useChat from "../../Hooks/useChat";
import ChatAvatar from "../ChatBox/ChatAvatar";

const Message = ({ chat, isOnline = false }) => {
  const { messages: chatMsgs, getMessagesById, sendMessage } = useMessages();
  const { readAllMessages } = useChat();
  const { activeChat, chatsToDisplay, setChatsToDisplay } =
    useContext(AppContext);

  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [currentChat, setCurrentChat] = useState(chat);
  const messagesBoxRef = useRef();

  const handleSend = (e) => {
    e.preventDefault();
    if (value !== "") {
      const newMsg = {
        message: value,
        chatId: chat.id,
        sender: localStorage.getItem("userId"),
        isRead: false,
        date: new Date(),
      };
      setMessages([...messages, newMsg]);
      setValue("");
      sendMessage(chat.id, value);
    }
  };

  const scrollToBottom = () => {
    messagesBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleMessage = (data) => {
      if (activeChat.id === data.chatId) {
        const updatedChats = chatsToDisplay.map((chat) => {
          if (chat.id === data.chatId) {
            return {
              ...chat,
              lastMessage: {
                date: data.date,
                message: data.message,
              },
            };
          } else {
            return chat;
          }
        });
        setChatsToDisplay(updatedChats);
        setMessages((prevMessages) => [...prevMessages, data]);
      } else {
        const updatedChats = chatsToDisplay.map((chat) => {
          if (chat.id === data.chatId) {
            return {
              ...chat,
              unread: chat.unread + 1,
              lastMessage: {
                date: data.date,
                message: data.message,
              },
            };
          } else {
            return chat;
          }
        });
        setChatsToDisplay(updatedChats);
      }
    };

    socket.on("newMessage", handleMessage);

    return () => {
      socket.off("newMessage", handleMessage);
    };
  }, [activeChat, chatsToDisplay]);

  useEffect(() => {
    getMessagesById(chat.id);
  }, [chat.id]);

  useEffect(() => {
    setMessages(chatMsgs);
  }, [chatMsgs]);

  useEffect(() => {
    setCurrentChat(chat);
  }, [chat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      if (activeChat.unread > 0) {
        readAllMessages(activeChat.id);
      }
    };
  }, []);

  return (
    <>
      <div className="w-full min-h-[70vh] flex flex-col justify-between">
        <div className=" w-[100%]  pl-[1rem] h-[4.3rem] bg-primary gap-[1rem]   flex justify-start items-center  rounded-tl-[9px] rounded-tr-[9px]  border-b border-primary">
          <ChatAvatar
            profileImage={chat?.user?.profilePicture}
            isOnline={isOnline}
          />
          <div className="text-center text-lg font-semibold  text-[white]">
            {chat ? chat.user.name : ""}
          </div>
          {/* <h3 className="text-[25px] font-[500] mb-5 ">Messages</h3> */}
        </div>
        <div className="h-full w-full min-h-[23rem] flex items-end">
          {messages.length === 0 ? (
            <div className="w-full  text-[1.5rem] text-[#CCCCCC] font-[400]  flex items-center justify-center">
              No Messages yet
            </div>
          ) : (
            <MessageArea>
              {messages.length > 0 &&
                messages.map((message, index) => {
                  return (
                    <>
                      {(messages[index - 1]
                        ? messages[index - 1].isRead
                        : true) &&
                        !messages[index].isRead && (
                          <MessageBadge text="Unread Messages" />
                        )}

                      {index === 0 && (
                        <MessageBadge date={messages[index].date} />
                      )}
                      <MessageBubble
                        key={index}
                        isMine={chat?.user?.id !== message.sender}
                        message={message.message}
                        time={message.date}
                      />
                      {isSameDay(
                        messages[index].date,
                        messages[index + 1]?.date
                      ) ? null : (
                        <MessageBadge date={messages[index + 1]?.date} />
                      )}
                    </>
                  );
                })}
              <div ref={messagesBoxRef} />
            </MessageArea>
          )}
        </div>
        <form
          onSubmit={handleSend}
          className="w-full flex items-center justify-center px-5 py-2"
        >
          <InputBar
            className="bg-[#f8fafb] rounded-[25px] flex items-center justify-center mb-0"
            type="text"
            value={value}
            placeholder={"Type Your Message here..."}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button className="ml-3 mb-3 ">
            Send
            <FiSend className="ml-2" />
          </Button>
        </form>
      </div>
    </>
  );
};
export default Message;
