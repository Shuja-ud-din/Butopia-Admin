import React from 'react'
import profile from '../../assets/user_profile.png'
const ProfileBar = ({ name, description, profilePic }) => {
    return (
        <div className="flex my-4">
            <img
                className="border rounded-full w-10 h-10 object-cover"
                src={profilePic === null ? profile : profilePic}
            />
            <div className="ml-3">
                <h3 className="font-[700] text-[14px]  ">{name}</h3>
                <p className="text-[13px] text-[#a5a8b0] ">{description}</p>
            </div>
        </div>
    )
}

export default ProfileBar