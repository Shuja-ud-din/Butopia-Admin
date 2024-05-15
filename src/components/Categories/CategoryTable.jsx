import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Table from "../Table/Table";
import Modal from "../Modal/Modal";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import useCategories from "../../Hooks/useCategories";
import StatusButton from "../StatusButton/StatusButton";
import Loader from "../Loader/Loader";
import Select from "../Dropdown/Select";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import StatusDropdown from "../StatusDropdown/StatusDropdown";
const CustomersTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const toggleAddModal = () => {
    setIsAddModalVisible((prevState) => !prevState);
  };

  const [id, setId] = useState("");
  const toggleEditModal = (record) => {
    setIsEditModalVisible((prevState) => !prevState);
    setId(record);
  };
  const {
    getCategoryTable,
    getAllCategories,
    data,
    setEditData,
    editData,
    handleChange,
    buttonStatus,
    handleButtonStatus,
    addCategory,
    loading,
    deleteCategory,

    ///edit
    editCategory,
    handleEditDataChange,

  } = useCategories();

  useEffect(() => {
    getCategoryTable();
  }, []);

  console.log(editData);
  return (
    <>
      {isEditModalVisible && (
        <Modal toggleModal={toggleEditModal}>
          <>
            <div className="w-full mb-3">
              <h3 className="text-[23px] font-[500] ">Edit Category</h3>
            </div>
            <div className="w-full ">
              <div>
                <div>
                  <Input
                    label={"Name"}
                    value={editData.title}
                    onChange={handleEditDataChange}
                    type="text"
                    name={"title"}
                  />
                </div>
                <div>
                  <label
                    htmlFor="harvestingPeriod"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    onChange={handleEditDataChange}
                    value={editData.description}
                    name={"description"}
                    type="text"
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border border-primary rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="mt-4"></div>
                <Select
                  className="w-full mb-3"
                  name="isActive"
                  onChange={handleEditDataChange}
                  value={editData.isActive}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Deactive</option>
                </Select>
              </div>
              <div></div>
            </div>
            <div className="w-full flex justify-end">
              <Button
                className="m-2"
                onClick={toggleEditModal}
                type="secondary"
              >
                Cancel
              </Button>
              <Button
                className="m-2 w-[6rem]"
                type="primary"
                onClick={() => editCategory(id).then(() => toggleEditModal())}
              >
                {loading ? <ButtonLoader /> : "Edit"}
              </Button>
            </div>
          </>
        </Modal>
      )}
      <div className="w-full flex justify-between mb-5">
        <h3 className="text-[25px] font-[500] ">Categories</h3>
        <Button
          className=""
          onClick={toggleAddModal}
        // onClick={() => navigate("/admin/categories/addcategory")}
        >
          <FaPlus size={14} className="mr-2" />
          Add Categories
        </Button>
      </div>
      {isAddModalVisible && (
        <Modal toggleModal={toggleAddModal}>
          <>
            <div className="w-full mb-3">
              <h3 className="text-[23px] font-[500] ">Add Category</h3>
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
                onChange={handleChange}
                value={data.title}
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
                onChange={handleChange}
                value={data.description}
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
              <Select
                className="w-full mb-3"
                name="isActive"
                onChange={handleChange}
                value={data.isActive}
              >
                <option value={true}>Active</option>
                <option value={false}>Deactive</option>
              </Select>
            </div>
            <div className="w-full flex justify-end">
              <Button
                className="m-2 w-[6rem]"
                type="primary"
                onClick={() => addCategory().then(toggleAddModal)}
              >
                {loading ? <ButtonLoader /> : "Add"}
              </Button>
              <Button className="m-2" onClick={toggleAddModal} type="secondary">
                Cancel
              </Button>
            </div>
          </>
        </Modal>
      )}

      <Table
        array={getAllCategories}
        search={"description"}
        keysToDisplay={["index", "title", "description", "isActive"]}
        label={["#", "Category Name", "Description", "Status", "Actions"]}
        customBlocks={[
          {
            index: 3,
            component: (isActive) => {
              return isActive ? "Active" : "Inactive";
            },
          },
        ]}
        extraColumns={[
          (record) => {
            return (
              <div className="flex gap-[1rem]">
                <MdEdit
                  className="text-[#ccccc] text-[1.3rem]"
                  onClick={() => {
                    toggleEditModal(record.id);
                    setEditData(record);
                    // setIsEditModalVisible(!isEditModalVisible);
                  }}
                />
                <MdDelete
                  className="text-[#FF6666] text-[1.3rem]"
                  onClick={() => {
                    if (
                      !confirm("Are you sure you want to delete this category?")
                    )
                      return;
                    deleteCategory(record.id);
                  }}
                />
              </div>
            );
          },
        ]}
      />
    </>
  );
};

export default CustomersTable;
