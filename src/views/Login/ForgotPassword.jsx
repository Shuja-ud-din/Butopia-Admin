import React from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { NavLink, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-[26px] font-[500] mb-2 ">Forgot Password?</h1>
      <p className="text-[15px] text-[#4c4c4c] mb-8 text-center">
        Enter your Phone Number to get a password reset OTP
      </p>

      <Input type="text" placeholder="Phone Number" />

      <Button onClick={() => navigate("/verify-otp")}>Reset Password</Button>

      <div className="flex">
        <p className="text-[#a0a0a0] mt-5 ">Remember your password?</p>
        <NavLink
          to="/"
          className="text-[#4c4c4c] mx-3 hover:text-[#4c4c4c] hover:border-b  mt-5 "
        >
          Login
        </NavLink>
      </div>
    </>
  );
};

export default ForgotPassword;
