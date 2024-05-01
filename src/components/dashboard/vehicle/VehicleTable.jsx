import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "../Table/Table";
import Pagination from "../Pagination/Pagination";

function VehicleTable() {
  const token = localStorage.getItem("token");
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [searchValue, setSearchValue] = useState("");
  const [pages, setPages] = useState(1);
  const [count, setCount] = useState(1);
  const [vehicles, setVehicles] = useState();
  const [selectedValue, setSelectedValue] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `https://api.agerlink.it/api/v1/vehicle?page=${count}&limit=${selectedValue}&search=${searchValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVehicles(response.data.data);
      setTotalCount(response.data.totalCount);
      console.log("get all vehicles", response);
      setPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  console.log(searchValue);

  useEffect(() => {
    fetchData();
  }, [count, searchValue, selectedValue]);

  const deleteVehicle = async (id) => {
    if (!confirm("Are you sure you want to delete this Vehicle?")) return;

    try {
      await axios.delete(`${baseURL}/vehicle/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
      toast.success("Vehicle Deleted Successfully");
    } catch (e) {
      toast.error("Error in Deleting Vehicle");
      console.error(e.response);
    }
  };

  return (
    <div>
      {/* <h2 className="text-[#039443] font-[700] text-[27px]">Vehicles</h2> */}
      <Table
        tableName="Vehicle"
        array={vehicles}
        routes={["/vehicles/addVehicle", "/vehicles", "/vehicles/editVehicle"]}
        label={["Name", "Brand", "Model", "Vehicle Type", "Year", "Actions"]}
        keysToDisplay={[
          "name",
          "brand",
          "vehicleModel",
          "vehicleType",
          "yearOfManufacture",
        ]}
        setSearchValue={setSearchValue}
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

export default VehicleTable;
