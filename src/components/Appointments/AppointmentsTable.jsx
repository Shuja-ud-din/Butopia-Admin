import React, { useEffect } from "react";
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
import { MdOutlineCancel } from "react-icons/md";
import useAppointment from "../../Hooks/useAppointment";
import useCustomer from "../../Hooks/useCustomer";

const AppointmentsTable = () => {
  const navigate = useNavigate();
  const {
    getAppointmentTableData,
    getAppointmentTable,
    setGetAppointmentTableData,
  } = useAppointment();
  useEffect(() => {
    getAppointmentTable();
  }, []);

  function convertToDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  }

  const date = convertToDate("2024-05-15T15:22:06.354Z");
  console.log(date);
  return (
    <>
      <div className="flex gap-4 grid grid-cols-12 my-5 ">
        <div className="col-span-3  p-5 bg-[white] rounded-[1rem] shadow-lg">
          <FiUsers size={25} className="mb-4" />
          <p className="my-2">Total Appointments</p>
          <h2 className="font-[600] text-[23px] ">
            {getAppointmentTableData?.length}
          </h2>
        </div>
        <div className="col-span-3  p-5 bg-[white] rounded-[1rem] shadow-lg">
          <FiUsers size={25} className="mb-4" />
          <p className="my-2">Cancelled Appointments</p>
          <h2 className="font-[600] text-[23px] ">
            {
              getAppointmentTableData?.filter(
                (item) => item.status === "Cancelled"
              ).length
            }
          </h2>
        </div>
        <div className="col-span-3  p-5 bg-[white] rounded-[1rem] shadow-lg">
          <IoCalendarOutline size={25} className="mb-4" />
          <p className="my-2">Pending Appointments</p>
          <h2 className="font-[600] text-[23px] ">
            {
              getAppointmentTableData?.filter(
                (item) => item.status === "Pending"
              ).length
            }
          </h2>
        </div>
        <div className="col-span-3  p-5 bg-[white] rounded-[1rem] shadow-lg">
          <PiHandCoins size={25} className="mb-4" />
          <p className="my-2">Conducted Appointments</p>
          <h2 className="font-[600] text-[23px] ">
            {
              getAppointmentTableData?.filter(
                (item) => item.status === "Conducted"
              ).length
            }
          </h2>
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
        array={getAppointmentTableData}
        search={"customer"}
        keysToDisplay={["customer", "provider", "service", "date", "status"]}
        label={[
          "Customer Name",
          "Provider Name",
          "service",
          "date",
          "Status",
          "Actions",
        ]}
        customBlocks={[
          {
            index: 3,
            component: (date) => {
              return convertToDate(date);
            },
          },
        ]}
        filter={() => {
          return (
            <>
              <Select className="mx-3" onChange={(e) => {}}>
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Conducted">Conducted</option>
                <option value="Cancelled">Cancelled</option>
              </Select>
              <FilterButton />
            </>
          );
        }}
        extraColumns={[
          () => {
            return (
              <div className="flex gap-[1rem]">
                <MdOutlineCancel size={20} color="red" />
              </div>
            );
          },
        ]}
      />
    </>
  );
};

export default AppointmentsTable;
