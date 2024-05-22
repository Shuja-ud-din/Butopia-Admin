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
  const [providerId, setProviderId] = useState();
  const getProviderTable = async () => {
    try {
      const response = await api.get(`/api/provider`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setProviderId(response.data.data[0].id);
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
  ///////////////////////editProvider/////////////////

  const [editSelectDay, setEditSelectedDay] = useState([]);
  const handleEditSelectedDay = (e, day) => {
    e.preventDefault();
    if (!editSelectDay.includes(day)) {
      setEditSelectedDay([...editSelectDay, day]);
    } else {
      setEditSelectedDay(editSelectDay.filter((item) => item !== day));
    }
  };
  const [editData, setEditData] = useState({
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
  const editPayload = {
    name: editData.name,
    email: editData.email,
    phoneNumber: editData.phoneNumber,
    address: editData.address,
    speciality: editData.speciality,
    experience: parseInt(editData.experience, 10),
    about: editData.about,
    workingDays: editSelectDay,
    workingTimes: {
      start: `${editData.startTime}${" PM"}`,
      end: `${editData.endTime}${" AM"}`,
    },
  };

  const editChange = (e) => {
    const { value, name } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };
  const editProvider = async (e, id) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        editPayload.name === "" ||
        editPayload.email === "" ||
        editPayload.phoneNumber === "" ||
        editPayload.address === "" ||
        editPayload.speciality === "" ||
        editPayload.about === "" ||
        editPayload.experience.length === 0 ||
        editPayload.workingDays.length === 0 ||
        editPayload.workingTimes.start === "" ||
        editPayload.workingTimes.end === ""
      ) {
        throw new Error("Please fill in all the fields");
      }

      if (editPayload.phoneNumber.length !== 12) {
        throw new Error("Phone number must be of 12 digits");
      }
      if (!editPayload.phoneNumber.match(/^\d+$/)) {
        throw new Error("Phone Number must be in digits");
      }
      if (editPayload.about.length < 10) {
        throw new Error("Make sure description is actual!");
      }
      if (!editPayload.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error("Incorrect email format");
      }
      const response = await api.put(`${"/api/provider/"}${id}`, editPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        console.log(response);
        showSuccessNotification("Provider Edited Successfully!");
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
  const [providerDetailLoading, setProviderDetailLoading] = useState(false);
  const getProvider = async (id) => {
    setProviderDetailLoading(true);
    console.log(id);
    try {
      const response = await api.get(`/api/provider/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      const data = response.data.data;
      setGetProviderData({
        ...data,
      });
      if (response) {
        setProviderDetailLoading(false);
      }
    } catch (e) {
      console.error(e.message);
      setProviderDetailLoading(false);
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
    providerDetailLoading,
    ///edit
    handleEditSelectedDay,
    editSelectDay,
    editChange,
    editProvider,
    editData,
    editPayload,
    providerId,
  };
};

export default useProvider;
