import React from "react";

const MessageArea = ({ children, ref }) => {
  return (
    <div className="p-[1rem] position-relative flex items-end h-full max-h-[55vh] w-full flex flex-col overflow-y-auto">
      {children}
    </div>
  );
};

export default MessageArea;
