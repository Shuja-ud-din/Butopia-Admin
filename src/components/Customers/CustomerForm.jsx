import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ImageUploader from "../ImageUploader/ImageUploader";
import useCustomer from "../../Hooks/useCustomer";

const CustomerForm = () => {
  const { setImagePreview, handleChange, addCustomer } = useCustomer();

  return (
    <>
      <div className="w-full">
        <h3 className="text-[25px] font-[500] ">Add Customers</h3>
      </div>
      <div className="mt-4 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg">
        <form className="p-7" onSubmit={addCustomer}>
          <div className="flex grid grid-cols-12 mt-10 w-full">
            <div className="col-span-3 w-[14rem] h-[14rem]">
              <ImageUploader profile setUrl={setImagePreview} />
            </div>

            <div className=" col-span-9">
              <div>
                <Input
                  type="text"
                  label={"Name"}
                  placeholder={"Name"}
                  onChange={handleChange}
                  name={"name"}
                />
              </div>

              <div>
                <Input
                  label={"Phone Number"}
                  placeholder={"Phone Number"}
                  type="text"
                  name={"phoneNumber"}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Input
                  type="text"
                  label={"Email"}
                  placeholder={"Email"}
                  name={"email"}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Input
                  type="password"
                  label={"Password"}
                  placeholder={"Password"}
                  name={"password"}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Input
                  type="password"
                  label={"Confirm Password"}
                  placeholder={"Confirm Password"}
                  name={"confirmPassword"}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end mt-8">
            <Button className="w-40" type="primary" outlined="true">
              {" "}
              Save Customer
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CustomerForm;
