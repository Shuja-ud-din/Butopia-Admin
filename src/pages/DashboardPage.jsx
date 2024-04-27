import React from "react";
import { TbCoins } from "react-icons/tb";
import graph from "../assets/graph.jpg";
import DashRange from "../components/DashRange/DashRange";
import { Avatar } from "@mui/material";
import avatar from "../assets/avatar.jpg";
import { IoCalendarOutline } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { PiHandCoins } from "react-icons/pi";
import Table from "../components/Table/Table";
import Button from "../components/Button/Button";

const DashboardPage = () => {
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

  return (
    <>
      <div>
        <h2 className="font-[600] text-[22px] ">Hi Admin!</h2>
        <p className="text-[#98989a] text-[14px] ">Here's what happenning!</p>
      </div>
      <div className="flex gap-4 grid grid-cols-12 my-5 ">
        <div className="col-span-3  p-5 bg-primary text-[white] rounded-[1rem] shadow-lg">
          <TbCoins size={25} className="mb-4" />
          <p className="my-2">Total Revenue </p>
          <h2 className="font-[600] text-[23px] ">$12,469</h2>
        </div>
        <div className="col-span-3  p-5 bg-[white] rounded-[1rem] shadow-lg">
          <FiUsers size={25} className="mb-4" />
          <p className="my-2">Total Clients </p>
          <h2 className="font-[600] text-[23px] ">1,469</h2>
        </div>
        <div className="col-span-3  p-5 bg-[white] rounded-[1rem] shadow-lg">
          <IoCalendarOutline size={25} className="mb-4" />
          <p className="my-2">Total Appointments</p>
          <h2 className="font-[600] text-[23px] ">362</h2>
        </div>
        <div className="col-span-3  p-5 bg-[white] rounded-[1rem] shadow-lg">
          <PiHandCoins size={25} className="mb-4" />
          <p className="my-2">Total Tax</p>
          <h2 className="font-[600] text-[23px] ">$2,469</h2>
        </div>
      </div>
      <div className="flex flex-col gap-4 grid grid-cols-12">
        <div className="col-span-9 flex gap-4 flex-col">
          <div className=" p-5 bg-[white]  rounded-[1rem] shadow-lg">
            <img src={graph} className="w-full" alt="" />
          </div>

          <div className=" p-5 bg-[white] rounded-[1rem] shadow-lg">
            <h2 className="font-[600] text-[20px] mb-3 ">
              Recent Appointments
            </h2>
            <Table
              array={data}
              keysToDisplay={[
                "id",
                "customerName",
                "phone",
                "provider",
                "date",
              ]}
              label={[
                "#",
                "customer Name",
                "phone",
                "provider",
                "date",
                "Actions",
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
          </div>
        </div>
        <div className="col-span-3 flex gap-4 flex-col">
          <div className=" p-5 bg-[white] rounded-[1rem] shadow-lg">
            <h2 className="font-[600] text-[20px] mb-3 ">
              Most Selling Services
            </h2>
            <DashRange service="Hair" count={105} percent={70} />
            <DashRange service="Skin" count={1355} percent={30} />
            <DashRange service="Teeth" count={269} percent={55} />
          </div>
          <div className=" p-5 bg-[white] rounded-[1rem] shadow-lg">
            <h2 className="font-[600] text-[20px] mb-3 ">Recent Customers</h2>

            <div className="flex my-4">
              <Avatar src={avatar} />
              <div className="ml-3">
                <h3 className="font-[700] text-[14px]  ">John Doe</h3>
                <p className="text-[13px] text-[#a5a8b0] ">example@email.com</p>
              </div>
            </div>
            <div className="flex my-4">
              <Avatar src={avatar} />
              <div className="ml-3">
                <h3 className="font-[700] text-[14px]  ">John Doe</h3>
                <p className="text-[13px] text-[#a5a8b0] ">example@email.com</p>
              </div>
            </div>
            <div className="flex my-4">
              <Avatar src={avatar} />
              <div className="ml-3">
                <h3 className="font-[700] text-[14px]  ">John Doe</h3>
                <p className="text-[13px] text-[#a5a8b0] ">example@email.com</p>
              </div>
            </div>
            <div className="flex my-4">
              <Avatar src={avatar} />
              <div className="ml-3">
                <h3 className="font-[700] text-[14px]  ">John Doe</h3>
                <p className="text-[13px] text-[#a5a8b0] ">example@email.com</p>
              </div>
            </div>

            <div className=" text-primary cursor-pointer">
              <div className="flex items-center">
                <p className="pr-3  font-[700] text-[14px] ">See more</p>
                <IoChevronForward />
              </div>
            </div>
          </div>

          <div className=" p-5 bg-[white] rounded-[1rem] shadow-lg text-center">
            <div className="px-4 py-3">
              <h2 className="font-[600] text-[22px] mb-3 ">
                The Unique Power of One
              </h2>
              <p className="text-[13px] text-[#a5a8b0] mb-5">
                With just one contact systeminvoice, we aim to help simplify
                your work
              </p>
            </div>
            <Button type="primary" outlined>
              Create Invoice
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
