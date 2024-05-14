import React, { useEffect } from "react";
import Button from "../Button/Button";
import Table from "../Table/Table";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import useCustomer from "../../Hooks/useCustomer";

const CustomersTable = () => {
  const navigate = useNavigate();
  const { data, getCustomerTable } = useCustomer();
  useEffect(() => {
    getCustomerTable()
  }, [])


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

      {/* <div className="flex justify-end my-3">
        <Button
          className=""
          onClick={() => navigate("/admin/customers/addCustomer")}
        >
          <FaPlus size={14} className="mr-2" />
          Add Customer
        </Button>
      </div> */}

      <Table
        recordClickRoute="/admin/customers/customerdetails"
        array={data}
        search={"name"}
        keysToDisplay={["index", "name", "email", "phoneNumber"]}
        label={["#", "customer Name", "Email", "Phone Number"]}
      // extraColumns={[
      //   () => {
      //     return (
      //       <MdDelete className="text-[#FF6666] mr-[1rem] text-[1.3rem]" />
      //     );
      //   },
      // ]}
      />
    </>
  );
};

export default CustomersTable;
