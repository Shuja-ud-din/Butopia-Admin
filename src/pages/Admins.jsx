import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminTable from "../components/Admins/AdminTable";
import AdminForm from "../components/Admins/AdminForm";

const Admins = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminTable />} />
      <Route path="/addadmin" element={<AdminForm />} />
      <Route path={"/:id"} element={<AdminForm />} />
    </Routes>
  );
};

export default Admins;
