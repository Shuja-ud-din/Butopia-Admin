import React from "react"
import { api } from "../api/api";
const useProvider = () => {
    const token = localStorage.getItem("token")
    const getProviderTable = async () => {
        try {
            const response = await api.get(`/api/provider`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(response);
        } catch (e) {
            console.error("Error message", e.message)
        }
    }
    return { getProviderTable }


}

export default useProvider