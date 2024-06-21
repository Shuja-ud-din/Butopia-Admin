import React, { useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import "./Input.css";

const Input = ({
  value,
  type = "text",
  onChange,
  name,
  placeholder,
  className,
  label,
}) => {
  const [passwordVisible1, setPasswordVisible1] = useState(false);

  return (
    <>
      {label && (
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div
        className={`${className} flex items-center  w-full custom_input px-[13px] py-[8px] border border-primary rounded-lg mb-3 `}
      >
        {type === "password" && (
          <>
            <input
              type={passwordVisible1 ? "text" : "password"}
              name={name}
              id="password"
              placeholder={placeholder || "Password"}
              className="w-[95%] bg-[transparent]"
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
              value={value}
              id="email"
              placeholder={placeholder || ""}
              className="w-[100%] bg-[transparent]"
              onChange={onChange}
            />
          </>
        )}
        {type === "number" && (
          <>
            <input
              type={type}
              name={name}
              id="email"
              value={value}
              placeholder={placeholder || ""}
              className="w-[100%] bg-[transparent]"
              onChange={onChange}
            />
          </>
        )}
        {type === "chat" && (
          <div className="flex  items-center w-full">
            <input
              type="text"
              value={value}
              onChange={onChange}
              placeholder="Type your message..."
              className="w-full outline-none px-3  outline-none"
            />
            <button
              onClick={onSend}
              className="ml-2 px-4 py-2 text-white rounded-md outline-none"
            >
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M3 3l18 9-18 9v-18z" />
              </svg>
            </button>
          </div>
        )}
        {type === "otpNumber" && (
          <>
            <input
              type="text"
              name={name}
              id="otp"
              placeholder={placeholder}
              className="w-8 h-8 text-center border border-gray-300 rounded-lg "
              maxLength={1}
              onChange={onChange}
            />
          </>
        )}
        {type === "date" && (
          <>
            <input
              type="date"
              name={name}
              id="date"
              placeholder={placeholder}
              className="w-8 h-8 text-center border border-gray-300 rounded-lg "
              onChange={onChange}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Input;
