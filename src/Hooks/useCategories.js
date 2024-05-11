import React, { useState } from "react";
import { api } from "../api/api";
import { notification } from "antd";

const useCategories = () => {
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
  /////////////getAllCategories///////////
  const [getAllCategories, setGetAllCategories] = useState();

  const getCategoryTable = async () => {
    try {
      const response = await api.get("/api/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setGetAllCategories(
          response.data.data.map((item, index) => {
            return {
              index: index + 1,
              ...item,
            };
          })
        );
      }
    } catch (e) {
      console.error("error", e.message);
    }
  };
  ////////////////////addCategory/////////////
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    title: "",
    description: ""
  })
  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value
    })
  }
  const [buttonStatus, setButtonStatus] = useState(true)
  const handleButtonStatus = () => {
    setButtonStatus(!buttonStatus)
  }
  const payLoad = {
    title: data.title,
    description: data.description,
    isActive: buttonStatus,
  };
  const {
    title,
    description
  } = payLoad;


  const addCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        title === "" ||
        description === ""
      ) {
        throw new Error("Please fill in all the fields");
      }

      if (title.length < 3) {
        throw new Error("Title is too short");
      }
      if (description.length < 8) {
        throw new Error("This is too short to describe");
      }

      const response = await api.post("/api/category", payLoad, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        console.log(response);
        showSuccessNotification("Category Added Successfully!");
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
  ////////////////deleteCategory//////////////
  const deleteCategory = async (e) => {
    e.preventDefault()
    try {
      await api.delete(`${"/api/category/"}${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showErrorNotification("Vehicle Deleted Successfully");
    } catch (e) {
      showErrorNotification(
        "Error in Deleting Vehicle"
      );
      console.error(e.message);
    }
  }


  return {
    getCategoryTable, getAllCategories,
    data, handleChange, buttonStatus, handleButtonStatus, addCategory, loading,
    deleteCategory
  };
};

export default useCategories;
