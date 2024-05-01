import React from 'react'
import { Route, Routes } from "react-router-dom";
import ProviderTable from '../components/Providers/ProvidersTable'
import ProvidersForm from '../components/Providers/ProvidersForm/ProvidersForm';

const Services = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProviderTable />} />
                <Route path="/addproviders" element={<ProvidersForm />} />

            </Routes>
        </>
    )
}

export default Services