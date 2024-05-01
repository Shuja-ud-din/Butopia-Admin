import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminTable from "../components/Admins/AdminTable";

const Admins = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminTable />} />
    </Routes>
  );
};

export default Admins;
