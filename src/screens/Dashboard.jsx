import React from "react";
import SideNav from "../components/dashboard/sidenav/SideNav";
import Header from "../components/dashboard/users/Header";
import { Route, Routes } from "react-router-dom";
import TaskManagement from "../components/dashboard/businessProfile/TaskManagement";
import Vehicles from "../pages/Vehicles";
import Plants from "../pages/Plants";
import Products from "../pages/Products";
import Catageories from "../pages/Catageories";
import VehicleAcessories from "../pages/VehicleAcessories";
import Seeds from "../pages/Seeds";
import Users from "../pages/Users";
import ManualTools from "../pages/ManualTools";
import AddManualTool from "../pages/AddManualTool";

const Dashboard = () => {
  return (
    <div className="flex bg-[#f5f5f5] w-full ">
      <SideNav active="seeds" />

      <div className="w-full h-[100vh] min-h-screen overflow-auto overflow-x-hidden">
        <Header />
        <div className=" mx-9">
          <Routes>
            <Route path="/users/*" element={<Users />} />
            <Route path="/tasks" element={<TaskManagement />} />
            <Route path="/vehicles/*" element={<Vehicles />} />

            <Route path="/plants/*" element={<Plants />} />
            <Route path="/products/*" element={<Products />} />
            <Route path="/catageories/*" element={<Catageories />} />

            <Route
              path="/vehicleAccessories/*"
              element={<VehicleAcessories />}
            />
            <Route path="/seeds/*" element={<Seeds />} />

            <Route path="/tools" element={<ManualTools />} />
            <Route path="/tools/addTool" element={<AddManualTool />} />
            <Route path="/tools/:tid" element={<AddManualTool />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
