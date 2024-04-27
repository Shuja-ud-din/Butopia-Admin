import React from "react";
import Table from "../Table/Table";
import Button from "../Button/Button";

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
  return (
    <>
      <div className="w-full">
        <h3 className="text-[25px] font-[500] ">Appoitments</h3>
      </div>

      <Table
        array={data}
        filters={["customerName"]}
        keysToDisplay={["id", "customerName", "phone", "provider", "date"]}
        label={["#", "customer Name", "phone", "provider", "date", "Actions"]}
        extraColumns={[
          () => {
            return (
              <Button outlined={true} type="danger">
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
