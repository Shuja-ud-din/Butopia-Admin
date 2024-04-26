import React from "react";
import Table from "../Table/Table";

const data = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "09087654321",
  },
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "09087654321",
  },
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "09087654321",
  },
];

const AppointmentsTable = () => {
  return (
    <>
      <div className="w-full">
        <h3 className="text-[25px] font-[500] ">Appoitments</h3>
      </div>

      <Table
        array={data}
        filters={["name"]}
        keysToDisplay={["id", "name", "email", "phone"]}
        label={["id", "name", "email", "phone"]}
      />
    </>
  );
};

export default AppointmentsTable;
