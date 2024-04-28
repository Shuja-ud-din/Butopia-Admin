import React from 'react'
import { Route, Routes } from "react-router-dom";
import CategoryTable from "../components/Categories/CategoryTable";
import CategoryForm from '../components/Categories/CategoryForm';
const Categories = () => {
    return (
        <Routes>
            <Route path="/" element={<CategoryTable />} />
            <Route path="/addcategory" element={<CategoryForm />} />
        </Routes>
    )
}

export default Categories