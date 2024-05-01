import React, { useState } from "react";
import { Link } from "react-router-dom";

function Tab({ name, active, onClick }) {
  return (
    <Link
      className={`flex gap-2 pb-2 line relative ${
        active
          ? 'after:border-[2px] after:border-solid after:border-[green] after:absolute after:content-"" after:bottom-0 after:w-[38px]'
          : ""
      }`}
      onClick={onClick}
    >
      <p
        className={` text-[16px] ${active ? "text-[green]" : "text-[#757575]"}`}
      >
        {name}
      </p>
    </Link>
  );
}

export default Tab;
