
import React from 'react'
import { IoLocationOutline } from "react-icons/io5"
import { IoIosStar } from "react-icons/io";
const ReviewDetail = ({ profilePhoto, comment, name, profession, starRates = 2 }) => {
    const stars = [
        <IoIosStar className="text-[#FFD700]" />,
        <IoIosStar className="text-[#FFD700]" />,
        <IoIosStar className="text-[#FFD700]" />,
        <IoIosStar className="text-[#FFD700]" />,
        <IoIosStar className="text-[#FFD700]" />
    ]
    return (
        <>
            <div className='flex w-full flex-col  p-[1rem]    '>
                <div className='w-full flex gap-[0.7rem]'>
                    <div className='col-span-4 flex flex-col'>
                        <img className=' w-[3rem] h-[3rem] rounded-full object-cover border shadow-lg bg-cover ' src={profilePhoto} alt="" />

                    </div>
                    <div className='col-span-8 flex flex-col'>
                        <div className='w-full h-[30%] flex flex-col justify-between'>
                            <div className='font-[600] text-[0.9rem]'>{name}</div>
                            <div className='w-full flex text-[0.9rem]  items-center mt-[1rem] gap-[4px]'>
                                {`${starRates}${".0"}`} {stars.map((star, index) => {
                                    if (index < starRates) {
                                        return <div>{star}</div>
                                    }
                                })}
                            </div>
                        </div>
                        <div class="bg-[#cccc] h-px my-2"></div>

                    </div>
                </div>
                <div className='w-full m-0 text-[0.7rem] font-[400]'>{comment}</div>
            </div>
        </>
    )
}

export default ReviewDetail