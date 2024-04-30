import React from "react";
import Table from "../Table/Table";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { TbCoins } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";
import { PiHandCoins } from "react-icons/pi";
import Select from "../Dropdown/Select";
import FilterButton from "../Button/FilterButton";
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
      <div className="flex gap-4 grid grid-cols-12 my-5 ">
        <div className="col-span-3  p-5 bg-[white] rounded-[1rem] shadow-lg">
          <FiUsers size={25} className="mb-4" />
          <p className="my-2">Total Appointments</p>
          <h2 className="font-[600] text-[23px] ">18399</h2>
        </div>
        <div className="col-span-3  p-5 bg-[white] rounded-[1rem] shadow-lg">
          <FiUsers size={25} className="mb-4" />
          <p className="my-2">Cancelled Appointments</p>
          <h2 className="font-[600] text-[23px] ">123</h2>
        </div>
        <div className="col-span-3  p-5 bg-[white] rounded-[1rem] shadow-lg">
          <IoCalendarOutline size={25} className="mb-4" />
          <p className="my-2">Pending Appointments</p>
          <h2 className="font-[600] text-[23px] ">1001</h2>
        </div>
        <div className="col-span-3  p-5 bg-[white] rounded-[1rem] shadow-lg">
          <PiHandCoins size={25} className="mb-4" />
          <p className="my-2">Conducted Appointments</p>
          <h2 className="font-[600] text-[23px] ">988</h2>
        </div>
      </div>
      <div className="flex justify-end my-3"></div>
      <div className="w-full flex justify-between mb-5 mt-[5rem]">
        <h3 className="text-[25px] font-[500] ">Appointments</h3>
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
        filter={() => {
          return (
            <>
              <Select className="mx-3">
                <option value="1">All</option>
                <option value="2">Pending</option>
                <option value="3">Conducted</option>
                <option value="4">Cancelled</option>
              </Select>
              <FilterButton />
            </>
          );
        }}
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
