import React, { useEffect, useState } from "react";
import { TbCoins } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";
import { PiHandCoins } from "react-icons/pi";
import graph from "../assets/graph.jpg";
import DashRange from "../components/DashRange/DashRange";
import { Avatar } from "@mui/material";
import avatar from "../assets/avatar.jpg";
import { IoChevronForward } from "react-icons/io5";
import Table from "../components/Table/Table";
// import Button from "../components/Button/Button";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { Skeleton } from 'antd';
import ProfileBar from '../components/ProfileBar/ProfileBar'
import moment from "moment";
const DashboardPage = () => {
  const { handleGetAdminDashboard, adminDashboardData } = useAdmin();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetAdminDashboard()
      .finally(() => setLoading(false));
  }, []);

  console.log(adminDashboardData);

  function convertToDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  }

  return (
    <>
      <div>
        <h2 className="font-[600] text-[22px] ">Hi Admin!</h2>
        <p className="text-[#98989a] text-[14px] ">Here's what happenning!</p>
      </div>

      <div className="flex gap-4 grid grid-cols-12 my-5">
        {loading ? (
          <>
            <Skeleton active className="col-span-3 p-5 rounded-[1rem] shadow-lg" />
            <Skeleton active className="col-span-3 p-5 rounded-[1rem] shadow-lg" />
            <Skeleton active className="col-span-3 p-5 rounded-[1rem] shadow-lg" />
            <Skeleton active className="col-span-3 p-5 rounded-[1rem] shadow-lg" />
          </>
        ) : (
          <>
            <div className="col-span-3 p-5 bg-primary text-[white] rounded-[1rem] shadow-lg">
              <TbCoins size={25} className="mb-4" />
              <p className="my-2">Total Revenue</p>
              <h2 className="font-[600] text-[23px]">
                {adminDashboardData.revenue}
              </h2>
            </div>
            <div className="col-span-3 p-5 bg-[white] rounded-[1rem] shadow-lg">
              <FiUsers size={25} className="mb-4" />
              <p className="my-2">Total Clients</p>
              <h2 className="font-[600] text-[23px]">
                {adminDashboardData.noOfCustomers}
              </h2>
            </div>
            <div className="col-span-3 p-5 bg-[white] rounded-[1rem] shadow-lg">
              <IoCalendarOutline size={25} className="mb-4" />
              <p className="my-2">Total Appointments</p>
              <h2 className="font-[600] text-[23px]">
                {adminDashboardData.noOfAppointments}
              </h2>
            </div>
            <div className="col-span-3 p-5 bg-[white] rounded-[1rem] shadow-lg">
              <PiHandCoins size={25} className="mb-4" />
              <p className="my-2">Total Services</p>
              <h2 className="font-[600] text-[23px]">
                {adminDashboardData.noOfServices}
              </h2>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-4 grid grid-cols-12">
        <div className="col-span-9 flex gap-4 flex-col">
          <div className="p-5 bg-[white] rounded-[1rem] shadow-lg">

            {loading ? <Skeleton paragraph={{ rows: 8 }} className="w-full" /> :
              (
                <img src={graph} className="w-full" alt="Graph" />
              )}
          </div>

          <div className="p-5 bg-[white] rounded-[1rem] shadow-lg">
            <h2 className="font-[600] text-[20px] mb-3">
              Recent Appointments
            </h2>
            {loading ? (
              <Skeleton active />
            ) : (
              <Table
                array={adminDashboardData.recentAppointments}
                keysToDisplay={["id", "customer", "provider", "service", "date"]}
                label={["#", "Customer Name", "Provider Name", "Service Name", "Time"]}
                customBlocks={[
                  {
                    index: 4,
                    component: (date) => {
                      return moment(date).format("LT");
                    },
                  },
                ]}
              />
            )}
          </div>
        </div>

        <div className="col-span-3 flex gap-4 flex-col">
          <div className="p-5 bg-[white] rounded-[1rem] shadow-lg">
            <h2 className="font-[600] text-[20px] mb-3">
              Most Selling Services
            </h2>
            {loading ? (
              <Skeleton active paragraph={{ rows: 3 }} />
            ) : (
              <>
                <DashRange service="Hair" count={105} percent={70} />
                <DashRange service="Skin" count={1355} percent={30} />
                <DashRange service="Teeth" count={269} percent={55} />
              </>
            )}
          </div>

          <div className="p-5 bg-[white] rounded-[1rem] shadow-lg">
            <h2 className="font-[600] text-[20px] mb-3">
              Recent Customers
            </h2>
            {loading ? (
              <Skeleton active paragraph={{ rows: 3 }} />
            ) : (
              (adminDashboardData?.recentCustomers || []).map((item) => (
                <ProfileBar key={item.id} name={item.name} description={item.email} profilePic={item.profilePicture} />
              ))
            )}
            <div className="text-primary cursor-pointer">
              <div className="flex items-center">
                <p
                  className="pr-3 font-[700] text-[14px]"
                  onClick={() => navigate("/admin/customers")}
                >
                  See more
                </p>
                <IoChevronForward />
              </div>
            </div>
          </div>

          <div className="p-5 bg-[white] rounded-[1rem] shadow-lg">
            <h2 className="font-[600] text-[20px] mb-3">Top Doctors</h2>
            {loading ? (
              <Skeleton active paragraph={{ rows: 3 }} />
            ) : (
              (adminDashboardData?.topProviders || []).map((item) => (
                <ProfileBar key={item.id} name={item.name} description={item.email} profilePic={item.profilePicture} />
              ))
            )}
            <div className="text-primary cursor-pointer">
              <div className="flex items-center">
                <p
                  className="pr-3 font-[700] text-[14px]"
                  onClick={() => navigate("/admin/providers")}
                >
                  See more
                </p>
                <IoChevronForward />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;


{/* <div className="flex my-4">
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
</div> */}