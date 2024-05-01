import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Table from "../Table/Table";
import Pagination from "../Pagination/Pagination";

const CatageoriesTable = () => {
  const token = localStorage.getItem("token");
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [searchValue, setSearchValue] = useState("");
  const [pages, setPages] = useState(1);
  const [count, setCount] = useState(1);
  const [selectedValue, setSelectedValue] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [catageories, setCatageories] = useState();

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${baseURL}/category?type=product&page=${count}&limit=${selectedValue}&search=${searchValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCatageories(response.data.data);
      setTotalCount(response.data.totalCount);
      console.log("get all catageories", response);
      setPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data", error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, [count, searchValue, selectedValue]);

  const deleteVehicle = async (id) => {
    if (!confirm("Are you sure you want to delete this Category?")) return;

    try {
      await axios.delete(`${baseURL}/Catageory/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
      toast.success("Catageory Deleted Successfully");
    } catch (e) {
      toast.error("Error in Deleting Catageory");
      console.error(e.response);
    }
  };

  return (
    <div>
      {/* <h2 className="text-[#039443] font-[700] text-[27px]">Catageories</h2> */}
      <Table
        tableName="Catageory"
        array={catageories}
        routes={[
          "/catageories/addCatageory",
          "/catageories",
          "/catageories/editCatageory",
        ]}
        label={["Title", "Type", "Description", "Actions"]}
        keysToDisplay={["title", "type", "description"]}
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

export default CatageoriesTable;
