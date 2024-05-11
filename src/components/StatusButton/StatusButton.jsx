import React from 'react';

const ActiveButton = ({ isActive, onClick }) => {
    return (
        <button
            className={`py-2 px-4 rounded ${isActive ? 'bg-[#4CAF50] text-[white]' : 'bg-[#999999] text-[white]'
                }`}
            onClick={onClick}
        >
            {isActive ? 'Active' : 'Inactive'}
        </button>
    );
};

export default ActiveButton;
