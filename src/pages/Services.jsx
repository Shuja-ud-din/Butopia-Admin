import React from 'react'
import { Route, Routes } from "react-router-dom";
import ServiceTable from '../components/Services/ServiceTable'
import ServiceForm from '../components/Services/ServiceForm'

const Services = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ServiceTable />} />
                <Route path="/addservices" element={<ServiceForm />} />
            </Routes>
        </>
    )
}

export default Services