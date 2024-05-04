import React from 'react'
import { IoLocationOutline } from "react-icons/io5"
import { IoIosStar } from "react-icons/io";
const DetailCard = ({ profilePhoto, name, profession, location, icon, starRates = 2 }) => {
    const stars = [
        <IoIosStar />,
        <IoIosStar />,
        <IoIosStar />,
        <IoIosStar />,
        <IoIosStar />
    ]
    return (
        <>
            <div className='flex w-full  p-[1rem] gap-[1rem] grid grid-cols-12 border border-[#c4c4c4]  rounded-[9px]  shadow-lg'>
                <div className='col-span-4 flex flex-col'>
                    <img className='  w-full h-full object-cover border shadow-lg bg-cover rounded-[9px]' src={profilePhoto} alt="" />
                    <div className='w-full flex mt-[1rem] gap-[4px]'>
                        {stars.map((star, index) => {
                            if (index < starRates) {
                                return <div>{star}</div>
                            }
                        })}
                    </div>
                </div>
                <div className='col-span-8 flex flex-col'>
                    <div className='w-full h-[30%] flex justify-between'>
                        <div className='font-[600]'>{name}</div> <img src={icon} className='h-[1rem] mt-[0.2rem] w-[1rem]' alt="" />
                    </div>
                    <div class="bg-[#cccc] h-px my-2"></div>
                    <div className='flex flex-col'>
                        <div className='text-[0.9rem] font-[600]'>{profession}</div>
                        <div className='text-[0.9rem] flex items-center gap-[0.5rem]'>
                            {location}<div><IoLocationOutline /></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailCard