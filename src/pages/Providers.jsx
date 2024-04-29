import React from 'react'
import { Route, Routes } from "react-router-dom";
import ProviderTable from '../components/Providers/ProvidersTable'

const Services = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProviderTable />} />
            </Routes>
        </>
    )
}

export default Services