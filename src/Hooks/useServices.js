import { notification } from 'antd';
import React, { useState } from 'react'
import { api } from '../api/api';

const useServices = () => {
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

    /////////////servicesTable/////////////
    const [data, setData] = useState();
    const getServicesTable = async () => {
        try {
            const response = await api.get(`/api/service`, {
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
            console.error("Error message", e.message);
        }
    };
    ////////////////////addService/////////////
    const [loading, setLoading] = useState(false)
    const [addServiceData, setAddServiceData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
    });
    const handleChange = (e) => {
        const { value, name } = e.target;
        setAddServiceData({
            ...data,
            [name]: value,
        });
    };
    const payLoad = {
        title: addServiceData.title,
        description: addServiceData.description,
        price: addServiceData.price,
        category: parseInt(addServiceData.category),
    };
    const { title, description, price, category } = payLoad;

    const addService = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (title === "" || description === "" || price.length === 0) {
                throw new Error("Please fill in all the fields");
            }

            if (category === "") {
                throw new Error("Upload the image");
            }
            if (title.length < 3) {
                throw new Error("Title is too short");
            }
            if (description.length < 8) {
                throw new Error("This is too short to describe");
            }

            const response = await api.post("/api/service", payLoad, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                console.log(response);
                showSuccessNotification("Service Added Successfully!");
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
        data, getServicesTable,
        addService, handleChange, addServiceData, loading,
    }


}

export default useServices