import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Table from "../Table/Table";
import Pagination from "../Pagination/Pagination";

const VehicleAccessoriesTable = () => {
  const token = localStorage.getItem("token");
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [searchValue, setSearchValue] = useState("");
  const [pages, setPages] = useState(1);
  const [count, setCount] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedValue, setSelectedValue] = useState(10);

  const [accessories, setAccessories] = useState();

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${baseURL}/vehicleAccessories?page=${count}&limit=${selectedValue}&search=${searchValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAccessories(response.data.data);
      console.log("get all accessories", response);
      setTotalCount(response.data.totalCount);
      setPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data", error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, [count, searchValue, selectedValue]);

  const deleteVehicle = async (id) => {
    if (!confirm("Are you sure you want to delete this Accessory?")) return;

    try {
      await axios.delete(`${baseURL}/vehicleAccessories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
      toast.success("Accessory Deleted Successfully");
    } catch (e) {
      toast.error("Error in Deleting Accessory");
      console.error(e.response);
    }
  };

  return (
    <div>
      {/* <h2 className="text-[#039443] font-[700] text-[27px]">Accessories</h2> */}
      <Table
        tableName="Accessory"
        array={accessories}
        routes={[
          "/vehicleAccessories/addVehicleAccessory",
          "/vehicleAccessories",
          "/vehicleAccessories/editAccessory",
        ]}
        label={["Name", "Material", "Weight", "Length", "Width", "Actions"]}
        keysToDisplay={["name", "material", "weight", "length", "width"]}
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

export default VehicleAccessoriesTable;
