import React from "react";
import Chat from "../modules/Chat";
import Messages from "../components/Messages/Message";
import ChatBox from '../components/ChatBox/ChatBox'
import profilePhoto from '../assets/user_profile.png';
import Filter from '../components/Button/FilterButton';
import Select from "../components/Dropdown/Select";
import SearchBar from '../components/SearchBar/SearchBar'
const Chats = () => {
  return (
    <>
      <div>
        <h3 className="text-[25px] font-[500] mb-5 ">Chats</h3>
      </div>
      <div className="min-h-[72vh] p-[1rem] w-full  flex gap-[1rem] grid grid-cols-12 mt-4   border border-[#c4c4c4]  rounded-[9px]  shadow-md">
        <div className="col-span-3 bg-[white]  border border-[#c4c4c4]  rounded-[9px] h-full  flex flex-col">
          <div className="w-[full] border-b flex items-center gap-[0.2rem] mb-[1rem] pt-[1rem]">
            <SearchBar
              placeholder="search here.."
            />
            {/* <Filter /> */}
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
        <div className="col-span-9 bg-[white]  border  rounded-[9px] rounded-tr-[9px]  border-[#c4c4c4] shadow-lg ">
          <Messages />
        </div>
      </div>
    </>

  );
};

export default Chats;
