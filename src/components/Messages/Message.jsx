import React, { useCallback, useContext, useEffect, useState } from "react";
import InputBar from "../Input/Input";
import MessageBubble from "./MessageBubble/MessageBubble";
import MessageArea from "./MessageArea/MessageArea";
import profilePhoto from "../../assets/user_profile.png";
import Button from "../Button/Button";
import { FiSend } from "react-icons/fi";
import { SocketContext } from "../../context/Socket";
import useMessages from "../../Hooks/useMessages";

const Message = ({ chat }) => {
  const { messages: chatMsgs, getMessagesById, sendMessage } = useMessages();

  const [value, setValue] = useState("");
  const { messages, setMessages } = useContext(SocketContext);

  const handleSend = (e) => {
    e.preventDefault();
    if (value !== "") {
      const newMsg = {
        message: value,
        chatId: chat.id,
        sender: localStorage.getItem("userId"),
        date: new Date(),
      };
      setMessages([...messages, newMsg]);
      setValue("");
      sendMessage(chat.id, value);
    }
  };

  useEffect(() => {
    getMessagesById(chat.id);
  }, [chat.id]);

  useEffect(() => {
    setMessages(chatMsgs);
  }, [chatMsgs]);

  console.log(chatMsgs);

  return (
    <>
      <div className="w-full min-h-[70vh] flex flex-col justify-between">
        <div className=" w-[100%]  pl-[1rem] h-[4.3rem] bg-primary gap-[1rem]   flex justify-start items-center  rounded-tl-[9px] rounded-tr-[9px]  border-b border-primary">
          <img
            src={chat ? chat.user.profilePicture || profilePhoto : profilePhoto}
            alt=""
            className="h-[3rem] rounded-full"
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
                messages.map((message, index) => (
                  <MessageBubble
                    key={index}
                    isMine={chat?.user?.id !== message.sender}
                    message={message.message}
                    time={message.date}
                  />
                ))}
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
