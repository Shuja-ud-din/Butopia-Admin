import React, { useState } from 'react';

const InputBar = ({ value, onChange, onSend }) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSend();
        }
    };

    return (
        <div className="flex mb-[1rem] items-center border border-gray-300 rounded-md p-2">
            <input
                type="text"
                value={value}
                onChange={onChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full outline-none px-3 py-2 rounded-md bg-gray-100 focus:ring focus:ring-blue-200"
            />
            <button
                onClick={onSend}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
                <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path d="M3 3l18 9-18 9v-18z" />
                </svg>
            </button>
        </div>
    );
};

export default InputBar;
