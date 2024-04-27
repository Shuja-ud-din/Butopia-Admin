import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomersTable from "../components/Customers/CustomersTable";

const Customers = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomersTable />} />
    </Routes>
  );
};

export default Customers;
