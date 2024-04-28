import React, { useState } from 'react'
import clientAvatar from "../../assets/images/clientAvatar.png";
import SelectTabComponent from '../SelectTabComponent/SelectTabComponent'
const CustomerDetails = () => {
    const [clientInfo, setClientData] = useState();
    const [activeInx, setActiveIndx] = useState(0);

    const buttonsTxt = [
        "Appointment",
        "Payment Details",

    ]
    const showContent = (index) => {
        setActiveIndx(index);
    }
    return (
        <>
            <div className="w-full">
                <h3 className="text-[25px] font-[500] ">Customer Details</h3>
            </div>
            <div className="mt-4 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg p-8">
                <div className="flex items-center">
                    <div className="w-2/12">
                        <img className="h-30 w-full" src={clientAvatar} alt="" />
                    </div>
                    <div className="w-11/12">
                        <div className="flex justify-between px-3">
                            <div>
                                {/* <h5>{clientInfo ? clientInfo.ClientName : "Name"}</h5> */}
                                <h5 className='blurTxt font-bold text-[20px]'>Shuja</h5>
                                <p className="mt-2 blurTxt">Phone Number</p>
                                {/* <p className="blurTxt font-bold">{clientInfo ? clientInfo.Type : "Type"}</p> */}
                            </div>
                            {/* <select name="" value={clientInfo && clientInfo.Valid} id="" onChange={updateClientStatus} className="ml-auto"> */}
                            <select className='border border-gray-400 rounded-md h-10 w-24'>
                                <option value="1">Active</option>
                                <option value="0">Deactive</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="w-full flex  mt-20 mb-10">
                    <div className="flex flex-col gap-2 md:flex-row mt-3">
                        {buttonsTxt.map((text, index) => (
                            <button
                                key={index}
                                className={`px-4 w-40 py-2  rounded-md text-white ${(activeInx === index) ? "text-[white] bg-primary" : "bg-white"} border border-gray-300`}
                                onClick={() => showContent(index)}
                            >
                                {text}
                            </button>
                        ))}
                    </div>
                    <div className="mt-4 w-full min-h-[25rem] flex items-center justify-center ml-5 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg p-8">
                        {
                            activeInx === 0 ? "Appointment Table"
                                : "Payment Table"
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default CustomerDetails