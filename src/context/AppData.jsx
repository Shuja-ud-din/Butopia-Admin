import React from "react";
import { useState } from "react";
import { createContext } from "react";

const AppContext = createContext();

const AppData = ({ children }) => {
  const [chatsToDisplay, setChatsToDisplay] = useState();
  const [activeChat, setActiveChat] = useState(0);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppData;
export { AppContext };
