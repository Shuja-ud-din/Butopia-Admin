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
import ImageUploader from "../ImageUploader/ImageUploader";
import StatusDropdown from "../StatusDropdown/StatusDropdown";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

const AdminTable = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate("");
  const { getProviderTable,
    getAllAdminsTable,
    getAdminData,
    getAdmin,
    handleStatusButtonChange,
    statusValue,
    data,
    editAdmin,
    handleEditDataChange,
    btnLoading
  } = useAdmin();
  useEffect(() => {
    getProviderTable();
    getAdmin();
  }, []);
  console.log(getAllAdminsTable);
  console.log(getAdminData);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [id, setId] = useState("")
  const toggleAddModal = (record) => {
    setId(record.id)
    setIsAddModalVisible((prevState) => !prevState);
  };

  console.log(statusValue);
  console.log(data);
  return (
    <>
      {isAddModalVisible && (
        <Modal toggleModal={toggleAddModal}>
          <>
            <div className="w-full mb-3">
              <h3 className="text-[23px] font-[500] ">Edit Admin</h3>
            </div>
            <div className="w-full flex gap-[2rem]">
              <div><div>
                <label
                  htmlFor="harvestingPeriod"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  onChange={handleEditDataChange}
                  type="text"
                  name={"name"}
                />
              </div>

                <div>
                  <label
                    htmlFor="harvestingPeriod"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Input
                    type="text"
                    onChange={handleEditDataChange}
                    name={"email"}
                  />
                </div>
                <div>
                  <label
                    htmlFor="harvestingPeriod"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <Input
                    type="text"
                    onChange={handleEditDataChange}
                    name={"phoneNumber"}
                  />
                </div>



                <div className="mt-4">

                </div>
                <StatusDropdown
                  options={[
                    { value: 'Valid', label: 'Valid' },
                    { value: 'Not Valid', label: 'Not Valid' },
                  ]}
                  initialValue="Valid"
                  onChange={handleStatusButtonChange}
                />
              </div>
              <div>
                <div className="mt-[2rem]">
                  <ImageUploader />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <Button
                className="m-2 w-[6rem]"
                type="primary"
                onClick={(e) => editAdmin(e, id)}
              >
                {btnLoading ? <ButtonLoader /> : "Add"}
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
        array={getAllAdminsTable}
        search={"name"}
        keysToDisplay={["name", "phoneNumber", "email",]}
        label={["Name", "Phone Number", "Email", "Actions"]}
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
          (record) => {
            return <>
              <MdEdit onClick={() => toggleAddModal(record)} className="text-[#ccccc] text-[1.3rem]" />
            </>

          },

        ]}
      />
    </>
  );
};

export default AdminTable;
