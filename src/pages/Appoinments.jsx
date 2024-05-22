import React from "react";
import { Route, Routes } from "react-router-dom";
import AppointmentsTable from "../components/Appointments/AppointmentsTable";
import AppointmentForm from "../components/Appointments/AppointmentForm";
import AppointmentDetail from "../components/Appointments/AppointmentDetail";

const Appoinments = () => {
  return (
    <Routes>
      <Route path="/" element={<AppointmentsTable />} />
      <Route path="/addappointment" element={<AppointmentForm />} />
      <Route path={"/:id"} element={<AppointmentDetail />} />
    </Routes>
  );
};

export default Appoinments;
