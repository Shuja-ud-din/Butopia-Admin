import React, { useState } from 'react'
import { api } from '../api/api'

const useCategories = () => {
    const token = localStorage.getItem("token")
    /////////////getAllCategories///////////
    const [getAllCategories, setGetAllCategories] = useState();

    const getCategoryTable = async () => {
        try {
            const response = await api.get("/api/category", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.success) {
                getAllCategories(response.data.data)
            }
        } catch (e) {
            console.error("error", e.message);
        }
    }

    return { getCategoryTable, getAllCategories }
}

export default useCategories