import React, { useState } from "react";
import CalendarComponent from "../Calendar/Calendar";
import TimePickerComponent from "../TimePickerComponent/TimePickerComponent";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import UserDropdown from "../SelectDropdown/UserDropDownSelect";
import { Autocomplete, Box, TextField } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import useAppointment from "../../Hooks/useAppointment";
import useProvider from "../../Hooks/useProvider";

const AppointmentForm = () => {
  const navigate = useNavigate();
  const {
    addAppointment,
    handleDateChange,
    selectedDate
  } = useAppointment();


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
  const dummyDoctors = [
    "doctor",
    "doctor",
    "doctor",
    "doctor",
    "doctor",
  ]
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
  console.log(selectedDate);

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
        <div className="w-30   flex flex-col p-3 h-80 mr-3 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              name="date"
              defaultValue={dayjs("2022-04-17")}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
        </div>
        <div className="w-70 flex  flex-col p-4 ml-2 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg">
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
            <Button type="primary" onClick={addAppointment}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;
