import React, { useEffect } from "react";
import SideNav from "../components/dashboard/sidenav/SideNav";
import ListUsersComponent from "../components/dashboard/ListUsersComponent";
import { useNavigate } from "react-router-dom";

function ListUsers() {
  const navigate = useNavigate();


  useEffect(()=>{
    const login = localStorage.getItem("token");

    if (!login) {
      navigate("/");
    }
  
  },[])

  return (
    <div className="flex bg-[#f5f5f5] w-full h-screen overflow-hidden">
      <SideNav active={"users"}/>
      <ListUsersComponent />
    </div>
  );
}

export default ListUsers;
