import React, { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    // try {
    //   const response = await api.post("/api/auth/login", {
    //     ...formData,
    //   });

    //   console.log(response.data);
    // } catch (e) {
    //   console.error(e.message);
    // }
  };

  return { login, handleChange };
};

export default useLogin;
