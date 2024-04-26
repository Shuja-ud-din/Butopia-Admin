import React, { useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import "./Input.css";

const Input = ({ type = "text", onChange, name, placeholder, className }) => {
  const [passwordVisible1, setPasswordVisible1] = useState(false);

  return (
    <div
      className={`flex items-center  w-full custom_input px-[13px] py-[8px] border border-primary rounded-lg mb-3 ${className}`}
    >
      {type === "password" && (
        <>
          <input
            type={passwordVisible1 ? "text" : "password"}
            name={name}
            id="password"
            placeholder={placeholder || "Password"}
            className="w-[95%]"
            onChange={onChange}
          />
          <span
            className="cursor-pointer"
            onClick={() => setPasswordVisible1(!passwordVisible1)}
          >
            {passwordVisible1 ? <FiEye /> : <FiEyeOff />}
          </span>
        </>
      )}
      {(type === "text" || type === "email") && (
        <>
          <input
            type={type}
            name={name}
            id="email"
            placeholder={placeholder || ""}
            className="w-[100%]"
            onChange={onChange}
          />
        </>
      )}
    </div>
  );
};

export default Input;
