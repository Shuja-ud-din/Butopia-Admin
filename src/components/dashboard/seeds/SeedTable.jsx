import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Table from "../Table/Table";
import Pagination from "../Pagination/Pagination";

const SeedTable = () => {
  const token = localStorage.getItem("token");
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [searchValue, setSearchValue] = useState("");
  const [pages, setPages] = useState(1);
  const [count, setCount] = useState(1);
  const [selectedValue, setSelectedValue] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [seeds, setSeeds] = useState();

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${baseURL}/seed?page=${count}&limit=${selectedValue}&search=${searchValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSeeds(response.data.data);
      setTotalCount(response.data.totalCount);
      console.log("get all seeds", response);
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
      await axios.delete(`${baseURL}/seed/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
      toast.success("Seed Deleted Successfully");
    } catch (e) {
      toast.error("Error in Deleting Seed");
      console.error(e.response);
    }
  };

  return (
    <div>
      {/* <h2 className="text-[#039443] font-[700] text-[27px]">Seeds</h2> */}
      <Table
        tableName="Seed"
        array={seeds}
        routes={["/seeds/addSeed", "/seeds", "/seeds/editSeed"]}
        label={[
          "Name",
          "Scientific Name",
          "Category",
          "ClimateZone",
          "Actions",
        ]}
        keysToDisplay={["name", "scientificName", "category", "climateZone"]}
        setSearchValue={setSearchValue}
        customBlocks={[
          {
            index: 2,
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
};

export default SeedTable;
