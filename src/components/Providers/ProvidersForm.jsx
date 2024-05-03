import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ServiceDropDown from "../SelectDropdown/ServiceDropDownSelect";
import profile_img from "../../assets/user_profile.png";
import DaySelector from "../DaySelector/DaySelector";
import TimeField from "../../components/TimeField/TimeField";

const ProvidersForm = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [selectedDay, setSelectedDays] = useState(null)
  const [time, setTime] = useState({
    startTime: "",
    endTime: "",
  });
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  const handleSelectedDay = (e, day) => {
    e.preventDefault();
    setSelectedDays(day)
  }
  console.log(selectedDay);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTime({
      ...time,
      [name]: value
    });
  };
  console.log(time);
  return (
    <>
      <div className="w-full">
        <h3 className="text-[25px] font-[500] ">Add Providers</h3>
      </div>
      <div className="mt-4 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg">
        <form className="p-7 px-[4rem]">
          <div className="flex justify-between">
            <p className="font-semibold">Provider Details</p>
          </div>

          <div className=" mt-10 w-full grid grid-cols-12 ">
            <div className="w-full h-full flex  flex-col col-span-4 ">
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="w-full flex justify-start items-center rounded-[12px] overflow-hidden ">
                  <img
                    src={imagePreview || profile_img}
                    alt="Plant"
                    className="w-[250px] h-full"
                  />
                </div>
                <input
                  id="image-upload"
                  name="image"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
            <div className=" col-span-8">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Provider Name
                </label>
                <Input type="text" />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input type="text" />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Speciality
                </label>
                <Input type="text" />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <Input type="text" />
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
            name="description"
            id="description"
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
              return <DaySelector
                day={item}
                isSelected={selectedDay === item}
                onClick={(e) => handleSelectedDay(e, item)}
              />
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
              <TimeField
                TimeZone="am"
                placeholder="start time"
                name="startTime"
                value={time}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="mb-2 mt-[2rem] block text-sm font-medium text-gray-700"
              >
                End Time
              </label>
              <TimeField
                placeholder="end time"
                TimeZone="pm"
                value={time}
                name="endTime"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="w-full mb-8 mt-[1.5rem] flex justify-start">
            <Button className="w-40" type="primary">
              {" "}
              Save Provider
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProvidersForm;
