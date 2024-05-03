
import React from 'react';

const DaySelector = ({ day, onClick, isSelected }) => {
    return (
        <button
            className={`m-2 ml-0 pl-2 pr-2 pt-2 pb-2 w-22 h-3rem rounded-0.1rem bg-[white] rounded-lg flex items-center justify-start min-w-[5rem]  border border-[grey] 
            ${isSelected ? "bg-primary text-[white]" : ""}`}
            onClick={onClick}
        >
            <div className={`  left-1/2 p-1 mr-2.5 rounded-full bg-[white] border border-[gray-300] `} />
            <span className="text-white">{day}</span>
        </button>
    );
};

export default DaySelector;
