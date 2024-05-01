import React from "react";

const SelectField = ({ label, name, value, options, handleChange, editAllowed }) => {
  return (
    <div className={`flex justify-between items-center mb-4 gap-10`}>
      <label htmlFor={name} className="mb-2 capitalize text-grigio font-semibold">
        {label?.split(/(?=[A-Z])/).join(" ")}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        disabled={!editAllowed}
        onChange={(e) => handleChange(name, e.target.value)}
        className="border-2 border-[#E5E5E5] rounded-xl p-2 max-w-[400px] w-[300px] outline-none cursor-pointer"
      >
        <option value="">Select a category</option>
        {options && options?.map((option, index) => (
          <option key={index} value={option._id}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
