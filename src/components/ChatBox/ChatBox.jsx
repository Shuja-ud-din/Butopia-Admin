import React from 'react';

const ChatBox = ({ name, profilePhoto, lastMessage }) => {
    return (
        <div className="flex pl-[1rem]   items-center border-b border-gray-300 py-3">
            <img
                src={profilePhoto}
                alt={`${name}'s profile`}
                className="h-10 w-10 rounded-full mr-4"
            />
            <div>
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-gray-600">{lastMessage}</p>
            </div>
        </div>
    );
};

export default ChatBox;
