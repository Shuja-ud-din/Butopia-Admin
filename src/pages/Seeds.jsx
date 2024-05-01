import React from "react";
import { Route, Routes } from "react-router-dom";
import SeedTable from "../components/dashboard/seeds/SeedTable";
import SeedDetailsComponent from "../components/dashboard/seeds/SeedDetailsComponent";
import AddSeedForm from "../components/dashboard/seeds/AddSeedForm";
import EditSeedForm from "../components/dashboard/seeds/EditSeedForm";

const Seeds = () => {
  return (
    <Routes>
      <Route path="/" element={<SeedTable />} />
      <Route path="/:id" element={<SeedDetailsComponent />} />
      <Route path="/addSeed" element={<AddSeedForm />} />
      <Route path="/editSeed/:id" element={<EditSeedForm />} />
    </Routes>
  );
};

export default Seeds;
