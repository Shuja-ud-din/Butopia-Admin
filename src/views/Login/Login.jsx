import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [data, setData] = useState({
    phoneNumber: "",
    password: "",
  })
  console.log(baseURL);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })
  }
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseURL + "/api/auth/login", data)

    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <h1 className="text-[26px] font-[500] mb-2 ">Login</h1>
      <p className="text-[17px] text-[#4c4c4c] mb-8 ">
        Access to our dashboard
      </p>
      <form onSubmit={handleLoginSubmit} action="">

        <Input onChange={handleChange} name="phoneNumber" type="text" placeholder="Phone Number" />
        <Input onChange={handleChange} name="password" type="password" />
        <Button
          type="primary"
          className="w-full flex"
        >
          Login
        </Button>
      </form>

      <NavLink
        to="/forgot-password"
        className="text-[#a0a0a0] mt-5 hover:text-[#4c4c4c] hover:border-b  "
      >
        Forgot Password?
      </NavLink>

      <div className="flex">
        <p className="text-[#a0a0a0] mt-5 ">Don’t have an account?</p>
        <NavLink
          to="/register"
          className="text-[#4c4c4c] mx-3 hover:text-[#4c4c4c] hover:border-b  mt-5 "
        >
          Register
        </NavLink>
      </div>
    </>
  );
};

export default Login;
