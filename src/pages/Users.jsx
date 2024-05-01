import React from "react";
import { Route, Routes } from "react-router-dom";
import ListUsersComponent from "../components/dashboard/ListUsersComponent";
import UserProfileComponent from "../components/dashboard/UserProfileComponent";
import OwnerProfileComponent from "../components/dashboard/OwnerProfileComponent";

const Users = () => {
  return (
    <Routes>
      <Route path="/" element={<ListUsersComponent />} />
      <Route path="/:id" element={<UserProfileComponent />} />
      <Route path="/businessOwner/:id" element={<OwnerProfileComponent />} />
    </Routes>
  );
};

export default Users;
