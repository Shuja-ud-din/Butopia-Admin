import React from "react";
import Button from "../Button/Button";
import { FaPlus } from "react-icons/fa6";
import Table from "../Table/Table";
import Select from "../Dropdown/Select";
import FilterButton from "../Button/FilterButton";

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

const PaymentsTable = () => {
  return (
    <>
      <div className="w-full flex justify-between mb-5">
        <h3 className="text-[25px] font-[500] ">Admins</h3>
        {/* <Button
          className=""
          // onClick={() => navigate("/admin/providers/addproviders")}
        >
          <FaPlus size={14} className="mr-2" />
          Add Admin
        </Button> */}
      </div>

      <Table
        array={data}
        search={"customerName"}
        keysToDisplay={[
          "id",
          "customerName",
          "serviceName",
          "phone",
          "date",
          "amount",
        ]}
        label={[
          "#",
          "Customer Name",
          "Service Name",
          "Phone Number",
          "Date",
          "Amount",
          "Actions",
        ]}
        filter={() => {
          return (
            <>
              <input type="date" className="h-[40px] mx-3 rounded-lg px-2 " />
              <FilterButton />
            </>
          );
        }}
        extraColumns={[
          () => {
            return (
              <Button type="danger" className="w-[80px]" outlined>
                Delete
              </Button>
            );
          },
        ]}
      />
    </>
  );
};

export default PaymentsTable;
