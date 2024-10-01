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
import Table from "../Table/Table";
import usePayment from "../../Hooks/usePayment";

const CustomerDetails = () => {
  const [clientInfo, setClientData] = useState();
  const [activeInx, setActiveIndx] = useState(0);
  const navigate = useNavigate();

  const { id } = useParams();

  const { getCustomerById, handleChangeStatus } = useCustomer();
  const{getPaymentsByCustomer,customerPayments} = usePayment()

  const buttonsTxt = ["Appointment", "Payment Details"];
  const showContent = (index) => {
    setActiveIndx(index);
  };

  const getCustomerData = async () => {
    const response = await getCustomerById(id);
    setClientData(response);
  };

  function convertToDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US");
  }

  useEffect(() => {
    getCustomerData();
    getPaymentsByCustomer(id)
  }, []);

  console.log(customerPayments);

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
              <Select value={clientInfo?.isValid ? true : false} onChange={(e) => handleChangeStatus(e.target.value, id)}>
                <option value={true}>Active</option>
                <option value={false}>Deactive</option>
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
                  className={`px-4 w-40 py-2  rounded-md text-white ${activeInx === index ? "text-[white] bg-primary" : "bg-white"
                    } border border-gray-300`}
                  onClick={() => showContent(index)}
                >
                  {text}
                </button>
              ))}
            </div>

            <div className="w-full px-9 py-2">
              {activeInx === 0 ? (
                <>
                  <h3 className="mb-3 font-[600] text-[22px] ">Appointments</h3>
                  <Table
                    array={clientInfo.appointments}
                    keysToDisplay={[
                      "index",
                      "provider",
                      "service",
                      "date",
                      "status",
                    ]}
                    customBlocks={[
                      {
                        index: 3,
                        component: (date) => {
                          return convertToDate(date);
                        },
                      },
                    ]}
                    label={["#", "Provider", "Service", "Date", "Status"]}
                  />
                </>
              ) : (
                
                <>
                <h3 className="mb-3 font-[600] text-[22px] ">Payment Table</h3>
                <Table
                  array={customerPayments}
                  keysToDisplay={[
                    "index",
                    "amount",
                    "createdAt",
                    "updatedAt",
                    "status",
                  ]}
                  customBlocks={[
                    {
                      index: 2,
                      component: (createdAt) => {
                        return convertToDate(createdAt);
                      },
                    },
                    {
                      index: 3,
                      component: (updatedAt) => {
                        return convertToDate(updatedAt);
                      },
                    },
                  ]}
                  label={[ "#","Amount", "Created at","Updated at", "Status"]}
                />
              </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CustomerDetails;
