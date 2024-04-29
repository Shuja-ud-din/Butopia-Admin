import React from "react";
import Table from "../Table/Table";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const data = [
  {
    id: "1",
    customerName: "John Doe",
    phone: "09087654321",
    provider: "Clinic 1",
    date: "2015-03-25",
  },
  {
    id: "2",
    customerName: "John Doe",
    phone: "09087654321",
    provider: "Clinic 1",
    date: "2015-03-25",
  },
  {
    id: "3",
    customerName: "John Doe",
    phone: "09087654321",
    provider: "Clinic 1",
    date: "2015-03-25",
  },
];

const AppointmentsTable = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full">
        <h3 className="text-[25px] font-[500] ">Appoitments</h3>
      </div>
      <div className="flex justify-end my-3">
        <Button
          className=""
          onClick={() => navigate("/admin/appointments/addappointment")}
        >
          <FaPlus size={14} className="mr-2" />
          Add Appointment
        </Button>
      </div>

      <Table
        array={data}
        search={"customerName"}
        keysToDisplay={["id", "customerName", "phone", "provider", "date"]}
        label={["#", "customer Name", "phone", "provider", "date", "Actions"]}
        extraColumns={[
          () => {
            return (
              <Button
                className="w-20 text-right"
                width="70px"
                outlined={true}
                type="danger"
              >
                Cancel
              </Button>
            );
          },
        ]}
      />
    </>
  );
};

export default AppointmentsTable;
