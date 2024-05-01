import React, { useEffect, useState } from "react";
import Search from "./Search";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAlllBusinessOwners } from "../../../store/thunks";
import BusinessOwnersTable from "./BusinessOwnersTable";

function BusinessOwners({ activeTab }) {
  const [users, setUsers] = useState();
  const [pages, setPages] = useState(1);
  const [count, setCount] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const [load,setLoad] = useState()


  // console.log("search value" , searchValue)

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

  // const { loading, businessOwners, error } = useSelector(
  //   (state) => state.getBusinessOwners
  // );

  // console.log("bussiness owners ", businessOwners, loading, error);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getAlllBusinessOwners());
  // }, []);





  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
            `https://api.agerlink.it/api/v1/admin/getAllBusinessOwners?page=${count}&limit=${selectedValue}&search=${searchValue}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data.data);
        setPages(response.data.totalPages);
        // setCount(response.data.totalCount)

        // console.log("data", response.data);
      } catch (error) {
        console.error("Error fetching data", err.response.data);
      }
    })();
  }, [count, selectedValue, searchValue]);


  useEffect(()=>{
    if(users){setLoad(false)}
    else{setLoad(true)}
  },[users])

  return (
    <div className="bg-[white] mx-5 h-full">
      <div className=" p-4 flex justify-between items-center gap-10">
        <div className="w-[50%]">
          <Search setSearchValue={setSearchValue} />
        </div>
      </div>

      <div className="h-[80%]">
        <BusinessOwnersTable users={users} businessOwners="1" load={load}/>

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

export default BusinessOwners;
