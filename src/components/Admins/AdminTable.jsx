import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Button from "../Button/Button";
import Table from "../Table/Table";
import Select from "../Dropdown/Select";
import FilterButton from "../Button/FilterButton";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import useAdmin from "../../Hooks/useAdmin";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
const data = [
  {
    id: 1,
    customerName: "John Doe",
    phone: "09087654321",
    serviceName: "Service 1",
    date: "2015-03-25",
    amount: "2000",
  },
  {
    id: 2,
    customerName: "John Doe",
    phone: "09087654321",
    serviceName: "Service 1",
    date: "2015-03-25",
    amount: "2000",
  },
];
const AdminTable = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate("");
  const { getProviderTable, getAllAdminsTable, getAdminData, getAdmin } =
    useAdmin();
  useEffect(() => {
    getProviderTable();
    getAdmin();
  }, []);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  console.log(getAllAdminsTable);
  console.log(getAdminData);
  const toggleAddModal = () => {
    setIsAddModalVisible((prevState) => !prevState);
  };

  return (
    <>
      {isAddModalVisible && (
        <Modal toggleModal={toggleAddModal}>
          <>
            <div className="w-full mb-3">
              <h3 className="text-[23px] font-[500] ">Add Admin</h3>
            </div>
            <div>
              <label
                htmlFor="harvestingPeriod"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <Input
                type="text"
                name={"title"}
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Additional Comments
              </label>
              <textarea

                name="description"
                id="description"
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border border-primary rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>

            </div>
            <div className="w-full flex justify-end">
              <Button
                className="m-2 w-[6rem]"
                type="primary"
              >
                Add
              </Button>
              <Button className="m-2" onClick={toggleAddModal} type="secondary">
                Cancel
              </Button>
            </div>
          </>
        </Modal>
      )}
      <div className="w-full flex justify-between mb-5">
        <h3 className="text-[25px] font-[500] ">Admins</h3>
        <Button className="" onClick={() => navigate("/admin/admins/addadmin")}>
          <FaPlus size={14} className="mr-2" />
          Add Admin
        </Button>
      </div>

      <Table
        array={data}
        search={"name"}
        keysToDisplay={["name", "phoneNumber", "email", "isActive"]}
        label={["Name", "Phone Number", "Email", "Is Active", "Actions"]}
        routes={["/admin/admins"]}
        filter={() => {
          return (
            <>
              <Select className="mx-3">
                <option value="1">All</option>
                <option value="2">Active</option>
                <option value="3">Inactive</option>
              </Select>
              <FilterButton />
            </>
          );
        }}

        extraColumns={[
          () => {
            return <>
              <MdEdit onClick={toggleAddModal} className="text-[#ccccc] text-[1.3rem]" />
            </>

          },

        ]}
      />
    </>
  );
};

export default AdminTable;
