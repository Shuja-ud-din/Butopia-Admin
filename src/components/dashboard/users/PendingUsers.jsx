import React, { useEffect, useState } from "react";
import Search from "./Search";
import UsersTable from "./UsersTable";
import axios from "axios";


function UsersComponent({activeTab}) {
  const [hover, setHover] = useState(false);
  const [users, setUsers] = useState();
  const [pages, setPages] = useState(1);
  const [count, setCount] = useState(1);
  const [role, setRole] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [approve,setApprove] = useState()
  

  const onPrevious = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const onNext = () => {
    if (count < pages) {
      setCount(count + 1);
    }
  };

  const [selectedValue, setSelectedValue] = useState(10);

  const handleSelectChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setSelectedValue(newValue);
  };

  // Generating options dynamically
  const options = Array.from({ length: 21 }, (_, index) => (
    <option key={index} value={index}>
      {index === 0 ? "Items count" : index}
    </option>
  ));

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
            `https://api.agerlink.it/api/v1/admin/getNotApprovedList?page=${count}&limit=${selectedValue}&role=${role}&search=${searchValue}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data.data);
        setPages(response.data.totalPages);
        // setCount(response.data.totalCount)

      //   if(response.data.success)
      //   {
      //         toast.success("User Approved Successfully", {
      //   position: "top-center",
      //   autoClose: 2000,
      //   })
      // }

        // console.log("data", response.data);
      } catch (error) {
        console.error("Error fetching data", err.response.data);
      }
    })();
  }, [count, selectedValue, role, searchValue, approve]);

  return (
    <div className="bg-[white] mx-5 h-full">
      <div className=" p-4 flex justify-between items-center gap-10">
        <div className="w-[50%]">
          <Search setSearchValue={setSearchValue} />
        </div>

        <div
          onMouseLeave={() => {
            setHover(false);
          }}
          onMouseEnter={() => {
            setHover(true);
          }}
        >
          <div className="flex gap-1 relative cursor-pointer">
            <p>{`${role ? role : "Role"}`}</p>
            <img src="/sort.svg" alt="sort" />
          </div>

          <div
            className={`bg-[white] rounded-xl shadow-2xl absolute z-10 ${
              hover ? "block" : "hidden"
            }`}
          >
            <ul
              class="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownActionButton"
            >
              <li>
                <a
                  onClick={() => setRole("operator")}
                  class="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Operator
                </a>
              </li>
              <li>
                <a
                  onClick={() => setRole("admin")}
                  class="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Admin
                </a>
              </li>
              <li>
                <a
                  onClick={() => setRole("manager")}
                  class="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Manager
                </a>
              </li>
              <li>
                <a
                  onClick={() => setRole("consumer")}
                  class="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  consumer
                </a>
              </li>
            </ul>
          </div>
        </div>

       
      </div>




<div className="h-[80%]">
        <UsersTable users={users} pending="1" setApprove={setApprove}/>

        <div className="flex gap-5 justify-end p-2 items-center">
          <div>
            <select
              className=" border-[1px] rounded-[5px]"
              value={selectedValue}
              onChange={handleSelectChange}
            >
              {options}
            </select>
          </div>

          <button
            onClick={onPrevious}
            className="bg-[green] text-[white] rounded-[10px]"
          >
            <p className="px-3 py-1">Pevious</p>
          </button>
          <div>
            <p>{`${count} of ${pages}`}</p>
          </div>
          <button
            onClick={onNext}
            className="bg-[green] text-[white] rounded-[10px]"
          >
            <p className="px-3 py-1">Next</p>
          </button>
        </div>
      </div>

    </div>
  );
}

export default UsersComponent;
