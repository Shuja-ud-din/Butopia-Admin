import React, { useState } from "react"
import { api } from "../api/api";
const useProvider = () => {
    /////////////providersTable/////////////
    const [data, setData] = useState([])
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
            if (response.data.success) {
                setData(response.data.data)
            }
        } catch (e) {
            console.error("Error message", e.message)
        }
    }
    //////////addProvider/////////
    const [selectedDay, setSelectedDays] = useState([])
    const handleSelectedDay = (e, day) => {
        e.preventDefault();
        setSelectedDays([
            ...selectedDay,
            day
        ])
    }
    const [addProviderData, setAddProviderData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        address: "",
        speciality: "",
        about: "",
        experience: "",
        startTime: "",
        endTime: "",
    })
    const payLoad = {
        name: addProviderData.name,
        email: addProviderData.email,
        phoneNumber: addProviderData.phoneNumber,
        password: addProviderData.password,
        address: addProviderData.address,
        speciality: addProviderData.speciality,
        about: addProviderData.about,
        experience: parseInt(addProviderData.experience),
        workingDays: selectedDay,
        workingTimes: {
            start: addProviderData.startTime,
            end: addProviderData.endTime,
        }
    }
    const handleChange = (e) => {
        const { value, name } = e.target;
        setAddProviderData({
            ...addProviderData,
            [name]: value
        })
    }
    const addProvider = async (e) => {
        e.preventDefault()
        try {
            const response = api.post("/api/provider", {
                ...payLoad,
            })
            console.log(response);
        } catch (e) {
            console.error(e.message);
        }
    }
    ///////////////////getProvider/////////////
    const [getProviderData, setGetProviderData] = useState([])
    const getProvider = async () => {
        try {
            const response = api.get(`${"/api/provider/"}${token}`)
            setGetProviderData(response);
            console.log(getProviderData);
        } catch (e) {
            console.error(e.message);
        }
    }
    return {
        getProviderTable,
        data,
        addProviderData,
        handleChange,
        addProvider,
        handleSelectedDay,
        selectedDay,
        getProviderData,
        getProvider
    }

}

export default useProvider