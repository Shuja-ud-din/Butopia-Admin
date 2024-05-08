import React, { useState } from "react";
import { api } from "../api/api";
import { notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const useProvider = () => {
  const navigate = useNavigate("");
  const token = localStorage.getItem("token");
  const showErrorNotification = (message) => {
    notification.error({
      message: "Error",
      description: message,
      placement: "topRight",
    });
  };
  const showSuccessNotification = (message) => {
    notification.success({
      message: "Success",
      description: message,
      placement: "topRight",
    });
  };
  /////////////providersTable/////////////
  const [data, setData] = useState();
  const getProviderTable = async () => {
    try {
      const response = await api.get(`/api/provider`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setData(
          response.data.data.map((item, index) => {
            return {
              index: index + 1,
              ...item,
            };
          })
        );
      }
    } catch (e) {
      console.error("Error message", e.message);
    }
  };
  //////////addProvider/////////
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDays] = useState([]);
  const handleSelectedDay = (e, day) => {
    e.preventDefault();
    if (!selectedDay.includes(day)) {
      setSelectedDays([...selectedDay, day]);
    } else {
      setSelectedDays(selectedDay.filter((item) => item !== day));
    }
  };
  const [addProviderData, setAddProviderData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    address: "",
    speciality: "",
    about: "",
    experience: "",
    startTime: "",
    endTime: "",
  });
  const payLoad = {
    name: addProviderData.name,
    email: addProviderData.email,
    phoneNumber: addProviderData.phoneNumber,
    password: addProviderData.password,
    address: addProviderData.address,
    speciality: addProviderData.speciality,
    about: addProviderData.about,
    experience: parseInt(addProviderData.experience, 10),
    workingDays: selectedDay,
    workingTimes: {
      start: `${addProviderData.startTime}${" PM"}`,
      end: `${addProviderData.endTime}${" AM"}`,
    },
  };
  const {
    name,
    email,
    phoneNumber,
    password,
    address,
    speciality,
    about,
    experience,
    workingDays,
    workingTimes,
  } = payLoad;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setAddProviderData({
      ...addProviderData,
      [name]: value,
    });
  };
  const addProvider = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        name === "" ||
        email === "" ||
        phoneNumber === "" ||
        password === "" ||
        address === "" ||
        speciality === "" ||
        about === "" ||
        experience.length === 0 ||
        workingDays.length === 0 ||
        workingTimes.start === "" ||
        workingTimes.end === ""
      ) {
        throw new Error("Please fill in all the fields");
      }

      if (phoneNumber.length !== 12) {
        throw new Error("Phone number must be of 12 digits");
      }
      if (!phoneNumber.match(/^\d+$/)) {
        throw new Error("Phone Number must be in digits");
      }
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      if (about.length < 10) {
        throw new Error("Make sure description is actual!");
      }
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error("Incorrect email format");
      }
      const response = await api.post("/api/provider", payLoad, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        console.log(response);
        showSuccessNotification("Provider Added Successfully!");
        setLoading(false);
      } else {
        showErrorNotification(e.message);
        setLoading(false);
      }
    } catch (e) {
      console.error(e.message);
      showErrorNotification(
        (e.response ? e.response.data.message : e.message) ||
          "Something went wrong!"
      );
      setLoading(false);
    }
  };
  ///////////////////getProvider/////////////
  const [getProviderData, setGetProviderData] = useState([]);
  const getProvider = async () => {
    console.log(id);
    try {
      const response = await api.get(`${"/api/provider/"}${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      const data = response.data.data;
      setGetProviderData({
        id: data.id,
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        speciality: data.speciality,
        experience: data.experience,
        about: data.about,
        workingDays: data.workingDays,
        workingTimes: data.workingTimes,
        profilePicture: data.profilePicture,
        reviews: data.reviews,
      });
    } catch (e) {
      console.error(e.message);
    }
  };
  return {
    getProviderTable,
    data,
    addProviderData,
    loading,
    handleChange,
    addProvider,
    handleSelectedDay,
    selectedDay,
    payLoad,
    getProvider,
    getProviderData,
  };
};

export default useProvider;
