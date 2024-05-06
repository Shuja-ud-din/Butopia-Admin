import React from 'react'
import { api } from '../api/api';

const useAdmin = () => {
    const token = localStorage.getItem("token");
    const getProviderTable = async () => {
        try {
            const response = api.get("/api/admin", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response);
        } catch (e) {
            console.error("Error message", e.message);
        }
    }
    return { getProviderTable }
}

export default useAdmin