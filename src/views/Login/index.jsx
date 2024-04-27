import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import "./Login.css";
import logo from "../../assets/logos/logo2.jpg";

const Registration = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    check: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  console.log(loginData);
  const handleSubmitLogin = () => {
    //submit login data
  };
  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center bg-[#f8f9fa] ">
        <div
          className="w-[50%] min-h-[75vh] rounded-[20px] bg-[white]  grid grid-cols-12 min-w-[800px] "
          style={{ boxShadow: "0px 0px 20px 0px #9ca3af" }}
        >
          <div className="col-span-6 rounded-[20px] bg-primary flex items-center justify-center text-[white] p-10">
            <div
              className="rounded-[16px] bg-[white] p-[30px] "
              style={{ boxShadow: "1px 1px 20px 6px gray" }}
            >
              <img src={logo} alt="" />
            </div>
          </div>
          <div className="col-span-6 flex items-center justify-center ">
            <div className="p-10 w-full flex items-center justify-center flex-col">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
