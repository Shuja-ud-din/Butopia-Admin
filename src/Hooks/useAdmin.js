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
  return {
    getProviderTable,
    getAllAdminsTable,
    addAdminDetail,
    handleChange,
    addAdmin,
    loading,
    getAdminData,
    getAdmin,
  };
};

export default useAdmin;
