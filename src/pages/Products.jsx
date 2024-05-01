import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductsTable from "../components/dashboard/products/ProductsTable";
import ProductDetailsComponent from "../components/dashboard/products/ProductDetailsComponent";
import AddProductComponent from "../components/dashboard/products/AddProductComponent";
import EditProductForm from "../components/dashboard/products/EditProductForm";

const Products = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsTable />} />
      <Route path="/addProduct" element={<AddProductComponent />} />
      <Route path="/:id" element={<ProductDetailsComponent />} />
      <Route path="/editProduct/:id" element={<EditProductForm />} />
    </Routes>
  );
};

export default Products;
