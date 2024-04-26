import { Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileBox = ({ name, role, image }) => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-[60px] right-2 rounded-md bg-[white] border border-secondary w-[200px] ">
      <div className="profile_head bg-[#f9f9f9] flex p-3 rounded-tl-md rounded-tr-md border-b border-secondary  ">
        <Avatar src={image} className="mr-2" />
        <div>
          <h3 className="text-[14px]  font-[500] ">{name}</h3>
          <p className="text-[13px] text-[#757575] font-[400] ">{role}</p>
        </div>
      </div>
      <div className="profile_body">
        <ul className="">
          <li className="p-2 transition duration-200 cursor-pointer hover:bg-primary hover:text-[white]   border-b border-[#dedada] ">
            Profile
          </li>
          <li className="p-2 transition duration-200 cursor-pointer hover:bg-primary hover:text-[white]    border-b border-[#dedada]">
            Settings
          </li>
          <li
            onClick={() => navigate("/")}
            className="p-2 transition duration-200 cursor-pointer hover:bg-primary hover:text-[white] rounded-bl-md  rounded-br-md "
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileBox;
