import React, { useState } from "react";
import InputBar from "../Input/Input";
import MessageBubble from "./MessageBubble/MessageBubble";
import MessageArea from "./MessageArea/MessageArea";
import profilePhoto from "../../assets/user_profile.png";
import Button from "../Button/Button";
import { FiSend } from "react-icons/fi";

const Message = ({ profile, profileName }) => {
  const [value, setValue] = useState("");
  const [messages, setMessage] = useState([]);
  const handleSend = () => {
    if (value !== "") {
      setMessage([...messages, value]);
      setValue("");
    }
  };
  console.log(messages);
  return (
    <>
      <div className="w-full inline-block min-h-[70vh]  flex flex-col justify-between gap-[2rem]">
        <div className=" w-[100%]  pl-[1rem] h-[4.3rem] bg-primary gap-[1rem]   flex justify-start items-center  rounded-tl-[9px] rounded-tr-[9px]  border-b border-primary">
          <img
            src={profile ? profile : profilePhoto}
            alt=""
            className="h-[3rem] rounded-full"
          />
          <div className="text-center text-lg font-semibold  text-[white]">
            {profileName}
          </div>
          {/* <h3 className="text-[25px] font-[500] mb-5 ">Messages</h3> */}
        </div>
        <div className="h-full w-full  flex items-center">
          {messages.length === 0 ? (
            <div className="w-full  text-[1.5rem] text-[#CCCCCC] font-[400]  flex items-center justify-center">
              No Messages yet
            </div>
          ) : (
            <MessageArea>
              {messages.map((message, index) => (
                <MessageBubble key={index} sender="user" message={message} />
              ))}
            </MessageArea>
          )}
        </div>
        <form className="w-full flex items-center justify-center px-5 py-2 ">
          <InputBar
            className="bg-[#f8fafb] rounded-[25px] flex items-center justify-center mb-0"
            type="text"
            value={value}
            placeholder={"Type Your Message here..."}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button className="ml-3 ">
            Send
            <FiSend className="ml-2" />
          </Button>
        </form>
      </div>
    </>
  );
};
export default Message;
