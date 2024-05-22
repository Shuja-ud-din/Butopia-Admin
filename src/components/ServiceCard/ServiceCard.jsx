import React from "react";

const ServiceCard = ({ img, name, description, price }) => {
  return (
    <>
      <div className="w-full flex flex-col border border-[#c4c4c4] cursor-pointer rounded-[9px] max-h-[300px]  shadow-lg  ">
        <div className="w-full">
          <img
            className=" rounded-tl-[9px] rounded-tr-[9px] w-full h-[10rem] "
            src={img}
            alt=""
          />
        </div>
        <div className="w-full flex flex-col   p-[0.5rem]">
          <div className="flex justify-between w-full">
            <p className="ml-[0.2rem] font-[600]">{name}</p>
            <p>{price} SAR</p>
          </div>
          <div className="text-[0.65rem] font-[400]">{description}</div>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
