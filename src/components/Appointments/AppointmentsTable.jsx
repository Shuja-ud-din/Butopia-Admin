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
        search={"customerName"}
        keysToDisplay={[null, "customerName", "phone", "provider", "date"]}
        label={["#", "customer Name", "phone", "provider", "date", "Actions"]}
        customBlocks={[
          {
            index: 0,
            component: (obj) => {
              return (
                <>
                  <p>{obj.id}</p>
                  <p>{obj.phone}</p>
                </>
              );
            },
          },
        ]}
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
