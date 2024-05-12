import React, { useState } from "react";
import { api } from "../api/api";
import { notification } from "antd";
const useAdmin = () => {
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
  /////////////getAllAdmins////////////
  const [getAllAdminsTable, setGetAllAdminsTable] = useState();
  const getProviderTable = async () => {
    try {
      const response = await api.get("/api/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.data.success) {
        setGetAllAdminsTable(response.data.data);
      }
    } catch (e) {
      console.error("Error message", e.message);
    }
  };
  //////////////AddAdmin/////////////
  const [loading, setLoading] = useState(false);
  const [addAdminDetail, setAddAdminDetail] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setAddAdminDetail({
      ...addAdminDetail,
      [name]: value,
    });
  };
  const { name, email, phoneNumber, password } = addAdminDetail;
  const addAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        name === "" ||
        email === "" ||
        phoneNumber === "" ||
        password === ""
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
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error("Incorrect email format");
      }
      const response = await api.post("/api/admin", addAdminDetail, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setLoading(false);
        showSuccessNotification("Admin Created Successfully!");
      } else {
        showErrorNotification(response.data.error);
        setLoading(false);
      }

      console.log(response);
    } catch (error) {
      console.error("Error encountered", error);
      showErrorNotification(
        (error.response ? error.response.data.message : error.message) ||
        "Something went wrong!"
      );
      setLoading(false);
    }
  };
  ////////////////////////getAdmin////////////////////
  const [getAdminData, setGetAdminData] = useState([]);
  const getAdmin = async () => {
    try {
      const response = await api.get(`${"/api/admin/"}${token}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // if (response.data.success) {
      setGetAdminData(response);
      // }
      console.log(response);
    } catch (e) {
      console.error("Error encountered", e.message);
    }
  };
  ///////////////editAdmin/////////////
  const [btnLoading, setBtnLoading] = useState(false)
  const [statusValue, setStatusValue] = useState(true)
  const handleStatusButtonChange = (value) => {
    setStatusValue(value)
  };
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profilePicture: null,
    isValid: statusValue,
  })
  const handleEditDataChange = (e) => {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value
    })
  }


  const editAdmin = async (e, id) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      if (data.name === "" || data.email === "" || data.phoneNumber === 0) {
        throw new Error("Please fill in all the fields");
      }


      if (data.name < 3) {
        throw new Error("Name is too short");
      }
      if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error("This is too short to describe");
      }

      const response = await api.put(`${"/api/admin/"}${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.data.success) {
        console.log(response);
        showSuccessNotification("Admin Edited Successfully!");
        setBtnLoading(false);
      } else {
        showErrorNotification(e.message);
        setBtnLoading(false);
      }
    } catch (e) {
      console.error(e.message);
      showErrorNotification(
        (e.response ? e.response.data.message : e.message) ||
        "Something went wrong!"
      );
      setBtnLoading(false);
    }
  };
  return {
    getProviderTable,
    getAllAdminsTable,
    addAdminDetail,
    handleChange,
    addAdmin,
    loading,
    getAdminData,
    getAdmin,
    handleStatusButtonChange,
    statusValue,
    data,
    handleEditDataChange,
    editAdmin,
    btnLoading
  };
};

export default useAdmin;
