import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { SiGoogleanalytics } from "react-icons/si";
import { FiUsers } from "react-icons/fi";

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
