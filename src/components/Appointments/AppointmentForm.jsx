import React, { useState } from "react";
import CalendarComponent from "../Calendar/Calendar";
import TimePickerComponent from "../TimePickerComponent/TimePickerComponent";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import UserDropdown from "../SelectDropdown/UserDropDownSelect";
import { Autocomplete, Box, TextField } from "@mui/material";

const dummyDoctors = [
  { name: "Dr. John Doe", id: 1 },
  { name: "Dr. Jane Doe", id: 2 },
  { name: "Dr. John Doe", id: 3 },
  { name: "Dr. Jane Doe", id: 4 },
  { name: "Dr. John Doe", id: 5 },
  { name: "Dr. Jane Doe", id: 6 },
  { name: "Dr. John Doe", id: 7 },
  { name: "Dr. Jane Doe", id: 8 },
  { name: "Dr. John Doe", id: 9 },
  { name: "Dr. Jane Doe", id: 10 },
];

const AppointmentForm = () => {
  const navigate = useNavigate();

  const [selectedTime, setSelectedTime] = useState(null);
  const times = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
  ];
  const eveningSlot = [
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
  ];

  const handleSelectedTime = (time) => {
    setSelectedTime(time);
  };
  return (
    <>
      <div className="w-full ">
        <h3 className="text-[25px] font-[500] ">Add Appoinment</h3>
      </div>
      <div className="mt-8 mb-3 w-full flex  ">
        <div className="mr-5">
          <Autocomplete
            disablePortal
            className="p-0 bg-[white]"
            size="small"
            id="combo-box-demo"
            // onChange={(e, newValue) => setSelectedClient(newValue)}
            options={dummyDoctors}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Doctor" />}
          />
        </div>
        <Autocomplete
          disablePortal
          className="p-0 bg-[white]"
          size="small"
          id="combo-box-demo"
          // onChange={(e, newValue) => setSelectedClient(newValue)}
          options={dummyDoctors}
          sx={{ width: 300 }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Client" />}
        />
      </div>
      <div className="w-full flex mt-3 flex">
        <div className="w-30   flex flex-col p-3 h-80 mr-3 bg-[white] rounded-md  shadow-md">
          <CalendarComponent />
        </div>
        <div className="w-70 bg-[white] rounded-md  flex  flex-col p-4 ml-2  shadow-md">
          <h2 className="font-[600]">Morning</h2>
          <p className="color-[grey] mb-4 text-[12px] font-[500]">
            9:00 AM to 12:00 PM
          </p>
          <div className="w-full flex  flex-wrap min-w-[200px]">
            {times.map((item, index) => {
              return (
                <TimePickerComponent
                  time={item}
                  isSelected={selectedTime === item}
                  key={index}
                  onClick={() => handleSelectedTime(item)}
                />
              );
            })}
          </div>
          <div className="mt-5 mb-4 w-full h-[0.5px] bg-[grey]"></div>
          <h2 className="font-[600]">Evening</h2>
          <p className="color-[grey] mb-4 text-[12px] font-[500]">
            5:00 PM to 8:00 PM
          </p>
          <div className="w-full mb-16 flex  flex-wrap min-w-[200px]">
            {eveningSlot.map((item, index) => {
              return (
                <TimePickerComponent
                  time={item}
                  isSelected={selectedTime === item}
                  key={index}
                  onClick={() => handleSelectedTime(item)}
                />
              );
            })}
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
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;
