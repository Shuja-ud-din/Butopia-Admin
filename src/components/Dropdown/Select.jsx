import React from "react";

const Select = ({ className, children, onChange, value, name = "" }) => {
  return (
    <select
      onChange={onChange}
      value={value}
      name={name}
      className={` rounded-lg h-[40px] px-2  ${className}`}
    >
      {children}
    </select>
  );
};

export default Select;
