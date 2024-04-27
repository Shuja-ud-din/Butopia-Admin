import React from "react";

const DashRange = ({ service = "", count = 0, percent = 0 }) => {
  return (
    <div className="mt-3">
      <div className="flex justify-between text-[15px]  ">
        <p className="text-[#aeafb4] font-[500] ">{service}</p>
        <p className="font-[600]">{count}</p>
      </div>
      <div className="w-full bg-[#f4f5f9] h-[10px] rounded-lg">
        <div
          style={{ width: `${percent}%` }}
          className="bg-primary rounded-lg h-full"
        ></div>
      </div>
    </div>
  );
};

export default DashRange;
