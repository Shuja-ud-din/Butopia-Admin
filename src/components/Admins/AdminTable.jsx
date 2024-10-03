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
import Profile from "../../assets/avatar.jpg";

const AdminTable = () => {
  const token = localStorage.getItem("token");
  const [admins, setAdmins] = useState();
  const navigate = useNavigate("");
  const {
    getProviderTable,
    getAllAdminsTable,
    getAdminData,
    getAdmin,
    handleStatusButtonChange,
    statusValue,
    data,
    setData,
    editAdmin,
    handleEditDataChange,
    loading,
    handleChangeStatus,
    selectedOption,
    setProfilePicture,
  } = useAdmin();

  useEffect(() => {
    getProviderTable();
    getAdmin();
  }, []);
  console.log(selectedOption);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const toggleAddModal = () => {
    setIsAddModalVisible((prevState) => !prevState);
  };

  useEffect(() => {
    setAdmins(getAllAdminsTable);
  }, [getAllAdminsTable]);

  return (
    <>
      {isAddModalVisible && (
        <Modal toggleModal={toggleAddModal}>
          <>
            <div className="w-full mb-3">
              <h3 className="text-[23px] font-[500] ">Edit Admin</h3>
            </div>
            <div className="w-full flex flex-col ">
              <div className=" w-full flex items-center justify-center">
                <div className="h-[200px] w-[200px]">
                  <ImageUploader
                    setUrl={setProfilePicture}
                    image={data.profilePicture}
                    profile
                  />
                </div>
              </div>
              <div>
                <Input
                  label={"Name"}
                  type="text"
                  name={"name"}
                  value={data.name}
                  placeholder={"Name"}
                  onChange={handleEditDataChange}
                />
              </div>
              <div>
                <Input
                  type="number"
                  value={data.phoneNumber}
                  name={"phoneNumber"}
                  label={"Phone Number"}
                  placeholder={"PhoneNumber"}
                  onChange={handleEditDataChange}
                />
              </div>
              <div>
                <Input
                  type="email"
                  value={data.email}
                  name={"email"}
                  label={"Email"}
                  placeholder={"Email"}
                  onChange={handleEditDataChange}
                />
              </div>

              <div className="">
                <label
                  htmlFor="description"
                  className="block mb-[0.3rem] text-sm font-medium text-gray-700"
                  value={data.isValid}
                >
                  Status
                </label>
                <Select
                  value={data.isValid}
                  onChange={handleEditDataChange}
                  className="w-full mb-3"
                  name="isValid"
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </Select>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <Button className="m-2" onClick={toggleAddModal} type="secondary">
                Cancel
              </Button>
              <Button
                className="m-2 w-[6rem]"
                type="primary"
                onClick={(e) => editAdmin(e, data.id).then(toggleAddModal)}
              >
                {loading ? <ButtonLoader /> : "Update"}
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
        array={admins}
        search={"name"}
        keysToDisplay={["index", "name", "phoneNumber", "email", null]}
        label={["#", "Name", "Phone Number", "Email", "Status", "Actions"]}
        // routes={["/admin/admins"]}
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
        customBlocks={[
          {
            index: 4,
            component: (isValid) => {
              return isValid ? "Valid" : "Invalid"
            }
          }
        ]}
        // customBlocks={[
        //   {
        //     index: 4,
        //     component: ({ isValid, id }) => {
        //       return (
        //         <Select onChange={(e) => handleChangeStatus(e, id)}>
        //           <option value="Valid">{isValid ? "Valid" : "Invalid"}</option>
        //           <option value="Invalid">
        //             {isValid ? "Invalid" : "Valid"}
        //           </option>
        //         </Select>
        //       );
        //     },
        //   },
        // ]}
        extraColumns={[
          (record) => {
            return (
              <>
                <MdEdit
                  onClick={() => {
                    toggleAddModal(record);
                    setData(record);
                  }}
                  className="text-[#ccccc] text-[1.3rem]"
                />
              </>
            );
          },
        ]}
      />
    </>
  );
};

export default AdminTable;
