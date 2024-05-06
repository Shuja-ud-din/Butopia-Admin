import React from "react";
import search from "../Table/search.svg";

const SearchBar = ({ onChange }) => {
  return (
    <>
      <div className="flex items-center w-full mt-1 grid grid-cols-12 bg-[#e7e7e7] px-2 py-1 rounded-md ">
        <input
          type="text"
          className="border-none bg-[transparent] outline-none col-span-11"
          placeholder={"Search"}
          onChange={onChange}
        />
        <img src={search} className="col-span-1" alt="search" />
      </div>
    </>
  );
};
export default SearchBar;
