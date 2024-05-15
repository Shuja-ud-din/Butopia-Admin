import React, { useState } from 'react'
import { api } from "../api/api";
import { notification } from "antd";
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
    const [loading, setLoading] = useState(false)
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
                setGetAppointmentTableData(response.data.data);
            }
        } catch (e) {
            console.error("Error message", e.message);
        }
    };
    ////////////////addAppointment//////////////
    const [data, setData] = useState({
        title: "",
        description: "",
    });
    const handleChange = (e) => {
        const { value, name } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const payLoad = {
        customer: "6645203e496b629a92500736",
        provider: "6641192102f54fc4988c3f20",
        service: "664200303ceb90164ad188df",
        date: "2024-05-15T15:22:06.354Z",
        id: "664533edf8702b241dafd05",
        __v: 0,
    };


    const addAppointment = async (e) => {
        setLoading(true);
        try {
            const response = await api.post("/api/appointment", payLoad, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                console.log(response);
                showSuccessNotification("Category Added Successfully!");
                getCategoryTable();
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
    return {
        loading,
        getAppointmentTableData,
        getAppointmentTable,
        addAppointment
    }
}

export default useAppointment