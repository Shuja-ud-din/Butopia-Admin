import React, { useState } from "react";
import { api } from "../api/api";
import { notification } from "antd";
const useAdmin = () => {
  const token = localStorage.getItem("token");
  const [profilePicture, setProfilePicture] = useState(null);
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

      if (response.data.success) {
        setGetAllAdminsTable(
          response.data.data.reverse().map((item, index) => {
            return { ...item, index: index + 1 };
          })
        );
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
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setAddAdminDetail({
      ...addAdminDetail,
      [name]: value,
    });
  };
  const { name, email, phoneNumber, password, confirmPassword } =
    addAdminDetail;
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
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const payload = {
        name,
        email,
        phoneNumber,
        password,
      };

      const response = await api.post("/api/admin", payload, {
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
    } catch (e) {
      console.error("Error encountered", e.message);
    }
  };
  ///////////////editAdmin/////////////

  const [statusValue, setStatusValue] = useState(true);
  const handleStatusButtonChange = (value) => {
    setStatusValue(value);
  };
  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profilePicture: null,
    isValid: statusValue,
  });
  const handleEditDataChange = (e) => {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const editAdmin = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (data.name === "" || data.email === "" || data.phoneNumber === 0) {
        throw new Error("Please fill in all the fields");
      }

      if (data.name < 3) {
        throw new Error("Name is too short");
      }
      if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        throw new Error("Invalid Email format");
      }

      const payLoad = {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        profilePicture: profilePicture,
        isValid: data.isValid,
      };

      const response = await api.put(`${"/api/admin/"}${id}`, payLoad, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        getProviderTable();

        showSuccessNotification("Admin Edited Successfully!");
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
  /////////////handleStatusChange///////////
  let selectedOption;
  const handleChangeStatus = async (event, id) => {
    selectedOption = event.target.value;
    const isValid = selectedOption === "Valid";
    const payLoad = {
      isValid: isValid,
    };
    if (!window.confirm("Do you really want to change the status?")) {
      return;
    }

    console.log(selectedOption);
    try {
      const response = await api.patch(`${"/api/admin/"}${id}`, payLoad, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        getProviderTable();
        showSuccessNotification("Status Changed Successfully!");
      } else {
        showErrorNotification(response.data.error);
      }
    } catch (e) {
      console.error(e);
      showErrorNotification(e.response.data.error);
    }
  };

  //////////////////handleAdminDashboard////////////////
  const [adminDashboardData, setAdminDashboardData] = useState([]);
  // const [recentAppointment, setRecentAppointments] = useState([])
  const handleGetAdminDashboard = async () => {
    try {
      const response = await api.get("/api/admin/dashboard/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdminDashboardData(response.data.data);
      // setRecentAppointments(response.data.data.recentAppointment.map((item, index) => {
      //   return { ...item, index: index + 1 }
      // }))
    } catch (e) {
      console.error(e.response.data.message);
    }
  };
  return {
    adminDashboardData,
    handleGetAdminDashboard,
    getProviderTable,
    getAllAdminsTable,
    addAdminDetail,
    handleChange,
    addAdmin,
    loading,
    getAdminData,
    // recentAppointment,
    getAdmin,
    handleStatusButtonChange,
    statusValue,
    data,
    setData,
    handleEditDataChange,
    editAdmin,
    handleChangeStatus,
    setProfilePicture,
    selectedOption,
  };
};

export default useAdmin;
