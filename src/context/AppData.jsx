import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toUnix } from "../utils/timeFormat";

const AppContext = createContext();

const AppData = ({ children }) => {
  const [chatsToDisplay, setChatsToDisplay] = useState();
  const [activeChat, setActiveChat] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [user, setUser] = useState({
    name: null,
    email: null,
    phoneNumber: null,
    profilePicture: null,
    roleId: null,
    role: null,
    id: null,
  });

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        chatsToDisplay,
        setChatsToDisplay,
        activeChat,
        setActiveChat,
        onlineUsers,
        setOnlineUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppData;
export { AppContext };
