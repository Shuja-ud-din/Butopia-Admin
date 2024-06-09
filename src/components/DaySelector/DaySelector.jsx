import React from "react";

const DaySelector = ({ day, onClick, isSelected, value, name }) => {
  return (
    // <button
    //     className={`m-2 ml-0 pl-2 pr-2 pt-2 pb-2 w-22 h-3rem rounded-0.1rem bg-[white] rounded-lg flex items-center justify-start min-w-[5rem]  border border-[grey]
    //     ${isSelected ? "bg-primary text-[white]" : ""}`}
    //     onClick={onClick}
    // >
    //     <div className={`  left-1/2 p-1 mr-2.5 rounded-full bg-[white] border border-[gray-300] `} />
    //     <input type="text" onClick={onClick} name={name} placeholder={day} value={value} className='pointer-events-none outline-none bg-[transparent]' />
    // </button>

    <div
      onClick={onClick}
      className={`text-[0.88rem] shadow-lg cursor-pointer font-[400] flex justify-between border border-[#909aaa] rounded-full py-1 px-3  ${
        isSelected ? "bg-primary text-[white]" : ""
      }`}
    >
      <p>{day}</p>
    </div>
  );
};

export default DaySelector;
