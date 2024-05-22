import React from 'react'

const AppointmentDetailCard = ({ profilePhoto, name, description, price, email, detailType, phoneNumber }) => {

    return (
        <>
            <div className='flex w-full items-center justify-center gap-[0.5rem] max-w-[18rem] flex-col min-h-[12rem] min-w-[9rem]  p-[1rem] gap-[1rem]  border border-[#c4c4c4]  rounded-[9px]  shadow-lg'>
                <div className=' w-[100%] h-[30%] flex items-center justify-center'>
                    <img className=' object-cover h-[100%] w-[50%]  border shadow-lg bg-cover rounded-[50%]' src={profilePhoto} alt="" />
                </div>
                <div className=' flex flex-col items-center justify-center gap-[0.5rem]'>
                    <div className='font-[500] text-[1.1rem]'>{name}</div>
                    <div className='font-[400] text-[0.8rem]'>{email ? email : description}</div>
                    <div className='font-[400] text-[0.9rem]'>{phoneNumber ? phoneNumber : price}</div>
                </div>
                <div className='m-0'>..............................................</div>
                <div className='w-full text-[1.2rem] flex font-[400] flex-col text-[0.9rem] items-center justify-center'><div className='font-[500] text-[0.9rem]'>Detail Type:</div>{detailType}</div>
            </div>
        </>
    )
}

export default AppointmentDetailCard