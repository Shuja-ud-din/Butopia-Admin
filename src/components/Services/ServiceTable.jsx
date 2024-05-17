import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Table from "../Table/Table";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import useServices from "../../Hooks/useServices";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Select from "../Dropdown/Select";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
const ServiceTable = () => {
  const navigate = useNavigate("");
  useEffect(() => {
    getServicesTable();
  }, []);
  const [id, setId] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const toggleAddModal = (id) => {
    setId(id);
    setIsAddModalVisible((prevState) => !prevState);
  };
  console.log(id);
  const {
    data,
    getServicesTable,
    handleEditServiceDataChange,
    editServiceData,
    editService,
    loading,
    setEditServiceData,
  } = useServices();
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
              <Input
                label={"Service Name"}
                type="text"
                name={"name"}
                value={editServiceData.name}
                placeholder={"Service Name"}
                onChange={handleEditServiceDataChange}
              />
            </div>
            <div>
              <Input
                type="number"
                value={editServiceData.price}
                name={"price"}
                label={"Price"}
                placeholder={"Price"}
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
                value={editServiceData.description}
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
                Status
              </label>
              <Select
                value={editServiceData.isValid}
                onChange={handleEditServiceDataChange}
                className="w-full mb-3"
                name="isValid"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </Select>
            </div>
            <div className="w-full flex justify-end">
              <Button className="m-2" onClick={toggleAddModal} type="secondary">
                Cancel
              </Button>
              <Button
                className="m-2 w-[6rem]"
                type="primary"
                onClick={() => editService(id).then(toggleAddModal)}
              >
                {loading ? <ButtonLoader /> : "Update"}
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
        label={[
          "#",
          "Service Name",
          "Description",
          "Price",
          "Status",
          "Actions",
        ]}
        customBlocks={[
          {
            index: 4,
            component: (isValid) => {
              return isValid ? "Active" : "Inactive";
            },
          },
        ]}
        extraColumns={[
          (record) => {
            return (
              <div className="flex gap-[1rem]">
                <MdEdit
                  onClick={() => {
                    toggleAddModal(record.id);
                    setEditServiceData(record);
                  }}
                  className="text-[#ccccc] text-[1.3rem]"
                />
              </div>
            );
          },
        ]}
      />
    </>
  );
};

export default ServiceTable;
