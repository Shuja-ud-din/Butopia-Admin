import React from "react";
import { Route, Routes } from "react-router-dom";
import PaymentsTable from "../components/Payments/PaymentsTable";

const Payments = () => {
  return (
    <Routes>
      <Route path="/" element={<PaymentsTable />} />
    </Routes>
  );
};

export default Payments;
