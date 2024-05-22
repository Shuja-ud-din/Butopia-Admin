import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Table from "../Table/Table";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import useCustomer from "../../Hooks/useCustomer";
import Modal from "../Modal/Modal";
import ImageUploader from "../ImageUploader/ImageUploader";
import Input from "../Input/Input";
import Select from "../Dropdown/Select";
import { MdEdit } from "react-icons/md";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

const CustomersTable = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState();
  const {
    data,
    getCustomerTable,
    setData,
    loading,
    setImagePreview,
    handleChange,
    addCustomer,
    addCustomerData,
    setAddCustomerData,
    editCustomer,
  } = useCustomer();
  const [showEditModal, setShowEditModal] = useState(false);
  useEffect(() => {
    getCustomerTable();
  }, []);

  const toggleEditModal = () => {
    setShowEditModal((prevState) => !prevState);
  };

  useEffect(() => {
    setCustomers(data);
  }, [data]);

  console.log(customers);

  return (
    <>
      <div className="w-full flex justify-between mb-5">
        <h3 className="text-[25px] font-[500] ">Customers</h3>
        <Button
          className=""
          onClick={() => navigate("/admin/customers/addcustomers")}
        >
          <FaPlus size={14} className="mr-2" />
          Add Customers
        </Button>
      </div>

      <Table
        routes={["/admin/customers"]}
        array={customers}
        search={"name"}
        keysToDisplay={["index", "name", "email", "phoneNumber", "isValid"]}
        label={[
          "#",
          "customer Name",
          "Email",
          "Phone Number",
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
              <>
                <MdEdit
                  onClick={() => {
                    toggleEditModal(record);
                    setAddCustomerData(record);
                  }}
                  className="text-[#ccccc] text-[1.3rem]"
                />
              </>
            );
          },
        ]}
      />

      {/* modals */}

      {showEditModal && (
        <Modal toggleModal={toggleEditModal}>
          <>
            <div className="w-full mb-3">
              <h3 className="text-[23px] font-[500] ">Edit Customer</h3>
            </div>
            <div className="w-full flex flex-col ">
              <div className=" w-full flex items-center justify-center">
                <div className="h-[200px] w-[200px]">
                  <ImageUploader
                    setUrl={setImagePreview}
                    image={addCustomerData.profilePicture}
                    profile
                  />
                </div>
              </div>
              <div>
                <Input
                  label={"Name"}
                  type="text"
                  name={"name"}
                  value={addCustomerData.name}
                  placeholder={"Name"}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Input
                  type="number"
                  value={addCustomerData.phoneNumber}
                  name={"phoneNumber"}
                  label={"Phone Number"}
                  placeholder={"PhoneNumber"}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Input
                  type="email"
                  value={addCustomerData.email}
                  name={"email"}
                  label={"Email"}
                  placeholder={"Email"}
                  onChange={handleChange}
                />
              </div>

              <div className="">
                <label
                  htmlFor="description"
                  className="block mb-[0.3rem] text-sm font-medium text-gray-700"
                  value={addCustomerData.isValid}
                >
                  Status
                </label>
                <Select
                  value={addCustomerData.isValid}
                  onChange={handleChange}
                  className="w-full mb-3"
                  name="isValid"
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </Select>
              </div>
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
                onClick={(e) =>
                  editCustomer(e, addCustomer).then(toggleEditModal)
                }
              >
                {loading ? <ButtonLoader /> : "Update"}
              </Button>
            </div>
          </>
        </Modal>
      )}
    </>
  );
};

export default CustomersTable;
