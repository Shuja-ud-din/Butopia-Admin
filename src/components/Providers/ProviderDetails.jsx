import React, { useEffect } from "react";
import Button from "../Button/Button";
import { FaPlus } from "react-icons/fa";
import DetailCard from "../DetailCard/DetailCard";
import doctorProfile from "../../assets/avatar.jpg";
import Profile from "../../assets/user_profile.png";
import ExperiencePanel from "../../assets/ExperiencePanel/ExperiencePanel";
import heart from "../../assets/heart.png";
import { FaHeart } from "react-icons/fa";
import ReviewDetail from "../ReviewDetail/ReviewDetail";
import ServiceCard from "../ServiceCard/ServiceCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useProvider from "../../Hooks/useProvider";
import Loader from "../Loader/Loader";
import Select from "../Dropdown/Select";
import { Avatar } from "@mui/material";
import moment from "moment";
import { FiPhone } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { GrUserExpert } from "react-icons/gr";
import { CiMedicalCase } from "react-icons/ci";
import { TbFileDescription } from "react-icons/tb";
import { Rate } from "antd";
import useAdmin from "../../Hooks/useAdmin";
import useAppointment from "../../Hooks/useAppointment";
import Table from "../Table/Table";

const ProviderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const url = useLocation();
  const {
    getAppointmentTableData,
    getAppointmentTable,
    cancelAppointment,
    loading,
  } = useAppointment();
  const { getProvider, getProviderData, providerDetailLoading, handleChangeStatus } = useProvider();
  
  function convertToDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  }

  useEffect(() => {
    getProvider(id);
    getAppointmentTable(id);
  }, []);
  return (
    <>
      <div className="w-full flex justify-between mb-5">
        <h3 className="text-[25px] font-[500] ">Provider Details</h3>
      </div>
      {providerDetailLoading ? (
        <div className="min-h-[78vh] w-full bg-[white] p-[1rem]  flex gap-[1rem] justify-center items-center  mt-4   border border-[#c4c4c4]  rounded-[9px]  shadow-lg">
          <Loader />
        </div>
      ) : (
        <>
          <div className="mt-4 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg p-8">
            {/* <div className="flex items-center justify-between">
              <div></div>
            </div> */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[20px] font-[500] ">
                {getProviderData?.name}
              </h3>
              <p className="h-8 w-16 border rounded-[0.2rem] bg-[#ecebeb] flex items-center justify-center">
                {getProviderData?.isValid ? "Valid" : "Invalid"}
            </p>
              {/* <Select value={getProviderData?.isValid} onChange={(e) => handleChangeStatus(e.target.value, id)}>
                <option value={true}>Active</option>
                <option value={false}>Deactive</option>
              </Select> */}
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-3">
                <Avatar
                  src={getProviderData?.profilePicture}
                  sx={{ width: 160, height: 160 }}
                  alt="Client Avatar"
                />
              </div>
              <div className="col-span-9 py-3">
                <div className="grid grid-cols-12">
                  <div className="col-span-6">
                    <div className="flex items-center">
                      <FiPhone size={18} />
                      <p className="font-[500] ml-3 text-[#758296]">
                        {getProviderData?.phoneNumber}
                      </p>
                    </div>
                    <div className="flex items-center mt-2 ">
                      <IoMailOutline size={18} />
                      <p className="font-[500]  ml-3 text-[#758296]">
                        {getProviderData?.email}
                      </p>
                    </div>
                    <div className="flex items-center  mt-2 ">
                      <IoLocationOutline size={18} />
                      <p className="font-[500]  ml-3 text-[#758296]">
                        {getProviderData?.address}
                      </p>
                    </div>
                    <div className="flex items-center  mt-2 ">
                      <GrUserExpert size={18} />
                      <p className="font-[500]  ml-3 text-[#758296]">
                        {getProviderData?.experience} years
                      </p>
                    </div>

                    <div className="flex items-center  mt-2 ">
                      <CiMedicalCase size={20} />
                      <p className="font-[500]  ml-3 text-[#758296]">
                        {getProviderData?.speciality}
                      </p>
                    </div>
                    <div className="flex   mt-2 ">
                      <div className="w-[22px]">
                        <TbFileDescription size={20} fontWeight={200} />
                      </div>
                      <p className="font-[500]  mx-3 text-[#758296]">
                        {getProviderData?.about}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="text-[1.2rem] font-primary font-[600] mb-[0.5rem]">
                      Rating
                    </div>
                    <div className="text-[0.93rem] font-[400] flex justify-between mb-3">
                      <Rate disabled value={getProviderData.rating} />
                      <p className="font-[500] text-[#909aaa]">
                        {getProviderData.rating || "Loading..."}
                      </p>
                    </div>
                    <div className="text-[1.2rem] font-primary font-[600] mb-[0.5rem]">
                      SWARM Link
                    </div>
                    <div className="text-[0.93rem] font-[400] flex justify-between mb-3">
                      <p className="font-[500] text-[#909aaa]">
                        {getProviderData.swarmLink && (
                          <a
                            target="_blank"
                            className="cursor-pointer hover:text-[blue]"
                            href={getProviderData.swarmLink}
                          >
                            {getProviderData.swarmLink}
                          </a>
                        )}
                      </p>
                    </div>
                    <div className="text-[1.2rem] font-primary font-[600] mb-[0.5rem]">
                      Working Time
                    </div>
                    <div className="text-[0.93rem] font-[400] flex justify-between ">
                      <p>Starting Time:</p>
                      <p className="font-[500] text-[#909aaa]">
                        {getProviderData.workingTimes?.start || "Loading..."}
                      </p>
                    </div>
                    <div className="text-[0.93rem] font-[400] flex justify-between ">
                      <p> Ending Time:</p>
                      <p className="font-[500] text-[#909aaa]">
                        {getProviderData.workingTimes?.end || "Loading..."}
                      </p>
                    </div>
                    <div className="text-[1.2rem] font-primary font-[600] my-[0.5rem]">
                      Working Days
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {getProviderData.workingDays?.map((day) => (
                        <div className="text-[0.88rem] shadow-lg cursor-pointer font-[400] flex justify-between border border-[#909aaa] rounded-full py-1 px-3">
                          <p>{day}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <p className="text-[1.2rem] font-primary font-[600] my-[1rem]">
              Services
            </p>
            <div className="flex flex-wrap gap-5">
              {getProviderData?.services?.length > 0
                ? getProviderData?.services?.map((service) => {
                  return (
                    <div
                      className="w-[30%]"
                      onClick={() => navigate(`/admin/services`)}
                    >
                      <ServiceCard
                        name={service.name}
                        img={service.image}
                        description={service.description}
                        price={service.price}
                      />
                    </div>
                  );
                })
                : "No services available yet."}
            </div>
          </div>

          <div className="w-[90%] mb-[4rem] mt-[2rem]">
            <div className=" w-full flex  mt-[2rem]">
              <div className="w-[50%] ">
                <div className="text-[1.2rem] font-primary font-[600] mb-[0.5rem]">
                  Reviews
                </div>
                {getProviderData === true ? (
                  getProviderData.reviews.length < 1 ? (
                    "No reviews yet"
                  ) : (
                    <ReviewDetail />
                  )
                ) : (
                  <div className="font-[500] text-[#808080]">
                    No reviews yet
                  </div>
                )}
              </div>
            </div>
          </div>
    

      <Table
        array={getAppointmentTableData}
        search={"customer"}
        keysToDisplay={[
          "index",
          "customer",
          "provider",
          "service",
          "date",
          "date",
          "status",
        ]}
        label={[
          "#",
          "Customer Name",
          "Provider Name",
          "service",
          "date",
          "time",
          "Status",
        ]}
        customBlocks={[
          {
            index: 4,
            component: (date) => {
              return convertToDate(date);
              // Today at 11:10 AM(date);
            },
          },
          {
            index: 5,
            component: (date) => {
              return moment(date).format("LT");
              // Today at 11:10 AM(date);
            },
          },
        ]}
       
       
      />

        </>
      )}
    </>
  );
};

export default ProviderDetails;
