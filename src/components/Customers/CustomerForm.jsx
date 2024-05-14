import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ImageUploader from "../ImageUploader/ImageUploader";
// import uploadImg from '../../assets/images/upload-img.png';
const CustomerForm = () => {
  const [imagePreview, setImagePreview] = useState("");
  return (
    <>
      <div className="w-full">
        <h3 className="text-[25px] font-[500] ">Add Customers</h3>
      </div>
      <div className="mt-4 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg">
        <form className="p-7">
          <div className="flex justify-between">
            <p className="font-semibold">Image of customer</p>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Customer Detail
            </button>
          </div>

          <div className="flex gap-28 mt-10 w-full">
            <div className="w-[18rem]">
              <ImageUploader profile />
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input type="text" />
              </div>

              <div>
                <label
                  htmlFor="scientificName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <Input type="text" />
              </div>
              <div>
                <label
                  htmlFor="plantingPeriod"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input type="text" />
              </div>
              <div>
                <label
                  htmlFor="harvestingPeriod"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <Input type="text" />
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
