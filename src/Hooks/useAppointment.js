import React, { useEffect, useState } from 'react'
import { api } from "../api/api";
import { notification } from "antd";
import useCustomer from './useCustomer';
import useServices from '../Hooks/useServices'
import useProvider from './useProvider';
import dayjs from 'dayjs';
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
    const { getCustomerTable, customerId } = useCustomer()
    const { getProviderTable, providerId } = useProvider()
    const { getServicesTable, serviceId } = useServices()

    const [selectedDate, setSelectedDate] = useState(dayjs("2022-04-17"))
    const handleDateChange = (date) => {
        setSelectedDate(date ? date.toISOString() : 'Invalid Date')
    }
    const payLoad = {
        customer: customerId,
        provider: providerId,
        service: serviceId,
        date: selectedDate,
    };


    const addAppointment = async (e) => {
        useEffect(() => {
            getCustomerTable(),
                getProviderTable(),
                getServicesTable()
        }, [])
        console.log(customerId);

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
        addAppointment,
        handleDateChange,
        selectedDate,
    }
}

export default useAppointment