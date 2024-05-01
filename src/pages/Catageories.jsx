import React from "react";
import { Route, Routes } from "react-router-dom";
import CatageoriesTable from "../components/dashboard/catageories/CatageoriesTable";
import AddCatagoryForm from "../components/dashboard/addCatagoryForm/AddCatagoryForm";
import CatagoryDetailsComponent from "../components/dashboard/catageories/CatagoryDetailsComponent";
import EditCategoryForm from "../components/dashboard/catageories/EditCategoryForm";

const Catageories = () => {
  return (
    <Routes>
      <Route path="/" element={<CatageoriesTable />} />
      <Route path="/:id" element={<CatagoryDetailsComponent />} />
      <Route path="/editCatageory/:id" element={<EditCategoryForm />} />
      <Route path="/addCatageory" element={<AddCatagoryForm />} />
    </Routes>
  );
};

export default Catageories;
