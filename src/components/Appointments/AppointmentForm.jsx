import React from "react";
import CalendarComponent from "../Calendar/Calendar";
import TimePickerComponent from "../TimePickerComponent/TimePickerComponent";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
const AppointmentForm = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full ">
        <h3 className="text-[25px] font-[500] ">Add Appoinment</h3>
      </div>
      <div className="w-full flex mt-3 flex">
        <div className="w-30 bg-[white] rounded-md  flex flex-col p-3 h-80 mr-3  shadow-md">
          <CalendarComponent />
        </div>
        <div className="w-70 bg-[white] rounded-md  flex  flex-col p-4 ml-2  shadow-md">
          <h2 className="font-[600]">Morning</h2>
          <p className="color-[grey] mb-4 text-[12px] font-[500]">
            9:00 AM to 12:00 PM
          </p>
          <div className="w-full flex  flex-wrap min-w-[200px]">
            <TimePickerComponent time="9:10 AM" />
            <TimePickerComponent time="9:10 AM" />
            <TimePickerComponent time="9:20 AM" />
            <TimePickerComponent time="9:30 AM" />
            <TimePickerComponent time="9:40 AM" />
            <TimePickerComponent time="9:50 AM" />
            <TimePickerComponent time="10:00 AM" />
            <TimePickerComponent time="10:10 AM" />
            <TimePickerComponent time="10:20 AM" />
            <TimePickerComponent time="10:30 AM" />
          </div>
          <div className="mt-5 mb-4 w-full h-[0.5px] bg-[grey]"></div>
          <h2 className="font-[600]">Evening</h2>
          <p className="color-[grey] mb-4 text-[12px] font-[500]">
            5:00 PM to 9:00 PM
          </p>
          <div className="w-full mb-16 flex  flex-wrap min-w-[200px]">
            <TimePickerComponent time="5:00 AM" />
            <TimePickerComponent time="5:10 AM" />
            <TimePickerComponent time="5:20 AM" />
            <TimePickerComponent time="5:30 AM" />
            <TimePickerComponent time="5:40 AM" />
            <TimePickerComponent time="5:50 AM" />
            <TimePickerComponent time="6:00 AM" />
            <TimePickerComponent time="6:10 AM" />
            <TimePickerComponent time="6:20 AM" />
          </div>
        </div>
      </div>
      <div className="my-3 w-full flex items-center justify-end">
        <Button
          className="w-20 "
          type="primary"
          onClick={() => navigate("/admin/appointments")}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default AppointmentForm;
