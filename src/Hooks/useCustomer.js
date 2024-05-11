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
    /////////////getAllProviders/////////////
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
    return {
        data, getCustomerTable
    }
}

export default useCustomer