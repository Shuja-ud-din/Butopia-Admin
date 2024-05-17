import React, { useEffect, useState } from "react";
import clientAvatar from "../../assets/images/clientAvatar.png";
import SelectTabComponent from "../SelectTabComponent/SelectTabComponent";
import { Avatar } from "@mui/material";
import Select from "../Dropdown/Select";
import useCustomer from "../../Hooks/useCustomer";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import Loader2 from "../Loader/Loader2";
import Button from "../Button/Button";

const CustomerDetails = () => {
  const [clientInfo, setClientData] = useState();
  const [activeInx, setActiveIndx] = useState(0);
  const navigate = useNavigate();

  const { id } = useParams();

  const { getCustomerById } = useCustomer();

  const buttonsTxt = ["Appointment", "Payment Details"];
  const showContent = (index) => {
    setActiveIndx(index);
  };

  const getCustomerData = async () => {
    const response = await getCustomerById(id);
    setClientData(response);
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  console.log(clientInfo);

  return (
    <>
      <div className="w-full">
        <h3 className="text-[25px] font-[500] ">Customer Details</h3>
      </div>
      {!clientInfo ? (
        <>
          <div className="w-full flex items-center justify-center mt-9">
            <Loader2 />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-end">
            <Button
              onClick={() => navigate("/admin/appointments/addappointment")}
            >
              Book Appointment
            </Button>
          </div>
          <div className="mt-4 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg p-8">
            {/* <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[25px] font-[500] ">Customer Details</h3>
          </div>
          <div>
            <SelectTabComponent />
          </div>
        </div> */}
            <div className="flex items-center justify-end">
              <Select value={clientInfo?.isValid ? "1" : "0"}>
                <option value="1">Active</option>
                <option value="0">Deactive</option>
              </Select>
            </div>
            <div className="flex items-center grid grid-cols-12">
              <div className="col-span-3">
                <Avatar
                  src={clientInfo?.profilePicture}
                  sx={{ width: 160, height: 160 }}
                  alt="Client Avatar"
                />
              </div>
              <div className="col-span-9 py-3">
                <div className="grid grid-cols-12">
                  <div className="col-span-6 ">
                    <h5 className="blurTxt font-bold text-[20px]">Name</h5>
                  </div>
                  <div className="col-span-6">
                    <p className="mt-2 blurTxt">{clientInfo?.name}</p>
                  </div>
                </div>
                <div className="grid grid-cols-12 my-3">
                  <div className="col-span-6">
                    <h5 className="blurTxt font-bold text-[20px]">
                      Phone Number
                    </h5>
                  </div>
                  <div className="col-span-6">
                    <p className="mt-2 blurTxt">{clientInfo?.phoneNumber}</p>
                  </div>
                </div>
                <div className="grid grid-cols-12">
                  <div className="col-span-6">
                    <h5 className="blurTxt font-bold text-[20px]">Email</h5>
                  </div>
                  <div className="col-span-6">
                    <p className="mt-2 blurTxt">{clientInfo?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex  mt-20 mb-10">
            <div className="flex flex-col gap-2 md:flex-row mt-3">
              {buttonsTxt.map((text, index) => (
                <button
                  key={index}
                  className={`px-4 w-40 py-2  rounded-md text-white ${
                    activeInx === index ? "text-[white] bg-primary" : "bg-white"
                  } border border-gray-300`}
                  onClick={() => showContent(index)}
                >
                  {text}
                </button>
              ))}
            </div>
            <div className="mt-4 w-full min-h-[25rem] flex items-center justify-center ml-5 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg p-8">
              {activeInx === 0 ? "Appointment Table" : "Payment Table"}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CustomerDetails;
