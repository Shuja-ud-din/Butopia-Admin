import React, { useEffect, useState } from "react";
import Table from "../components/dashboard/Table/Table";
import Pagination from "../components/dashboard/Pagination/Pagination";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import PlantsTable from "../components/dashboard/plants/PlantsTable";
import PlantDetailComponent from "../components/dashboard/plants/PlantDetailComponent";
import AddPlantComponent from "../components/dashboard/plants/AddPlantComponent";
import EditPlantComponent from "../components/dashboard/plants/EditPlantComponent";

const Plants = () => {
  return (
    <Routes>
      <Route path="/" element={<PlantsTable />} />
      <Route path="/:id" element={<PlantDetailComponent />} />
      <Route path="/addPlant" element={<AddPlantComponent />} />
      <Route path="/editPlant/:id" element={<EditPlantComponent />} />
    </Routes>
  );
};

export default Plants;
