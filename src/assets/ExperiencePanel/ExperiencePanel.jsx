import React from 'react'

const ExperiencePanel = ({ img, type, numberOfType }) => {
    return (
        <>
            <div className='flex flex-col min-w-[rem] items-center '>
                <div className='rounded-full '><img className='w-full max-h-[4.3rem] rounded-full' src={img} alt="" /></div>
                <div className='text-[0.9rem] ml-[0.2rem] font-[600]'>{numberOfType}</div>
                <div className='text-[0.9rem] font-[400]'>{type}</div>
            </div>
        </>
    )
}

export default ExperiencePanel