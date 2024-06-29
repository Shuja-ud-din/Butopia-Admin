import React, { useEffect, useState } from "react";
import Messages from "../components/Messages/Message";
import ChatBox from "../components/ChatBox/ChatBox";
import SearchBar from "../components/SearchBar/SearchBar";
import Button from "../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import { Autocomplete, TextField } from "@mui/material";
import useAdmin from "../Hooks/useAdmin";
import useChat from "../Hooks/useChat";
import ButtonLoader from "../components/ButtonLoader/ButtonLoader";
import Select from "../components/Dropdown/Select";

const Support = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const currentAdmin = localStorage.getItem("userId");

  const [showModal, setShowModal] = useState(false);
  const [chatsToDisplay, setChatsToDisplay] = useState();

  // const { chatId } = useParams();
  const navigate = useNavigate();

  const { getProviderTable, getAllAdminsTable } = useAdmin();
  const { chats, getSupportChats, addChat, loading } = useChat();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleSearchChats = (e) => {
    const searchValue = e.target.value;
    const filteredChats = chats.filter((chat) =>
      chat.user.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setChatsToDisplay(filteredChats);
  };

  useEffect(() => {
    getProviderTable();
    getSupportChats();
  }, []);

  useEffect(() => {
    if (chats?.length > 0) {
      setActiveChat(chats[0]);
    }

    setChatsToDisplay(chats);
  }, [chats]);

  return (
    <>
      <div>
        <h3 className="text-[25px] font-[500] mb-5 ">Chats</h3>
      </div>
      <div className="h-[72vh] flex gap-[1rem] grid grid-cols-12 mt-4 ">
        <div className="p-3 col-span-4 bg-[white]  border border-[#c4c4c4]  rounded-[9px] h-full  flex flex-col">
          <div className="flex">
            <SearchBar
              onChange={handleSearchChats}
              placeholder="search here.."
            />
            <Select className={"ml-3"}>
              <option value="all">All</option>
              <option value="customers">Customers</option>
              <option value="providers">Providers</option>
            </Select>
          </div>
          <div className="max-h-[62vh] overflow-auto mt-4 pr-2">
            {chatsToDisplay && chatsToDisplay.length > 0
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
                      onClick={() => setActiveChat(chat)}
                    />
                  );
                })
              : "No chats available"}
          </div>
        </div>
        <div className="col-span-8 bg-[white]  border  rounded-[9px] rounded-tr-[9px]  border-[#c4c4c4] shadow-lg ">
          <Messages chat={activeChat} />
        </div>
      </div>

      {showModal && (
        <Modal toggleModal={toggleModal}>
          <div className="w-full mb-3">
            <h3 className="text-[23px] font-[500] ">Edit Admin</h3>
          </div>
          <Autocomplete
            disablePortal
            className="p-0 bg-[white]"
            size="small"
            id="combo-box-demo"
            onChange={(e, newValue) => {
              setSelectedAdmin(newValue);
            }}
            options={
              getAllAdminsTable?.filter((item) => item.id != currentAdmin) || [
                { name: "Loading..." },
              ]
            }
            sx={{ width: "100%" }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Admin" />}
          />
          <div className="w-full flex justify-end">
            <Button className="m-2" onClick={toggleModal} type="secondary">
              Cancel
            </Button>
            <Button
              className="m-2 w-[9rem]"
              type="primary"
              onClick={(e) => addChat(selectedAdmin.id).then(toggleModal)}
            >
              {loading ? <ButtonLoader /> : "Add Chat"}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Support;
