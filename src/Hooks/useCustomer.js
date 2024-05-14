import { notification } from 'antd';
import React, { useState } from 'react'
import { api } from '../api/api';

const useCustomer = () => {
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
    const [loading, setLoading] = useState(false)
    const [addCustomerData, setAddCustomerData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
    });
    const handleChange = (e) => {
        const { value, name } = e.target;
        setAddCustomerData({
            ...addCustomerData,
            [name]: value,
        });
    };
    const payLoad = {
        name: addCustomerData.name,
        email: addCustomerData.email,
        phoneNumber: addCustomerData.phoneNumber,
        password: addCustomerData.password,
    };
    const { name, email, phoneNumber, password } = payLoad
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
            const response = await api.post("/api/customer", payLoad, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                setLoading(false);
                showSuccessNotification("Customer Created Successfully!");
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
    return {
        data,
        getCustomerTable,
        addCustomerData,
        handleChange,
        addCustomer,
        loading,
    }
}

export default useCustomer