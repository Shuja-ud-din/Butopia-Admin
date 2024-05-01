import React, { useEffect, useState } from "react";
import Header from "../components/dashboard/users/Header";
import SideNav from "../components/dashboard/sidenav/SideNav";
import Search from "../components/dashboard/users/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { alphabeticSort } from "../utils/alphabeticSort";
import request from "../utils/request";
import { ToastContainer, toast } from "react-toastify";

const ManualTools = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [manualTools, setManualTools] = useState([]);
  const [filteredManualTools, setFilteredManualTools] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState();

  // ----------------------------- Functions --------------------------//

  // getAllTool function for retrieving list of tools from db
  const getAllTools = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "https://api.agerlink.it/api/v1/manualTool",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setManualTools(data?.data);
      setFilteredManualTools(data?.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  // delete handler for manual tool
  const deleteHandler = async (id) => {
    try {
      const { data } = await request.delete(`/manualTool/${id}`);
      if (data?.success) {
        setOpenModal(false);
        toast.success("Manual Tool deleted successfully");
        getAllTools();
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Error in deleting Manual Tool"
      );
    }
  };

  // Function to handle Search results
  const handleSearch = (input) => {
    const searchValue = input.toLowerCase(); // lowercase
    setSearchQuery(searchValue); // Updating search query

    const filteredData = manualTools.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );

    setFilteredManualTools(filteredData);
  };

  // ---------------------------- Use Effects ------------------------//
  useEffect(() => {
    getAllTools();
  }, []);

  // useEffect to reflect the sorting order selected by user
  useEffect(() => {
    setFilteredManualTools(manualTools);
  }, [manualTools]);

  return (
    <div>
      <div className="rounded-lg bg-white m-6 py-5">
        {/* Component Header */}
        <div className="flex justify-between text-primary font-semibold border-b py-1 px-5">
          <h2 className="text-lg">Manual Tools Details</h2>

          {/* table sort */}
          {/* <button className="flex gap-2 items-center">
                <p>Sort by</p>
                <img src="./chevron-down.svg" alt="" />
              </button> */}

          <button>
            <img src="./settings.svg" alt="" />
          </button>
        </div>

        {/* search Header */}
        <div className="flex items-center justify-between py-2 px-5">
          <h2 className="text-lg font-semibold">Manual Tools List</h2>

          <div className="flex gap-2 items-center">
            <Search
              setSearchValue={setSearchQuery}
              searchValue={searchQuery}
              handleSearch={handleSearch}
            />

            <button
              onClick={() => navigate("/tools/addTool")}
              className="bg-primary py-2 px-5 text-white rounded font-semibold"
            >
              Add New Tool
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="bg-[#EAECF0] w-full px-5 py-2 font-semibold flex justify-between items-center">
          <button
            className="flex gap-2 items-center"
            onClick={() =>
              alphabeticSort(
                manualTools,
                setManualTools,
                sortOrder,
                setSortOrder
              )
            }
          >
            <p className="text-base">Manual Tools Name</p>
            <img src="./sortupdown.svg" alt="" />
          </button>

          <p>Action</p>
        </div>

        {loading
          ? // loading component
            Array.from(Array(10).keys()).map((index) => (
              <div key={index} className="h-12 bg-light rounded m-2"></div>
            ))
          : // Data Row
            filteredManualTools?.map(({ name, _id }, index) => (
              <button className="flex items-center justify-between p-5 border-b w-full">
                <p
                  className="underline"
                  onClick={() => navigate(`/tools/${_id}?edit=false`)}
                >
                  {name}
                </p>

                {/* action Buttons */}
                <div className="flex gap-5 items-center">
                  {/* edit */}
                  <button onClick={() => navigate(`/tools/${_id}?edit=true`)}>
                    <img
                      src="./edit-white.svg"
                      alt=""
                      className=" hover:scale-125"
                    />
                  </button>

                  {/* delete */}
                  <button
                    onClick={() => {
                      setDeleteId(_id);
                      setOpenModal(true);
                    }}
                  >
                    {/* <button onClick={() => deleteHandler(_id)}> */}
                    <img
                      src="./delete-white.svg"
                      alt=""
                      className="hover:scale-125"
                    />
                  </button>
                  {openModal && (
                    <ConfirmationModal
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      id={deleteId}
                      handler={deleteHandler}
                    />
                  )}
                </div>
              </button>
            ))}
      </div>
      {/* </div> */}
      {/* </div> */}

      <ToastContainer />
    </div>
  );
};

const ConfirmationModal = ({ openModal, setOpenModal, id, handler }) => {
  return (
    <div
      className={`fixed h-screen w-full top-0 left-0 flex justify-center items-center z-50 ${
        openModal ? "bg-black bg-opacity-10" : ""
      }`}
      onClick={() => setOpenModal(false)}
    >
      <div className="absolute p-5 bg-white w-auto z-60 text-black flex flex-col gap-5 justify-center rounded-xl">
        {/* Modal Header */}
        <div className="flex justify-between items-center text-lg font-bold mb-5">
          <p>Confirm deletion!</p>
          <p onClick={() => setOpenModal(false)}>
            <img src="./cancelBtn.svg" alt="" />
          </p>
        </div>

        <div>
          <p>Pressing confirm will delete the Manual Tool.</p>
        </div>

        <button
          className="bg-primary text-white px-6 py-2 rounded-md w-fit ml-auto"
          onClick={() => handler(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ManualTools;
