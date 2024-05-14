import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import ProviderTable from "../components/Providers/ProvidersTable";
import ProvidersForm from "../components/Providers/ProvidersForm";
import ProviderDetails from "../components/Providers/ProviderDetails";
import ProviderEditForm from "../components/Providers/ProviderEditForm";

const Services = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProviderTable />} />
        <Route path="/addproviders" element={<ProvidersForm />} />
        <Route path={"/:id"} element={<ProviderEditForm />} />
        <Route path={"/:id"} element={<ProviderDetails />} />
      </Routes>
    </>
  );
};

export default Services;
