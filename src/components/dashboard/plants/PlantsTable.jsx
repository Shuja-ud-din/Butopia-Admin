import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../Table/Table";
import Pagination from "../Pagination/Pagination";
import { ToastContainer, toast } from "react-toastify";

const PlantsTable = () => {
  const token = localStorage.getItem("token");
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [searchValue, setSearchValue] = useState("");
  const [pages, setPages] = useState(1);
  const [count, setCount] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedValue, setSelectedValue] = useState(10);

  const [plants, setPlants] = useState();

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `https://api.agerlink.it/api/v1/plant?page=${count}&limit=${selectedValue}&search=${searchValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPlants(response.data.data);
      setTotalCount(response.data.totalCount);
      console.log("get all plants", response);
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
      await axios.delete(`${baseURL}/plant/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
      toast.success("Plant Deleted Successfully");
    } catch (e) {
      toast.error("Error in Deleting Plant");
      console.error(e.response);
    }
  };

  return (
    <div>
      {/* <h2 className="text-[#039443] font-[700] text-[27px]">Plants</h2> */}
      <Table
        tableName="Plant"
        array={plants}
        routes={["/plants/addPlant", "/plants", "/plants/editPlant"]}
        label={["Name", "Category", "ScientificName", "Description", "Actions"]}
        keysToDisplay={["name", "category", "scientificName", "description"]}
        customBlocks={[
          {
            index: 1,
            component: (value) => {
              return value.title;
            },
          },
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
};

export default PlantsTable;
