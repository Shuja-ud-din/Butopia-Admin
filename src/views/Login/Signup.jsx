import React from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { NavLink } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <h1 className="text-[26px] font-[500] mb-2 ">Register</h1>
      <p className="text-[17px] text-[#4c4c4c] mb-8 ">
        Access to our dashboard
      </p>

      <Input type="text" placeholder="Full Name" />
      <Input type="text" placeholder="Phone Number" />
      <Input type="password" />
      <Input type="password" placeholder="Confirm Password" />

      <Button>Register</Button>

      <div className="flex">
        <p className="text-[#a0a0a0] mt-5 ">Already have an account?</p>
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

export default Signup;
