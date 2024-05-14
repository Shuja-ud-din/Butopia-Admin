import { notification } from "antd";
import React, { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

const useCustomer = () => {
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate;

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
  /////////////getAllCustomers/////////////
  const [data, setData] = useState();
  const getCustomerTable = async () => {
    try {
      const response = await api.get(`/api/customer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
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
      console.error(e.message);
      showErrorNotification(
        (e.response ? e.response.data.message : e.message) ||
          "Something went wrong!"
      );
    }
  };
  ///////////////addCustomer/////////
  const [loading, setLoading] = useState(false);
  const [addCustomerData, setAddCustomerData] = useState({
    name: "",
    email: "",
    confirmPassword: "",
    password: "",
    phoneNumber: "",
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setAddCustomerData({
      ...addCustomerData,
      [name]: value,
    });
  };

  const { name, email, phoneNumber, password, confirmPassword } =
    addCustomerData;
  const addCustomer = async (e) => {
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

      const payLoad = {
        name,
        email,
        phoneNumber,
        password,
        profilePicture: imagePreview,
      };

      const response = await api.post("/api/customer", payLoad, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setLoading(false);
        showSuccessNotification("Customer Created Successfully!");
        setTimeout(() => {
          navigate("/admin/customers");
        }, 2000);
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

  const getCustomerById = async (id) => {
    try {
      const response = await api.get(`/api/customer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.data.success) {
        return response.data.data;
      }
    } catch (e) {
      console.error(e.message);
      showErrorNotification(
        (e.response ? e.response.data.message : e.message) ||
          "Something went wrong!"
      );
    }
  };

  return {
    data,
    getCustomerTable,
    addCustomerData,
    handleChange,
    addCustomer,
    loading,
    setImagePreview,
    getCustomerById,
  };
};

export default useCustomer;
