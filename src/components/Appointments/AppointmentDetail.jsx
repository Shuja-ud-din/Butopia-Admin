import React, { useEffect } from "react";
import doctorProfile from "../../assets/avatar.jpg";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import avatar from '../../assets/images/clientAvatar.png';
import useAppointment from "../../Hooks/useAppointment";
import AppointmentDetailCard from "../AppointmentDetailCard/AppointmentDetailCard";
import Button from "../Button/Button";

const AppointmentDetail = () => {
    const { id } = useParams();
    const { getAppointment, getAppointmentDetail, loading } = useAppointment();

    useEffect(() => {
        getAppointment(id);
    }, [id, getAppointment]);

    function formatTime(dateString) {
        const date = new Date(dateString);

        let hours = date.getUTCHours();
        let minutes = date.getUTCMinutes();
        let seconds = date.getUTCSeconds();

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return `${hours}:${minutes}:${seconds}`;
    }

    function formatDate(dateString) {
        const date = new Date(dateString);

        const year = date.getUTCFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = date.getUTCDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const appointmentDetail = getAppointmentDetail || {};
    const service = appointmentDetail.service || {};
    const provider = appointmentDetail.provider || {};
    const customer = appointmentDetail.customer || {};

    return (
        <>
            <div className="w-full flex justify-between mb-5">
                <h3 className="text-[25px] font-[500] "> Appointment Details </h3>
            </div>
            {loading && !appointmentDetail ? (
                <div className="min-h-[78vh] w-full bg-[white] p-[1rem]  flex gap-[1rem] justify-center items-center  mt-4   border border-[#c4c4c4]  rounded-[9px]  shadow-lg">
                    <Loader />
                </div>
            ) : (
                <>
                    <div className="min-h-[78vh] w-full bg-[white] p-[2rem]  flex gap-[1rem] flex-col  mt-4   border border-[#c4c4c4]  rounded-[9px]  shadow-lg">
                        <div className="w-[100%] h-full flex justify-around mt-[2rem] flex ">
                            <div className="w-[30%] flex flex-col ">
                                <div className="text-[1.2rem] font-primary font-[600] mb-[0.5rem]">
                                    Time:
                                </div>
                                <div>
                                    {appointmentDetail.date ? formatTime(appointmentDetail.date) : "Loading.."}
                                </div>
                                <div className="text-[1.2rem] font-primary font-[600] mb-[0.5rem]">
                                    Date:
                                </div>
                                <div>
                                    {appointmentDetail.date ? formatDate(appointmentDetail.date) : "Loading.."}
                                </div>
                            </div>
                            <div className="w-[60%]  flex justify-center items-center">
                                <div className="h-full w-[70%] flex gap-[2rem]">
                                    <div>
                                        {service.profilePicture !== null ? (
                                            <img src={doctorProfile} alt="Profile" className="rounded-[50%] shadow-lg" />
                                        ) : (
                                            <img src={avatar} alt="Profile" className="rounded-[50%] shadow-lg" />
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-[1rem]">
                                        <div><b>Name:</b> {service.name || "Loading.."}</div>
                                        <div><b>Description:</b> {service.description || "Loading.."}</div>
                                        <div><b>Price:</b> {service.price || "Loading.."}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[10%]">
                                {appointmentDetail.status === "Scheduled" ? (
                                    <Button type="danger" outlined>Cancel</Button>
                                ) : ""}
                            </div>
                        </div>
                        <div className="w-full flex flex-col">
                            <div className="w--[30%]  mt-[2rem] justify-between flex items-center ">
                                <div className="w-[40%]">
                                    <AppointmentDetailCard
                                        profilePhoto={provider.profilePicture !== null ? doctorProfile : avatar}
                                        name={provider.name || "Loading..."}
                                        email={provider.email || "Loading..."}
                                        phoneNumber={provider.phoneNumber || "Loading..."}
                                        detailType={"Provider Detail"}
                                    />
                                </div>
                                <div className="w-[70%] text-[0.9rem] p-[2rem] font-[400]">
                                    {customer.profilePicture !== null ? (
                                        <img src={doctorProfile} alt="Profile" className="mb-[1.5rem] h-[4rem] rounded-[50%] shadow-lg" />
                                    ) : (
                                        <img src={avatar} alt="Profile" className="h-[4rem] mb-[1.5rem] rounded-[50%] shadow-lg" />
                                    )}The name of the Customer is <b>{customer.name || "Loading..."}</b> has an appointment scheduled for <b>{appointmentDetail.date ? formatTime(appointmentDetail.date) : "Loading..."}</b>, which can
                                    be caught up through <b>{customer.email || "Loading..."}</b> and
                                    having <b>{customer.phoneNumber || "Loading..."}</b> phone number.
                                    Having the best priority in the sense of customer would be preferable to us. This is the best part after making collaboration
                                    with us, stay safe, stay healthy.
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default AppointmentDetail;
