import React from "react";
import ImageUploader from "../ImageUploader/ImageUploader";
import Button from "../Button/Button";
import Input from "../Input/Input";

const AdminEditForm = () => {
  return (
    <>
      <div className="w-full">
        <h3 className="text-[25px] font-[500] ">Edit Admin</h3>
      </div>
      <div className="mt-4 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg">
        <form className="p-7" onSubmit={addService}>
          <div className="flex justify-between">
            <p className="font-semibold">Service Details</p>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Upload Image
            </button>
          </div>

          <div className="flex gap-28 mt-10 w-full">
            <div className="w-full">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Service Name
                </label>
                <Input onChange={handleChange} name={"name"} type="text" />
              </div>
              <label
                htmlFor="description"
                className="mt-5 block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-primary rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mt-3"
                >
                  Price
                </label>
                <Input name={"price"} type="text" />
              </div>
              <div className="w-full mb-8 mt-8 flex justify-start">
                <Button className="w-40" type="primary" onClick={addService}>
                  Edit Admin
                </Button>
              </div>
            </div>

            {/* <div class="h-[28rem] mb-[2rem] w-[1px] bg-[#000000] shadow-lg"></div> */}
            <div className="w-full h-full flex items-center  flex-col ">
              <ImageUploader />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminEditForm;
