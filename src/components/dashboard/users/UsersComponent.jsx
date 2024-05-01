import React, { useEffect, useState } from "react";
import Search from "./Search";
import UsersTable from "./UsersTable";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../Pagination/Pagination";

function UsersComponent({ activeTab }) {
  const [hover, setHover] = useState(false);
  const [users, setUsers] = useState();
  const [pages, setPages] = useState(1);
  const [count, setCount] = useState(1);
  const [role, setRole] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [load, setLoad] = useState(true);

  const [selectedValue, setSelectedValue] = useState(10);

  const { loadingDelete, dataUserDelete, errorDelete } = useSelector(
    (state) => state.deleteUser
  );

  const { loadingEdit, dataUserEdit, errorEdit } = useSelector(
    (state) => state.editUser
  );

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `https://api.agerlink.it/api/v1/admin/getAllUsers?page=${count}&limit=${selectedValue}&role=${role}&search=${searchValue}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data.data);
        setPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data", err.response.data);
      }
    })();
  }, [count, selectedValue, role, searchValue, dataUserDelete, dataUserEdit]);

  useEffect(() => {
    if (users) {
      setLoad(false);
    } else {
      setLoad(true);
    }
  }, [users]);

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
          <div className="flex gap-1 relative cursor-pointer pr-10">
            <p>{`${role ? role : "All"}`}</p>
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
                  onClick={() => setRole("")}
                  class="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  All
                </a>
              </li>
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
                  Consumer
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="h-[80%]">
        <UsersTable users={users} load={load} />
        <Pagination
          selectedValue={selectedValue}
          setSelectedValue={selectedValue}
          count={count}
          setCount={setCount}
          pages={pages}
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default UsersComponent;
