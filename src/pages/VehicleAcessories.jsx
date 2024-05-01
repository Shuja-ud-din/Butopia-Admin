import React from "react";
import { Route, Routes } from "react-router-dom";
import VehicleAccessoriesTable from "../components/dashboard/vehicleAccessories/VehicleAccessoriesTable";
import VehicleAcessoryDetailsComponent from "../components/dashboard/vehicleAccessories/VehicleAcessoryDetailsComponent";
import AddVehicleAccessoriesForm from "../components/dashboard/vehicleAccessories/AddvehicleAccessoriesForm";
import EditAccessoriesForm from "../components/dashboard/vehicleAccessories/EditAccessoriesForm";

const VehicleAcessories = () => {
  return (
    <Routes>
      <Route path="/" element={<VehicleAccessoriesTable />} />
      <Route path="/:id" element={<VehicleAcessoryDetailsComponent />} />
      <Route path="/editAccessory/:id" element={<EditAccessoriesForm />} />
      <Route
        path="/addVehicleAccessory"
        element={<AddVehicleAccessoriesForm />}
      />
    </Routes>
  );
};

export default VehicleAcessories;
