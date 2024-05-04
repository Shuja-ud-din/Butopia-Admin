import React from 'react'

const ServiceCard = ({ img, name, description }) => {
    return (
        <>
            <div className='flex flex-col   border border-[#c4c4c4]  rounded-[9px]  shadow-lg  '>
                <div className='w-full h-[60%]'><img className=' rounded-tl-[9px] rounded-tr-[9px] w-full h-[5rem]' src={img} alt="" /></div>
                <div className='w-full flex flex-col   p-[0.5rem]'>
                    <div className='text-[0.8rem] ml-[0.2rem] font-[600]'>{name}</div>
                    <div className='text-[0.55rem] font-[400]'>{description}</div>
                </div>
            </div>
        </>
    )
}

export default ServiceCard