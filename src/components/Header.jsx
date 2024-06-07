// import { Avatar, Badge } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { FiAlignLeft } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import avatar from "../assets/avatar.jpg";
import ProfileBox from "./ProfileBox/ProfileBox";
import { GoChevronDown } from "react-icons/go";
import logo from "../assets/mainNewLogo.png";
import { Avatar, Badge } from "@mui/material";
import NotificationsBox from "./NotificationsBox/NotificationsBox";

const Header = () => {
  const [showProfileBox, setShowProfileBox] = useState(false);
  const [showNotificationsBox, setShowNotificationsBox] = useState(false);

  const profile_ref = useRef(null);
  const bell_ref = useRef(null);
  const notifications_box_ref = useRef(null);

  const toggleNotificationsBox = (event) => {
    if (
      showNotificationsBox &&
      (bell_ref.current === event.target ||
        bell_ref.current.contains(event.target))
    ) {
      setShowNotificationsBox(true);
    } else {
      setShowNotificationsBox(false);
    }
  };

  const toggleProfileBox = (event) => {
    if (
      showProfileBox &&
      (profile_ref.current === event.target ||
        profile_ref.current.contains(event.target))
    ) {
      setShowProfileBox(true);
    } else {
      setShowProfileBox(false);
    }
  };

  console.log(showProfileBox);

  useEffect(() => {
    document.addEventListener("click", toggleProfileBox);

    return () => {
      document.removeEventListener("click", toggleProfileBox);
    };
  }, [showProfileBox]);

  useEffect(() => {
    document.addEventListener("click", toggleNotificationsBox);

    return () => {
      document.removeEventListener("click", toggleNotificationsBox);
    };
  }, [showNotificationsBox]);

  return (
    <div className="w-full grid grid-cols-12 h-[60px] bg-[white] ">
      <div className="col-span-2 flex items-center justify-center ">
        <img src={logo} className="h-[60px]" />
      </div>
      <div className="col-span-10 shadow-md">
        <div className="flex justify-between items-center h-full">
          <div className=" flex justify-center items-center ml-7 cursor-pointer">
            <FiAlignLeft size={30} color="#09373d" />
          </div>
          <div className="flex justify-between items-center h-full ">
            <div
              className="flex justify-center items-center px-4   "
              onClick={() => setShowNotificationsBox(!showNotificationsBox)}
              ref={bell_ref}
            >
              <Badge
                badgeContent={4}
                color="primary"
                className="cursor-pointer"
              >
                <GoBell size={22} />
              </Badge>
            </div>
            <div
              className="flex justify-center cursor-pointer items-center px-4 "
              onClick={() => setShowProfileBox(!showProfileBox)}
              ref={profile_ref}
            >
              <Avatar alt="Remy Sharp" src={avatar} className="mx-3" />
              <GoChevronDown size={22} />
            </div>
            {showProfileBox && (
              <ProfileBox name={"John"} role={"Admin"} image={avatar} />
            )}
            {showNotificationsBox && (
              <NotificationsBox ref={notifications_box_ref} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
