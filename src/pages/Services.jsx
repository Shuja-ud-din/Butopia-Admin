import React from 'react'
import { Route, Routes } from "react-router-dom";
import ServiceTable from '../components/Services/ServiceTable'

const Services = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ServiceTable />} />
            </Routes>
        </>
    )
}

export default Services