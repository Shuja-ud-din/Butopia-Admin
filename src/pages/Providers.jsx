import React from 'react'
import { Route, Routes, useParams } from "react-router-dom";
import ProviderTable from '../components/Providers/ProvidersTable'
import ProvidersForm from '../components/Providers/ProvidersForm';
import ProviderDetails from '../components/Providers/ProviderDetails';

const Services = () => {
    const { id } = useParams()
    return (
        <>
            <Routes>
                <Route path="/" element={<ProviderTable />} />
                <Route path="/addproviders" element={<ProvidersForm />} />
                <Route path={`"/providerdetails/"${id}`} element={<ProviderDetails />} />

            </Routes>
        </>
    )
}

export default Services