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
    })
    // const payLoad = {
    //     name: addProvider.name,
    //     email: addProvider.email,
    //     phoneNumber: addProvider.phoneNumber,
    //     password: addProvider.password,
    //     address: addProvider.address,
    //     speciality: addProvider.speciality,
    //     about: addProvider.about,
    //     experience: parseInt(addProvider.experience),
    //     workingDays: selectedDay,
    //     workingTimes: {
    //     }
    // }
    const handleChange = (e) => {
        const { value, name } = e.target;
        setAddProviderData({
            ...addProviderData,
            [name]: value
        })
    }
    const addProvider = async () => {
        try {
            const response = api.post("/api/provider", {
                // ...payLoad,
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