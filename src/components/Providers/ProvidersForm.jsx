import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ServiceDropDown from "../SelectDropdown/ServiceDropDownSelect";
import profile_img from "../../assets/user_profile.png";
import DaySelector from "../DaySelector/DaySelector";
import TimeField from "../../components/TimeField/TimeField";
import ReactDOM from "react-dom";
import { TimePicker } from "antd";
import useProvider from "../../Hooks/useProvider";
import Loader from "../Loader/Loader";
import ImageUploader from "../ImageUploader/ImageUploader";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
const ProvidersForm = () => {
  const {
    loading,
    addProviderData,
    handleChange,
    handleSelectedDay,
    selectedDay,
    addProvider,
    payLoad,
  } = useProvider();
  const [imagePreview, setImagePreview] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Function to handle time selection

  console.log(addProviderData);
  console.log(payLoad);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  console.log(selectedDay);

  return (
    <>
      <div className="w-full">
        <h3 className="text-[25px] font-[500] ">Add Providers</h3>
      </div>
      <div className="mt-4 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg">
        <form onSubmit={addProvider} className="p-7 px-[4rem]">
          <div className="flex justify-between">
            <p className="font-semibold">Provider Details</p>
          </div>

          <div className=" mt-10 w-full grid grid-cols-12 ">
            <div className="h-[15rem] h-[15rem] flex  flex-col col-span-4 pr-[5rem] ">
              <ImageUploader profile />
            </div>
            <div className=" col-span-8">
              <div>
                <Input
                  placeholder={"Name"}
                  name="name"
                  label={"Provider Name"}
                  // value={addProviderData}
                  onChange={handleChange}
                  type="text"
                />
              </div>
              <div>
                <Input
                  label={"Email"}
                  placeholder={"Email"}
                  name="email"
                  // value={addProviderData}
                  onChange={handleChange}
                  type="text"
                />
              </div>
              <div>
                <Input
                  name="phoneNumber"
                  label={"Phone Number"}
                  placeholder={"Phone Number"}
                  onChange={handleChange}
                  type="text"
                />
              </div>
              <div>
                <Input
                  label={"Password"}
                  placeholder={"Password"}
                  name="password"
                  onChange={handleChange}
                  type="password"
                />
              </div>
              <div>
                <Input
                  label={"Address"}
                  name="address"
                  placeholder={"Address"}
                  onChange={handleChange}
                  value={addProviderData.address}
                  type="text"
                />
              </div>
              <div>
                <Input
                  label={"Speciality"}
                  placeholder={"Speciality"}
                  name="speciality"
                  onChange={handleChange}
                  type="text"
                />
              </div>
              <div>
                <Input
                  placeholder={"Experience"}
                  label={"Experience"}
                  name="experience"
                  onChange={handleChange}
                  type="number"
                />
              </div>
            </div>
          </div>
          <label
            htmlFor="description"
            className=" block text-sm font-medium text-gray-700 min-w-[22rem]"
          >
            Description
          </label>
          <textarea
            placeholder="About Provider"
            value={addProviderData.about}
            onChange={handleChange}
            name="about"
            type="text"
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border border-primary rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <label
            htmlFor="name"
            className="mb-2 mt-[2rem] block text-sm font-medium text-gray-700"
          >
            Availability
          </label>
          <div className="w-full  flex flex-wrap gap-[0.4rem]">
            {days.map((item) => {
              return (
                <DaySelector
                  value={addProviderData.workingDays}
                  onChange={handleChange}
                  name="days"
                  day={item}
                  isSelected={selectedDay.includes(item)}
                  onClick={(e) => handleSelectedDay(e, item)}
                />
              );
            })}
          </div>

          <div className="flex gap-[1rem]">
            <div>
              <label
                htmlFor="name"
                className="mb-2 mt-[2rem] block text-sm font-medium text-gray-700"
              >
                Start Time
              </label>

              <div>
                <input
                  name="startTime"
                  type="time"
                  className="border  rounded-[5px]"
                  value={addProviderData.startTime}
                  placeholder={addProviderData.startTime}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="mb-2 mt-[2rem] block text-sm font-medium text-gray-700"
              >
                End Time
              </label>
              <div>
                <input
                  name="endTime"
                  className="border  rounded-[5px]"
                  type="time"
                  placeholder={addProviderData.endTime}
                  value={addProviderData.endTime}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full mb-5 mt-[1.5rem] flex justify-end">
            <Button onClick={addProvider} className="w-40" type="primary">
              {" "}
              {loading ? <ButtonLoader /> : "Add Provider"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProvidersForm;
