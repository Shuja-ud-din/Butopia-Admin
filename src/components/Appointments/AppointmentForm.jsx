import React, { useEffect, useState } from "react";
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
import useProvider, {
  useGetProviderAvailabilty,
} from "../../Hooks/useProvider";
import useCustomer from "../../Hooks/useCustomer";
import getAppointmentTime from "../../utils/getAppointmentTime";
import moment from "moment";
import useServices from "../../Hooks/useServices";
import { getAvailabiltySlots } from "../../services/provider";

const AppointmentForm = () => {
  const navigate = useNavigate();
  const { addAppointment, handleDateChange, selectedDate } = useAppointment();

  const { data, getProviderTable } = useProvider();
  const service = useServices();
  const customer = useCustomer();
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectableDays, setSelectAbleDays] = useState([]);
  const [muiDate, setMUIDate] = useState(null);
  const [slots, setSlots] = useState({
    morning: [],
    evening: [],
  });

  const { availability, isLoading } = useGetProviderAvailabilty(
    selectedProvider?.id
  );

  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleSelectedTime = (time) => {
    setSelectedTime(time);
  };

  const shouldDisableDate = (date) => {
    // Get the day name of the given date
    const dayName = date.format("dddd");
    // Check if the day name is in the selectableDays array
    return !selectableDays.includes(dayName);
  };

  useEffect(() => {
    getProviderTable();
    customer.getCustomerTable();
  }, []);

  useEffect(() => {
    if (selectedProvider) {
      service.getServicesTable(selectedProvider.id);
    }
  }, [selectedProvider]);

  useEffect(() => {
    if (availability?.workingTimes) {
      setSelectAbleDays(availability?.workingDays);
      setSlots(
        getAvailabiltySlots(
          availability?.workingTimes,
          availability?.appointments
        )
      );
    }
  }, [availability]);

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
            onChange={(e, newValue) => setSelectedProvider(newValue)}
            options={
              data?.filter((doctor) => doctor.isValid) || [
                { name: "Loading..." },
              ]
            }
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Doctor" />}
          />
        </div>
        <div className="mr-5">
          <Autocomplete
            disablePortal
            className="p-0 bg-[white]"
            size="small"
            id="combo-box-demo"
            onChange={(e, newValue) => setSelectedClient(newValue)}
            options={
              customer.data?.filter((customer) => customer.isValid) || [
                { name: "Loading..." },
              ]
            }
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Client" />}
          />
        </div>
        <Autocomplete
          disablePortal
          className="p-0 bg-[white]"
          size="small"
          id="combo-box-demo"
          onChange={(e, newValue) => setSelectedService(newValue)}
          options={
            !selectedProvider
              ? [{ name: "Select Doctor First" }]
              : service?.data?.filter((service) => service.isValid) || [
                  { name: "Loading..." },
                ]
          }
          sx={{ width: 300 }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Service" />}
        />
      </div>
      <div className="w-full flex mt-3">
        <div className="w-30   flex flex-col p-3 h-80 mr-3 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              name="date"
              defaultValue={dayjs(new Date())}
              onChange={(date) => {
                handleDateChange(date);
                setMUIDate(date);
              }}
              disableHighlightToday={true}
              disablePast
              value={muiDate}
              maxDate={dayjs().add(1, "month")}
              shouldDisableDate={shouldDisableDate}
            />
          </LocalizationProvider>
        </div>
        <div className="w-full flex  flex-col p-4 ml-2 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg">
          {!selectedProvider ? (
            <>
              <div className="flex items-center h-full justify-center">
                <h2 className="font-[600]">Select a Doctor first!</h2>
              </div>
            </>
          ) : isLoading ? (
            <>
              <div className="flex items-center h-full justify-center">
                <h2 className="font-[600]">Checking AVailibility</h2>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-[600]">Morning</h2>

              <div className="w-full flex  flex-wrap min-w-[200px]">
                {slots.morning.map((item, index) => {
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

              <div className="w-full mb-16 flex  flex-wrap min-w-[200px]">
                {slots.evening.map((item, index) => {
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
                  type="primary"
                  onClick={() => {
                    addAppointment(
                      selectedClient.id,
                      selectedService.id,
                      moment(
                        getAppointmentTime(selectedDate, selectedTime)
                      ).format()
                    );
                  }}
                >
                  Submit
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;
