import React from 'react';

const ChatBox = ({ name, profilePhoto, lastMessage }) => {
    return (
        <div className="flex pl-[1rem] items-center border-b border-[#ccc]  py-[0.5rem]">
            <img
                src={profilePhoto}
                alt={`${name}'s profile`}
                className="h-[2rem] w--[2rem] rounded-full mr-4"
            />
            <div>
                <h3 className="text-[0.65rem] font-semibold">{name}</h3>
                <p className="text-[0.6rem] text-gray-600">{lastMessage}</p>
            </div>
        </div>
    );
};

export default ChatBox;
