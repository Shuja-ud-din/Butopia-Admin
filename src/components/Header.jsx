// import { Avatar, Badge } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FiAlignLeft } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import ProfileBox from "./ProfileBox/ProfileBox";
import { GoChevronDown } from "react-icons/go";
// import logo from "../assets/logo.jpg";
import logo from "../assets/logos/logo2.jpg";
import { Avatar, Badge } from "@mui/material";
import NotificationsBox from "./NotificationsBox/NotificationsBox";
import { AppContext } from "../context/AppData";
import { useGetNotifications } from "../Hooks/useNotifications";
import { socket } from "../utils/socket";
import { sendNotification } from "../utils/sendNotification";

const Header = () => {
  const { user } = useContext(AppContext);

  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const { data } = useGetNotifications();
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

  useEffect(() => {
    setUnreadNotifications(data?.unreadNotifications);
    setNotifications(data?.data);
  }, [data]);

  useEffect(() => {
    socket.on("notification", (data) => {
      sendNotification(data.notification.title, data.notification.message);
      setUnreadNotifications(data.unreadNotifications);
    });

    socket.on("messageNotification", (data) => {
      sendNotification(data.title, data.message);
    });
  }, []);

  return (
    <div className="w-full grid grid-cols-12 h-[60px] bg-[primary] ">
      <div className="col-span-2 flex items-center justify-center bg-[#0b343d] ">
      <img src={logo} className="h-[60px] w-[60px] rounded-full" />

        {/* <img src={logo} className="h-[60px] " /> */}
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
                badgeContent={unreadNotifications}
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
              <Avatar
                alt="profilePic"
                src={user?.profilePicture}
                className="mx-3"
              />
              <div className="pr-3">
                <h3 className="text-[14px]  font-[500] ">{user?.name || ""}</h3>
                <p className="text-[13px] text-[#757575] font-[400] ">
                  {user?.phoneNumber || ""}
                </p>
              </div>
              <GoChevronDown size={22} />
            </div>
            {showProfileBox && (
              <ProfileBox
                name={user?.name}
                role={user?.role}
                image={user?.profilePicture}
              />
            )}
            {showNotificationsBox && (
              <NotificationsBox
                ref={notifications_box_ref}
                notifications={notifications}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
