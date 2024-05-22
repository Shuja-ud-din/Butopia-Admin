import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { notification } from "antd";
import useCustomer from "./useCustomer";
import useServices from "../Hooks/useServices";
import useProvider from "./useProvider";
import dayjs from "dayjs";
const useAppointment = () => {
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
  const [loading, setLoading] = useState(false);
  ///////////////////getAllAppointments//////////////
  const [getAppointmentTableData, setGetAppointmentTableData] = useState();
  const getAppointmentTable = async () => {
    try {
      const response = await api.get("/api/appointment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.data.success) {
        setGetAppointmentTableData(
          response.data.data.map((item, index) => {
            return {
              ...item,
              index: index + 1,
            };
          })
        );
      }
    } catch (e) {
      console.error("Error message", e.message);
    }
  };
  ////////////////addAppointment//////////////

  const [selectedDate, setSelectedDate] = useState();
  const handleDateChange = (date) => {
    setSelectedDate(date ? date.toISOString() : "Invalid Date");
  };

  const addAppointment = async (customerId, providerId, serviceId, date) => {
    const payLoad = {
      customer: customerId,
      provider: providerId,
      service: serviceId,
      date,
    };
    setLoading(true);
    try {
      const response = await api.post("/api/appointment", payLoad, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      if (response.data.success) {
        showSuccessNotification("Appointment Added Successfully!");
        setLoading(false);
      } else {
        showErrorNotification(
          response.data.message || "Error in adding Appointment!"
        );
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

  const cancelAppointment = async (appointmentId, reason) => {
    setLoading(true);
    try {
      const response = await api.put(
        `/api/appointment/cancel/${appointmentId}`,
        {
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      if (response.data.success) {
        showSuccessNotification("Appointment Cancelled Successfully!");
        setLoading(false);
        getAppointmentTable();
      } else {
        showErrorNotification(
          response.data.message || "Error in Cancelling Appointment!"
        );
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

  return {
    loading,
    getAppointmentTableData,
    getAppointmentTable,
    addAppointment,
    handleDateChange,
    setGetAppointmentTableData,
    cancelAppointment,
    selectedDate,
    getAppointment,
    getAppointmentDetail,
    loading
  };
};

export default useAppointment;
