import React from "react";

const Select = ({ className, children, onChange }) => {
  return (
    <select
      onChange={onChange}
      className={` rounded-lg h-[40px] px-2  ${className}`}
    >
      {children}
    </select>
  );
};

export default Select;
