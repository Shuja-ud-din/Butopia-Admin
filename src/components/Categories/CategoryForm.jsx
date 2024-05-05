import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import CategoryDropdown from "../SelectDropdown/CategoryDropDownSelect";
import ImageUploader from '../ImageUploader/ImageUploader'
const CategoryForm = () => {
  const [imagePreview, setImagePreview] = useState("");
  return (
    <>
      <div className="w-full">
        <h3 className="text-[25px] font-[500] ">Add Category</h3>
      </div>
      <div className="mt-4 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg">
        <form className="p-7">
          <div className="flex justify-between">
            <p className="font-semibold">Upload Image</p>
          </div>

          <div className="flex gap-28 mt-10 w-full">
            <div className="w-full h-[50%] flex justify-center items-center flex-col ">
              <ImageUploader
                typeOfImage="profile"
              />
              {/* <label htmlFor="image-upload" className="cursor-pointer">
                <div className="w-[350px] h-[300px] mb-4 flex justify-center items-center border-2 border-[#E5E5E5] rounded-[12px] overflow-hidden ">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Plant"
                      className="w-full h-full"
                    />
                  ) : (
                    <img
                      // src="/placeholder"
                      // alt="placeholder"
                      className="w-18 h-18"
                    />
                  )}
                </div>
                <input
                  id="image-upload"
                  name="image"
                  type="file"
                  className="hidden"
                />
              </label> */}
            </div>
            <div class="h-[25rem] w-[1px] bg-[black]"></div>
            <div className="w-full">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Category Name
                </label>
                <Input type="text" />
              </div>

              <div>
                <label
                  htmlFor="scientificName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Services
                </label>
                <div className="mt-2 mb-2">
                  <CategoryDropdown />
                </div>
              </div>
              <label
                htmlFor="description"
                className="mt-12 block text-sm font-medium text-gray-700"
              >
                Additional Comments
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border border-primary rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="w-full mb-8 mt-8 flex justify-end">
            <Button className="w-40" type="primary" outlined="true">
              {" "}
              Save Category
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CategoryForm;
