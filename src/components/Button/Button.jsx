import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary border-none outline-none w-full p-2 text-[white] rounded-lg text-[14px] "
    >
      {children}
    </button>
  );
};

export default Button;
