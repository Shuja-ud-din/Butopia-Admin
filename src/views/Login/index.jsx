import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";

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

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    navigate("/admin/appointments");
  };

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center bg-[#f8f9fa] ">
        <div
          className="w-[50%] h-[70vh] rounded-[20px] bg-[white]  grid grid-cols-12 min-w-[800px] "
          style={{ boxShadow: "0px 0px 20px 0px #9ca3af" }}
        >
          <div className="col-span-6 rounded-[20px] bg-primary flex items-center justify-center text-[white]">
            <h1 className="text-[30px] ">LOGO</h1>
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
