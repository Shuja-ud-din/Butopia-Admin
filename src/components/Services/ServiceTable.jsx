import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Table from "../Table/Table";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import useServices from "../../Hooks/useServices";
import Modal from '../Modal/Modal'
import Input from "../Input/Input";
import Select from "../Dropdown/Select";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
const ServiceTable = () => {
  const navigate = useNavigate("")
  useEffect(() => {
    getServicesTable();
  }, [])
  const [id, setId] = useState("")
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const toggleAddModal = (id) => {
    setId(id)
    setIsAddModalVisible((prevState) => !prevState);
  };
  const { data, getServicesTable, handleEditServiceDataChange, editServiceData, editService } = useServices()
  console.log(id);
  return (
    <>
      {isAddModalVisible && (
        <Modal toggleModal={toggleAddModal}>
          <>
            <div className="w-full mb-3">
              <h3 className="text-[23px] font-[500] ">Edit Service</h3>
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
                name={"name"}
                onChange={handleEditServiceDataChange}
              />
            </div>
            <div>
              <label
                htmlFor="harvestingPeriod"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <Input
                type="text"
                name={"price"}
                onChange={handleEditServiceDataChange}
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                onChange={handleEditServiceDataChange}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border border-primary rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="description"
                className="block mb-[0.3rem] text-sm font-medium text-gray-700"
              >
                Select Category
              </label>
              <Select
                className="w-full mb-3"
                name="isActive"
              >
                <option value={true}>Category 1</option>
                <option value={false}>Category 2</option>
              </Select>
            </div>
            <div className="w-full flex justify-end">
              <Button
                className="m-2 w-[6rem]"
                type="primary"
                onClick={() => editService(id).then(toggleAddModal)}
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
        <h3 className="text-[25px] font-[500] ">Services</h3>
        <Button
          className=""
          onClick={() => navigate("/admin/services/addservices")}
        >
          <FaPlus size={14} className="mr-2" />
          Add Services
        </Button>
      </div>

      <Table
        array={data}
        search={"description"}
        keysToDisplay={["index", "name", "description", "price", "isValid"]}
        label={["#", "Service Name", "Description", "Price", "Actions"]}
        customBlocks={[
          {
            index: 4,
            component: (isValid) => {
              return isValid ? "Valid" : "Invalid"
            }
          }
        ]}
        extraColumns={[
          (record) => {
            return (
              <div className="flex gap-[1rem]">
                <MdEdit onClick={() => toggleAddModal(record.id)} className="text-[#ccccc] text-[1.3rem]" />
              </div>
            );
          }
        ]}
      />
    </>
  );
};

export default ServiceTable;
