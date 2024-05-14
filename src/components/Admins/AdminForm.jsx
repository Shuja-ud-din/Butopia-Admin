import React, { useState } from "react";
import Profile from "../../assets/avatar.jpg";
import Button from "../Button/Button";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";
import Input from "../Input/Input";
import Select from "../Dropdown/Select";
import useAdmin from "../../Hooks/useAdmin";
import LoaderButton from '../ButtonLoader/ButtonLoader'

const AdminForm = () => {
  const { addAdminDetail, handleChange, addAdmin, loading } = useAdmin();
  return (
    <>
      <div className="p-3 pl-[2rem] pr-[2rem] bg-[white] rounded-[1rem] shadow-lg border border-gray-300">
        {/* Content goes here */}
        <div className="text-gray-600 body-font relative">
          <div className="px-2 py-15 mx-auto">
            <div className="flex flex-col text-center w-full mb-8">
              <h1 className="sm:text-3xl mt-[2rem] text-3xl  font-medium title-font mb-2 text-gray-900">
                Admin Details
              </h1>
              <div className="flex justify-center items-center">
                <img alt="Remy Sharp" src={Profile} className="rounded-full" />
              </div>
            </div>
            <form onSubmit={addAdmin} className="lg:w-1/2 md:w-2/3 mx-auto px-[5rem]">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Name
                    </label>
                    <Input type="text"
                      name="name"
                      onChange={handleChange}
                      placeholder={"Name"} />
                  </div>
                </div>

                {/* <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="role"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Role
                    </label>
                    <Select className={"w-full"}>
                      <option value="admin">Admin</option>
                    </Select>
                  </div>
                </div> */}

                <div className="p-2 w-1/2 ">
                  <div className="relative flex flex-col">
                    <label
                      htmlFor="phone"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Phone Number
                    </label>
                    <Input
                      type="text"
                      placeholder={"Phone Number"}
                      name="phoneNumber"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email
                    </label>
                    <Input
                      name="email"
                      onChange={handleChange}
                      type="email"
                      placeholder={"Email"} />
                  </div>
                </div>

                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="confirmPassword"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Password
                    </label>
                    <Input
                      name="password"
                      onChange={handleChange}
                      type="password"
                      placeholder={"Password"} />
                  </div>
                </div>

                {/* <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="confirmPassword"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Confirm Password
                    </label>
                    <Input type="password" placeholder={"Confirm Password"} />
                  </div>
                </div> */}
              </div>
              <div className=" my-6 w-full flex justify-end">
                <Button
                  onClick={addAdmin}
                  type="primary"
                  className="w-[200px]">
                  {loading ? <LoaderButton /> : "Add"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminForm;
