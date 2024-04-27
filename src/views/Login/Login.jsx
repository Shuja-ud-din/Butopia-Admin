import React from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-[26px] font-[500] mb-2 ">Login</h1>
      <p className="text-[17px] text-[#4c4c4c] mb-8 ">
        Access to our dashboard
      </p>

      <Input type="text" placeholder="Phone Number" />
      <Input type="password" />

      <Button type="primary" onClick={() => navigate("/admin/dashboard")}>
        Login
      </Button>

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
