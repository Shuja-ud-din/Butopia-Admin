import React from "react";

const Select = ({ className, children, onChange, value }) => {
  return (
    <select
      onChange={onChange}
      value={value}
      className={` rounded-lg h-[40px] px-2  ${className}`}
    >
      {children}
    </select>
  );
};

export default Select;
