import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import Button from "../Button/Button";
import Table from "../Table/Table";
import Select from "../Dropdown/Select";
import FilterButton from "../Button/FilterButton";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import useAdmin from "../../Hooks/useAdmin";



const AdminTable = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate("")
  const { getProviderTable, getAllAdminsTable,
    getAdminData, getAdmin
  } = useAdmin();
  useEffect(() => {
    getProviderTable();
    getAdmin();
  }, [])
  console.log(getAllAdminsTable);
  console.log(getAdminData);
  return (
    <>
      <div className="w-full flex justify-between mb-5">
        <h3 className="text-[25px] font-[500] ">Admins</h3>
        <Button
          className=""
          onClick={() => navigate("/admin/admins/addadmin")}
        >
          <FaPlus size={14} className="mr-2" />
          Add Admin
        </Button>
      </div>

      <Table
        array={getAllAdminsTable}
        search={"name"}
        keysToDisplay={["name", "phoneNumber", "email"]}
        label={["Name", "Phone Number", "Email", "Actions"]}
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
            return (
              <MdDelete className="text-[#FF6666] mr-[1rem] text-[1.3rem]" />
            );
          },
        ]}
      />
    </>
  );
};

export default AdminTable;
