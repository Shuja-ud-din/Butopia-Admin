import React from "react";
import { Route, Routes } from "react-router-dom";
import AppointmentsTable from "../components/Appointments/AppointmentsTable";
import AppointmentForm from "../components/Appointments/AppointmentForm";

const Appoinments = () => {
  return (
    <Routes>
      <Route path="/" element={<AppointmentsTable />} />
      <Route path="/addappointment" element={<AppointmentForm />} />
    </Routes>
  );
};

export default Appoinments;
