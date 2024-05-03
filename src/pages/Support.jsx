import React from "react";
import Chat from "../modules/Chat";
import Messages from "../components/Messages/Message";
import ChatBox from '../components/ChatBox/ChatBox'
import profilePhoto from '../assets/avatar.jpg';
import Filter from '../components/Button/FilterButton';
import Select from "../components/Dropdown/Select";
import SearchBar from '../components/SearchBar/SearchBar'
const Support = () => {
  return (
    <>
      <div>
        <h3 className="text-[25px] font-[500] mb-5 ">Chats</h3>
      </div>
      <div className="min-h-[70vh] flex mt-4 bg-[white] w-full border border-[#c4c4c4]  rounded-[9px]  shadow-md">
        <div className="w-[60%] flex flex-col">
          <div className="w-[full] flex gap-[0.5rem] mb-[2rem] pl-[1rem] pt-[1rem]">
            <SearchBar />
            {/* <Select>
              <option value="">All</option>
              <option value="">Selected</option>
            </Select> */}
            <Filter />
          </div>
          <ChatBox
            name="John Doe"
            profilePhoto={profilePhoto}
            lastMessage="Hey, how are you?"
          />
          <ChatBox
            name="John Doe"
            profilePhoto={profilePhoto}
            lastMessage="Hey, how are you?"
          />
          <ChatBox
            name="John Doe"
            profilePhoto={profilePhoto}
            lastMessage="Hey, how are you?"
          />
          <ChatBox
            name="John Doe"
            profilePhoto={profilePhoto}
            lastMessage="Hey, how are you?"
          />
          <ChatBox
            name="John Doe"
            profilePhoto={profilePhoto}
            lastMessage="Hey, how are you?"
          />
          <ChatBox
            name="John Doe"
            profilePhoto={profilePhoto}
            lastMessage="Hey, how are you?"
          />
        </div>
        <div className="w-full  border  rounded-tl-[9px] rounded-tr-[9px]  border-[#c4c4c4] shadow-lg ">
          <Messages
            profile={profilePhoto}
            profileName="Admin" />
        </div>
      </div>
    </>

  );
};

export default Support;
