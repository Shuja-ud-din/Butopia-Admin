import React from "react";
import SideNavTabs from "./SideNavTabs";
import { useLocation } from "react-router-dom";

function SideNav({ active }) {
  const location = useLocation().pathname.split("/").pop();

  return (
    <div className="w-[20%]">
      <div className="w-[17%] bg-[white] h-[100vh] fixed top-0 left-0">
        <div className="">
          <img src="/logo1.png" alt="logo" className="p-7 w-[200px]" />
          <SideNavTabs active={active} />
        </div>
      </div>
    </div>
  );
}

export default SideNav;
