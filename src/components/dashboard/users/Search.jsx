import React, { useEffect, useState } from 'react'

function Search({setSearchValue}) {

  const [search , setSearch] = useState("")

  const handleChange = (e)=>{
    setSearch(e.target.value)
  }

  useEffect(()=>{
    if(search==="")
    {
      setSearchValue("")
    }
  },[search])


  const handlesubmit = (e)=>{
    e.preventDefault();
    setSearchValue(search)
    // console.log("submit")
  }


  return (
    <form onSubmit={handlesubmit} onAbort={()=>setSearchValue("")}>
 
            <div class="relative">
              <div class="absolute inset-y-0 left-2 start-0 flex items-center ps-3 pointer-events-none rounded-l-full bg-[white]">
                <img src="/search.svg" alt="search" />
              </div>
              <input
                type="search"
                onChange={handleChange}
                value={search}
                id=""
                class="bg-[white] block w-full p-4 ps-10 text-sm text-gray-900  rounded-full bg-[#f5f5f5] outline-none "
                placeholder="Search"
              />
            </div>
          </form>
  )
}

export default Search