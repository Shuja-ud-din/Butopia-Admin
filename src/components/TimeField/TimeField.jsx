import React from 'react'

const TimeField = ({ TimeZone = "am", onChange, placeholder, value, className, name }) => {
    const validateTime = (time) => {
        const actualTime = time.value;
        const regex = /[A-Za-z]/;
        if (!regex) {
            if (actualTime >= 0) {
                if (actualTime[0] < 10) {
                    if (actualTime[1] < 3) {
                        actualTime[1].join(":");
                        if (actualTime[2] < 7) {
                            if (actualTime[3] < 10) {
                                return `${actualTime} ${TimeZone}`
                            }
                        }
                    }

                }
            }
        }
    }
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