import React from 'react'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

const VerifyOtp = () => {
    return (
        <>
            <h1 className="text-[26px] font-[500] mb-2 ">Verify OTP</h1>
            <p className="text-[17px] text-[#4c4c4c] mb-12 ">
                Enter OTP here
            </p>
            <div className='mb-2 w-full flex justify-between'>
                <Input className="w-1/6 h-2rem flex justify-center bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg" type="otpNumber" placeholder="" />
                <Input className="w-1/6 flex justify-center bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg" type="otpNumber" placeholder="" />
                <Input className="w-1/6 flex justify-center bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg" type="otpNumber" placeholder="" />
                <Input className="w-1/6 flex justify-center bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg" type="otpNumber" placeholder="" />
            </div>
            <Button className='mt-12 w-[6rem]'>Verify</Button>
            <div className="flex">
                <p className="text-[#a0a0a0] mt-3 ml-[9rem]">Resend after 50s</p>
            </div>
        </>
    )
}

export default VerifyOtp