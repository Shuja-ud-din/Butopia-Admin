import React from 'react'
import { api } from '../api/api'

const useCategories = () => {
    const token = localStorage.getItem("token")
    const getCategoryTable = async () => {
        try {
            const response = await api.get("/api/category", {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
            console.log(response);
        } catch (e) {
            console.error("error", e.message);
        }
    }

    return { getCategoryTable }
}

export default useCategories