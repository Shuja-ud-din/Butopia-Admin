import React, { useEffect, useState } from "react";

const SearchBar = ({ setSearchValue }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search === "") {
      setSearchValue("");
    }
  }, [search]);

  const handlesubmit = (e) => {
    e.preventDefault();
    setSearchValue(search);
    // console.log("submit")
  };

  return (
    <form
      onSubmit={handlesubmit}
      onAbort={() => setSearchValue("")}
      className=""
    >
      <div class="relative rounded-lg border border-[#979797] p-1">
        <div class="absolute  inset-y-0 left-2 start-0 flex items-center ps-3 pointer-events-none  bg-transparent">
          <img src="/search.svg" alt="search" />
        </div>
        <input
          type="search"
          onChange={handleChange}
          value={search}
          id=""
          class="bg-[white] block w-full ps-10 p-1  text-sm text-gray-900  bg-transparent outline-none "
          placeholder="Search"
        />
      </div>
    </form>
  );
};

export default SearchBar;
