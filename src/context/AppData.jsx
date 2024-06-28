import React from "react";
import { useState } from "react";
import { createContext } from "react";

const AppContext = createContext();

const AppData = ({ children }) => {
  const [messages, setMessages] = useState([]);
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
    <AppContext.Provider value={{ user, setUser, messages, setMessages }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppData;
export { AppContext };
