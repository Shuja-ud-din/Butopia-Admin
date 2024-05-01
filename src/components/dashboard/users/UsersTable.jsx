import React, { useState, useEffect } from "react";
// import { Users } from "../../../utils/Users";
import DeleteModal from "./modals/DeleteModal";
import EditModal from "./modals/EditModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UsersTable({ users, pending, setApprove, load }) {
  // const [users, setUsers] = useState(Users);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen1, setIsOpen1] = useState(false);
  const [id, setId] = useState();
  const [editUser, setEditUser] = useState();

  const navigation = useNavigate();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal1() {
    setIsOpen1(true);
  }

  function closeModal1() {
    setIsOpen1(false);
  }

  const handleDelete = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  const handleApprove = async (userId) => {
    // console.log("user id ", userId);

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

      setApprove(response);

      // console.log("data", response.data);

      if (response.data) {
        toast.success("User Approved Successfully", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error fetching data", err.response.data);
    }

    // console.log("id", id);
  };

  return (
    <div className="h-[70%] overflow-y-scroll">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-5 ">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Role
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Phone No
              </th>

              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users ? (
              users.map((user, index) => (
                <tr
                  key={index}
                  className={`bg-white border-b border-secondary  ${
                    load ? "" : "hover:bg-secondary cursor-pointer"
                  }`}
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                  >
                    <div
                      className="ps-3 w-full"
                      onClick={() => {
                        if (!load) {
                          navigation(`/profile/${user._id}`);
                        }
                      }}
                    >
                      <div className="text-base font-semibold">{`${user.firstName} ${user.lastName}`}</div>
                      <div className="font-normal text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </th>
                  <td onClick={() => {
                        if (!load) {
                          navigation(`/profile/${user._id}`);
                        }
                      }} className="px-6 py-4 ">{user.role.toUpperCase()}</td>

                  <td onClick={() => {
                        if (!load) {
                          navigation(`/profile/${user._id}`);
                        }
                      }} className="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`h-2.5 w-2.5 rounded-full ${
                          user.approved ? "bg-[green]" : "bg-[red]"
                        } me-2`}
                      ></div>
                      {`${user.approved ? "approved" : "pending"}`}
                    </div>
                  </td>

                  <td  onClick={() => {
                        if (!load) {
                          navigation(`/profile/${user._id}`);
                        }
                      }} className="px-6 py-4">{user.phoneNo}</td>

                  <td className="px-6 py-4">
                    {pending ? (
                      <button
                        onClick={() => handleApprove(user._id)}
                        className="bg-[green] text-[white] rounded-[10px]"
                      >
                        <p className="px-3 py-1">Approve</p>
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <img
                          src="/edit.svg"
                          alt="edit"
                          onClick={() => {
                            setEditUser(user);
                            openModal1();
                          }}
                        />
                        <img
                          src="/delete.png"
                          alt="delete"
                          onClick={() => {
                            setId(user._id);
                            setIsOpen(true);
                          }}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <td colSpan={5} className="px-6 py-4">
                <Skeleton
                  count={5}
                  height={45}
                  style={{ marginBottom: "10px" }}
                />
              </td>
            )}
          </tbody>
        </table>
      </div>

      <DeleteModal modalIsOpen={modalIsOpen} closeModal={closeModal} id={id} />

      <EditModal
        modalIsOpen={modalIsOpen1}
        closeModal={closeModal1}
        editUser={editUser}
      />

      <ToastContainer />
    </div>
  );
}

export default UsersTable;
