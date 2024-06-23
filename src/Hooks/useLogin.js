import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { axiosInstance } from "../api/api";

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
    try {
      if (phoneNumber === "" || password === "") {
        throw new Error("Please fill in all the fields");
      }

      if (phoneNumber.length < 10) {
        throw new Error("Phone number must be greater than 12 digits");
      }
      if (!phoneNumber.match(/^\d+$/)) {
        throw new Error("Phone Number must be in digits");
      }
      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      const response = await axiosInstance.post("/api/auth/login", formData);
      if (
        !(
          response.data.user.role === "Admin" ||
          response.data.user.role === "Super Admin"
        )
      ) {
        throw new Error("Only Admins can login!");
      }
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setLoading(false);
        navigate("/admin");
      } else {
        showErrorNotification(response.data.error);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error Encounrtered", error.message);
      showErrorNotification(
        (error.response ? error.response.data.message : error.message) ||
          "Something went wrong!"
      );
    }
  };

  return { login, handleChange, loading };
};

export default useLogin;
