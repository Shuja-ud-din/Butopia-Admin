import React, { useState } from 'react'

function ProfileDetails({profile,userProfile}) {

  return (
    <div className=" w-full bg-[white]">
        <div className='p-5'>
        <p className='font-bold text-[24px] mb-5'>Profile Details</p>
    
    {
      profile?(
        <form>
            <div className='grid grid-cols-2 gap-5'>
        <div className="my-2">
            <label>Business Name</label>
          <input
            className=" text-[#6C737F] text-[14px] border border-[#D2D6DB] rounded-[10px] w-full py-2 px-3 h-[47px] bg-[white] outline-none"
            type="email"
            id="email"
            name="email"
            value={profile?.businessName}
            readOnly
            
          />
        </div>
        <div className="my-2">
        <label>Business Type</label>

          <input
            className=" text-[#6C737F] text-[14px] border border-[#D2D6DB] rounded-[10px] w-full py-2 px-3 h-[47px] bg-[white] focus:outline focus:shadow-outline"
            type="email"
            id="email"
            name="email"
            value={profile?.businessType}
            readOnly
          />
        </div>

        <div className="my-2">
        <label>Vat Number</label>

          <input
            className=" text-[#6C737F] text-[14px] border border-[#D2D6DB] rounded-[10px] w-full py-2 px-3 h-[47px] bg-[white] focus:outline focus:shadow-outline"
            type="email"
            id="email"
            name="email"
            value={profile?.vatNumber}
            readOnly
          />
        </div>

        <div className="my-2">
        <label>Address</label>

          <input
            className=" text-[#6C737F] text-[14px] border border-[#D2D6DB] rounded-[10px] w-full py-2 px-3 h-[47px] bg-[white] focus:outline focus:shadow-outline"
            type="email"
            id="email"
            name="email"
            value={profile?.businessType}
            readOnly
          />
        </div>


        <div className="my-2">
        <label>Email</label>

          <input
            className=" text-[#6C737F] text-[14px] border border-[#D2D6DB] rounded-[10px] w-full py-2 px-3 h-[47px] bg-[white] focus:outline focus:shadow-outline"
            type="email"
            id="email"
            name="email"
            value={profile?.owner?.email}
            readOnly
          />
        </div>

        <div className="my-2">
        <label>Phone</label>

          <input
            className=" text-[#6C737F] text-[14px] border border-[#D2D6DB] rounded-[10px] w-full py-2 px-3 h-[47px] bg-[white] focus:outline focus:shadow-outline"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={profile?.owner?.phoneNo}
            readOnly
          />
        </div>

        </div>
        </form>
      ):
      (
        <form>
            <div className='grid grid-cols-2 gap-5'>
        <div className="my-2">
            <label>First Name</label>
          <input
            className=" text-[#6C737F] text-[14px] border border-[#D2D6DB] rounded-[10px] w-full py-2 px-3 h-[47px] bg-[white] focus:outline outline-primary focus:shadow-outline"
            type="text"
            id="firstName"
            name="firstname"
            value={userProfile?.firstName}
            readOnly
          />
        </div>
        <div className="my-2">
        <label>Last Name</label>

          <input
            className=" text-[#6C737F] text-[14px] border border-[#D2D6DB] rounded-[10px] w-full py-2 px-3 h-[47px] bg-[white] focus:outline outline-primary focus:shadow-outline"
            type="text"
            id="lastName"
            name="lastName"
            value={userProfile?.lastName}
            readOnly
          />
        </div>

        <div className="my-2">
        <label>Email</label>

          <input
            className=" text-[#6C737F] text-[14px] border border-[#D2D6DB] rounded-[10px] w-full py-2 px-3 h-[47px] bg-[white] outline-none"
            type="email"
            id="email"
            name="email"
            value={userProfile?.email}
            readOnly
          />
        </div>

        <div className="my-2">
        <label>Role</label>

          <input
            className=" text-[#6C737F] text-[14px] border border-[#D2D6DB] rounded-[10px] w-full py-2 px-3 h-[47px] bg-[white] outline-none"
            type="text"
            id="email"
            name="email"
            value={userProfile?.role}
            readOnly
          />
        </div>
        </div>
        </form>
      )
    }

        </div>


    
    </div>
  )
}

export default ProfileDetails