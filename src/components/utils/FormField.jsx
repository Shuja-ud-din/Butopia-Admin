import React from "react";

const FormField = ({
  type="text",
  label,
  name,
  value,
  handleChange,
  editAllowed,
  placeholder,
}) => {
  return (
    <div className={`flex justify-between items-center mb-4 gap-10`}>
      <label
        htmlFor={name}
        className="mb-2 capitalize text-grigio font-semibold"
      >
        {label?.split(/(?=[A-Z])/).join(" ")}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => handleChange(name, e.target.value)}
        className="border-2 border-[#E5E5E5] rounded-xl p-2 max-w-[400px] w-[300px] outline-none"
        placeholder={`Enter ${name
          ?.split(/(?=[A-Z])/)
          .join(" ")
          .toLowerCase()}`}
        readOnly={!editAllowed}
      />
    </div>
  );
};

export default FormField;
