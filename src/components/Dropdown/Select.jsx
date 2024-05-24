import React from "react";

const Select = ({ className, children, onChange, value, name = "" }) => {
  return (
    <select
      onChange={onChange}
      value={value}
      name={name}
      className={` rounded-lg bg-[#e9e9ed] h-[40px] px-2  ${className}`}
    >
      {children}
    </select>
  );
};

export default Select;
