import React, { useState } from 'react';

const InputBar = ({ value, onChange, onSend, }) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSend();
        }
    };

    return (
        <div className="flex items-center border border-gray-300 rounded-md p-2">
            <input
                type="text"
                value={value}
                onChange={onChange}
                onKeyPress={handleKeyPress} // Listen for Enter key press
                placeholder="Type your message..."
                className="w-full outline-none px-3 py-2 rounded-md bg-gray-100 focus:ring focus:ring-blue-200"
            />
            <button
                onClick={onSend}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
                Send
            </button>
        </div>
    );
};

export default InputBar;
