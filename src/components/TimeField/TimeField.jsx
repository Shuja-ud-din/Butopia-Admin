import React from 'react'

const TimeField = ({ TimeZone = "am", onChange, placeholder, value, className, name }) => {

    return (
        <>
            <div className={`${'flex items-center  w-full custom_input px-[13px] py-[8px] border border-primary rounded-lg mb-3'} ${className}`}>
                <input
                    className='bg-[white] border-none outline-none flex-grow w-[90%]'
                    name={name}
                    type="text"
                    onChange={onChange}
                    placeholder={placeholder}
                    value={value[name]}
                />
                <div className='text-[#cccc]'>{TimeZone}</div>
            </div>
        </>
    )
}

export default TimeField