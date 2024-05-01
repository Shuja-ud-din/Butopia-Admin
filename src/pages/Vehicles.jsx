import { Route, Routes } from "react-router-dom";
import VehicleTable from "../components/dashboard/vehicle/VehicleTable";
import AddVehicleComponent from "../components/dashboard/vehicle/AddVehicleComponent";
import VehicleDetailsComponent from "../components/dashboard/vehicle/VehicleDetailComponent";
import EditVehicleComponent from "../components/dashboard/vehicle/EditVehicleComponent";

const Vehicles = () => {
  return (
    <Routes>
      <Route path="/" element={<VehicleTable />} />
      <Route path="/addVehicle" element={<AddVehicleComponent />} />
      <Route path="/:id" element={<VehicleDetailsComponent />} />
      <Route path="/editVehicle/:id" element={<EditVehicleComponent />} />
    </Routes>
  );
};

export default Vehicles;
