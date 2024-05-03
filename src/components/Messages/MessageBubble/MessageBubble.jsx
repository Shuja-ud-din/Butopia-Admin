import React from 'react';

const MessageBubble = ({ message, sender }) => {
    const currentTime = new Date()
    const formatTime = (time) => {
        const date = new Date(time);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        const strTime = hours + ":" + minutes + " " + ampm;
        return strTime;
    }
    return (
        <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
            <div className={`flex flex-col items-end border border-primary shadow-lg rounded-lg p-2 max-w-[70%] ${sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                <div>{message}</div>
                <div className="text-[10px] m-0 p-0 text-gray-500 mt-1">{formatTime(currentTime)}</div>
            </div>
        </div>
    );
};

export default MessageBubble;
