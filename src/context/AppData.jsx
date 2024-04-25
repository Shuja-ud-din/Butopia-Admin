import React from "react";
import { useState } from "react";
import { createContext } from "react";

const DataContext = createContext();

const AppData = ({ children }) => {
  const [singleObj, setSingleObj] = useState("hi there");

  return (
    <DataContext.Provider value={{ singleObj, setSingleObj }}>
      {children}
    </DataContext.Provider>
  );
};

export default AppData;
export { DataContext };
