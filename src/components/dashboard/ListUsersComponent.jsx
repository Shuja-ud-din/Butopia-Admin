import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Table from "./Table/Table";
import Pagination from "./Pagination/Pagination";
import DeleteModal from "./users/modals/DeleteModal";
import Tabs from "./users/tabs/Tabs";

function ListUsersComponent() {
  const token = localStorage.getItem("token");
  const baseURL = import.meta.env.VITE_BASE_URL;

  const usersEndpoints = [
    {
      title: "All",
      endpoint: "getAllUsers",
    },
    {
      title: "Pending",
      endpoint: "getNotApprovedList",
    },
    {
      title: "businessOwners",
      endpoint: "getAllBusinessOwners",
    },
  ];

  const [modalIsOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [pages, setPages] = useState(1);
  const [count, setCount] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [users, setUsers] = useState();
  const [selectedValue, setSelectedValue] = useState(10);
  const [record, setRecord] = useState();
  const [activeTab, setActiveTab] = useState("All");
  const [role, setRole] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  const fetchData = async () => {
    setUsers(null);

    const currentEndpoint = usersEndpoints.find(
      (user) => user.title === activeTab
    );

    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `https://api.agerlink.it/api/v1/admin/${currentEndpoint.endpoint}?page=${count}&limit=${selectedValue}&role=${role}&search=${searchValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data.data);
      setTotalCount(response.data.totalCount);
      console.log("get all users", response);
      setPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  console.log(searchValue);

  useEffect(() => {
    fetchData();
  }, [count, searchValue, selectedValue, activeTab, role]);

  const deleteRecord = async (id) => {
    setIsOpen(true);
  };

  const handleApprove = async (userId) => {
    if (!confirm("Are you sure to approve this user?")) return;

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `https://api.agerlink.it/api/v1/admin/approveUser`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        toast.success("User Approved Successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        fetchData();
      }
    } catch (error) {
      console.error("Error fetching data", err.response.data);
    }
  };

  return (
    <div>
      <Tabs
        activeTab={activeTab}
        setCount={setCount}
        setActiveTab={setActiveTab}
      />

      {activeTab === "businessOwners" ? (
        <Table
          className="mt-2"
          tableName="Buisness"
          array={users}
          routes={[null, "/users/businessOwner", "/users"]}
          label={[
            "Business Name",
            "Business Type",
            "Vat Number",
            "Owner",
            "Role",
            "Actions",
          ]}
          keysToDisplay={[
            "businessName",
            "businessType",
            "vatNumber",
            null,
            null,
          ]}
          setRecord={setRecord}
          customBlocks={[
            {
              index: 3,
              component: (obj) => {
                return (
                  <div className="ps-3 w-full">
                    <div className="text-base font-semibold">{`${obj?.owner?.firstName} ${obj?.owner?.lastName}`}</div>
                    <div className="font-normal text-gray-500">
                      {obj?.owner?.email}
                    </div>
                  </div>
                );
              },
            },
            {
              index: 4,
              component: (obj) => {
                return (
                  <>
                    <div
                      className={`p-1 text-center rounded-lg  uppercase ${
                        obj.role === "operator"
                          ? "bg-[#EFF4FA] text-[#717171]"
                          : "bg-primary text-[white]"
                      }`}
                    >
                      <p>{obj?.owner?.role}</p>
                    </div>
                  </>
                );
              },
            },
            // {
            //   index: 2,
            //   component: (value) => {
            //     return (
            //       <div className="flex items-center">
            //         <div
            //           className={`h-2.5 w-2.5 rounded-full ${
            //             value ? "bg-[green]" : "bg-[red]"
            //           } me-2`}
            //         ></div>
            //         {`${value ? "Approved" : "Pending"}`}
            //       </div>
            //     );
            //   },
            // },
          ]}
          setSearchValue={setSearchValue}
          deleteRecord={deleteRecord}
        />
      ) : (
        <Table
          className="mt-2"
          tableName="User"
          array={users}
          routes={[null, "/users", "/users"]}
          label={["Name", "Role", "Status", "Phone No", "Actions"]}
          setRecord={setRecord}
          customBlocks={[
            {
              index: 0,
              component: (obj) => {
                return (
                  <div className="ps-3 w-full">
                    <div className="text-base font-semibold">{`${obj.firstName} ${obj.lastName}`}</div>
                    <div className="font-normal text-gray-500">{obj.email}</div>
                  </div>
                );
              },
            },
            {
              index: 1,
              component: (value) => {
                return (
                  <>
                    <div
                      className={`p-1 text-center rounded-lg  uppercase ${
                        value === "operator"
                          ? "bg-[#EFF4FA] text-[#717171]"
                          : "bg-primary text-[white]"
                      }`}
                    >
                      <p>{value}</p>
                    </div>
                  </>
                );
              },
            },
            {
              index: 2,
              component: (value) => {
                return (
                  <div className="flex items-center">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        value ? "bg-[green]" : "bg-[red]"
                      } me-2`}
                    ></div>
                    {`${value ? "Approved" : "Pending"}`}
                  </div>
                );
              },
            },
          ]}
          filters={[
            <select
              className="flex justify-between text-primary px-4 mr-4 py-3 bg-[transparent]"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">All</option>
              <option value="admin">Admin</option>
              <option value="operator">Operator</option>
              <option value="manager">Manager</option>
              <option value="consumer">Consumer</option>
            </select>,
          ]}
          keysToDisplay={[null, "role", "approved", "phoneNo"]}
          setSearchValue={setSearchValue}
          deleteRecord={deleteRecord}
          extraColumns={
            activeTab === "Pending"
              ? [
                  (record) => {
                    return (
                      <>
                        <div
                          className={`p-1 text-center rounded-lg mr-5 ${"bg-primary text-[white]"}`}
                          onClick={() => handleApprove(record._id)}
                        >
                          <p>Approve</p>
                        </div>
                      </>
                    );
                  },
                ]
              : []
          }
        />
      )}

      <Pagination
        setCount={setCount}
        count={count}
        selectedValue={selectedValue}
        totalCount={totalCount}
        setSelectedValue={setSelectedValue}
        pages={pages}
      />

      <DeleteModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        id={record?._id}
      />
      <ToastContainer />
    </div>
  );
}

export default ListUsersComponent;
