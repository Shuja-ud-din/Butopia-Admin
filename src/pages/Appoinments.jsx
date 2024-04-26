import React from "react";
import { Route, Routes } from "react-router-dom";
import AppointmentsTable from "../components/Appointments/AppointmentsTable";

const Appoinments = () => {
  return (
    <Routes>
      <Route path="/" element={<AppointmentsTable />} />
    </Routes>
  );
};

export default Appoinments;
