import React from "react";
import bottomArrow from "../../../assets/arrow_bottom.png";

function Header() {
  return (
    <div className="w-full h-[100px] bg-lightBg ml-[7px] block">
      <div className="p-7   flex justify-between items-center">
        <div>
          <p className="text-[20px] font-600 text-[#0A0A0A]">Hello, Silvio</p>
          <p className="text-[14px] text-[#757575]">Have a nice day</p>
        </div>
        <div className="flex  flex justify-between items-center  w-[200px]">
          <div className="flex gap-2 items-center ">
            <div className="bg-[#BFBFBF] w-[45px] h-[45px] mx-2 rounded-full"></div>
            <div>
              <h5 className="text-[17px] font-600 text-[#0A0A0A]">AgerLink</h5>
              <p className="text-[14px] text-[#757575]">Super Admin</p>
            </div>
          </div>
          <img src={bottomArrow} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Header;
