import React from "react";

const Header = () => {
  return (
    <div className="w-full grid grid-cols-12 h-[100px] bg-red">
      hi
      <div className="col-span-3 bg-primary"></div>
      <div className="col-span-9 bg-secondary"></div>
    </div>
  );
};

export default Header;
