import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomersTable from "../components/Customers/CustomersTable";
import CustomerForm from "../components/Customers/CustomerForm";
import CustomerDetails from "../components/Customers/CustomerDetails";

const Customers = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomersTable />} />
      <Route path="/addcustomers" element={<CustomerForm />} />
      <Route path="/customerdetails" element={<CustomerDetails />} />
    </Routes>
  );
};

export default Customers;
