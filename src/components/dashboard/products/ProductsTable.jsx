import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../Table/Table";
import Pagination from "../Pagination/Pagination";

function ProductsTable() {
  const token = localStorage.getItem("token");
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [searchValue, setSearchValue] = useState("");
  const [pages, setPages] = useState(1);
  const [count, setCount] = useState(1);
  const [selectedValue, setSelectedValue] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [products, setProducts] = useState();

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${baseURL}/product?page=${count}&limit=${selectedValue}&search=${searchValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data.data);
      setTotalCount(response.data.totalCount);
      console.log("get all products", response);
      setPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data", error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, [count, searchValue, selectedValue]);

  const deleteVehicle = async (id) => {
    if (!confirm("Are you sure you want to delete this Seed?")) return;

    try {
      await axios.delete(`${baseURL}/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
      toast.success("Product Deleted Successfully");
    } catch (e) {
      toast.error("Error in Deleting Product");
      console.error(e.response);
    }
  };

  return (
    <div>
      {/* <h2 className="text-[#039443] font-[700] text-[27px]">Products</h2> */}
      <Table
        tableName="Product"
        array={products}
        tableCategory="Product Details"
        routes={["/products/addProduct", "/products", "/products/editProduct"]}
        label={["Title", "Category", "Description", "Actions"]}
        keysToDisplay={["title", "category", "descritption"]}
        setSearchValue={setSearchValue}
        customBlocks={[
          {
            index: 1,
            component: (value) => {
              return value.title;
            },
          },
        ]}
        deleteRecord={deleteVehicle}
      />
      <Pagination
        setCount={setCount}
        count={count}
        selectedValue={selectedValue}
        totalCount={totalCount}
        setSelectedValue={setSelectedValue}
        pages={pages}
      />

      <ToastContainer />
    </div>
  );
}

export default ProductsTable;
