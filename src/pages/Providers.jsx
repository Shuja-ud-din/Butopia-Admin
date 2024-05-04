import React from 'react'
import { Route, Routes } from "react-router-dom";
import ProviderTable from '../components/Providers/ProvidersTable'
import ProvidersForm from '../components/Providers/ProvidersForm';
import ProviderDetails from '../components/Providers/ProviderDetails';

const Services = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProviderTable />} />
                <Route path="/addproviders" element={<ProvidersForm />} />
                <Route path="/providerdetails" element={<ProviderDetails />} />

            </Routes>
        </>
    )
}

export default Services