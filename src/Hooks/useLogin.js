import React, { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const { phoneNumber, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const showErrorNotification = (message) => {
    notification.error({
      message: "Error",
      description: message,
      placement: "topRight",
    });
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    navigate("/admin");
    // try {
    //   if (phoneNumber === "" || password === "") {
    //     throw new Error("Please fill in all the fields");
    //   }

    //   if (phoneNumber.length !== 12) {
    //     throw new Error("Phone number must be of 12 digits");
    //   }
    //   if (!phoneNumber.match(/^\d+$/)) {
    //     throw new Error("Phone Number must be in digits");
    //   }
    //   if (password.length < 8) {
    //     throw new Error("Password must be at least 8 characters long");
    //   }
    //   const response = await api.post("/api/auth/login", formData);

    //   if (response.data.success) {
    //     localStorage.setItem("token", response.data.token);
    //     setLoading(false);
    //     navigate("/admin");
    //   } else {
    //     showErrorNotification(response.data.error);
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   console.error(error.message);
    //   showErrorNotification(error.message);
    // }
  };

  return { login, handleChange, loading };
};

export default useLogin;
