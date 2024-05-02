import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { SiGoogleanalytics } from "react-icons/si";
import { FiUsers } from "react-icons/fi";
import { TbCategory } from "react-icons/tb";
import { MdOutlineMedicalServices } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { MdOutlinePayments } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { IoMdChatbubbles } from "react-icons/io";

const SideBar = () => {
  const parentLocation = useLocation().pathname.split("/")[2];

  const sideBarItems = [
    {
      icon: <SiGoogleanalytics />,
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <IoCalendarOutline />,
      title: "Appointments",
      path: "/appointments",
    },
    {
      icon: <FiUsers />,
      title: "Customers",
      path: "/customers",
    },
    {
      icon: <TbCategory />,
      title: "Categories",
      path: "/categories",
    },
    {
      icon: <MdOutlineMedicalServices />,
      title: "Services",
      path: "/services",
    },
    {
      icon: <FaUserDoctor />,
      title: "Providers",
      path: "/providers",
    },
    {
      icon: <RiAdminFill />,
      title: "Admins",
      path: "/admins",
    },
    {
      icon: <MdOutlinePayments />,
      title: "Payments",
      path: "/payments",
    },
    {
      icon: <BiSupport />,
      title: "Support",
      path: "/support",
    },
    {
      icon: <IoMdChatbubbles />,
      title: "Chats",
      path: "/chats",
    },
  ];

  return (
    <div className="w-full p-3 ">
      {sideBarItems.map((item, index) => (
        <NavLink
          key={index}
          to={`/admin${item.path}`}
          className={`w-full p-[10px] mb-2 rounded-[10px] flex items-center gap-2 cursor-pointer ${
            "/" + parentLocation === item.path ? "bg-primary text-[white]" : ""
          } `}
        >
          {item.icon}
          <span className="pl-2">{item.title}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default SideBar;
