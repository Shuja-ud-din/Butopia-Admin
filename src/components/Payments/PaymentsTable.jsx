import React, { useEffect } from "react";
import Button from "../Button/Button";
import { FaPlus } from "react-icons/fa6";
import Table from "../Table/Table";
import Select from "../Dropdown/Select";
import FilterButton from "../Button/FilterButton";
import { MdDelete } from "react-icons/md";
import usePayment from "../../Hooks/usePayment";


const PaymentsTable = () => {
  const{getAllPayments,customerPayments} = usePayment()

  function convertToDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  }

  useEffect(() => {
    getAllPayments();
  }, []);
  console.log(customerPayments);
  
  return (
    <>
      <div className="w-full flex justify-between mb-5">
        <h3 className="text-[25px] font-[500] ">Payments</h3>
      </div>

      <Table
       array={customerPayments}
                  keysToDisplay={[
                    "index",
                    "amount",
                    "createdAt",
                    "updatedAt",
                    "status",
                  ]}
                  customBlocks={[
                    {
                      index: 2,
                      component: (createdAt) => {
                        return convertToDate(createdAt);
                      },
                    },
                    {
                      index: 3,
                      component: (updatedAt) => {
                        return convertToDate(updatedAt);
                      },
                    },
                  ]}
                  label={[ "#","Amount", "Created at","Updated at", "Status"]}
                />
    </>
  );
};

export default PaymentsTable;
