import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import ServiceDropDown from "../SelectDropdown/ServiceDropDownSelect";
import ServiceProviderDropDown from "../SelectDropdown/ServiceProviderDropDown";
import useServices from "../../Hooks/useServices";
import ImageUploader from "../ImageUploader/ImageUploader";
import ButtonLoader from "../ButtonLoader/ButtonLoader";

const ServiceForm = () => {
  const { addService, handleChange, addServiceData, loading } = useServices();

  return (
    <>
      <div className="w-full">
        <h3 className="text-[25px] font-[500] ">Add Services</h3>
      </div>
      <div className="mt-4 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg">
        <form className="p-7 " onSubmit={addService}>
          <div className="flex  mt-10 grid grid-cols-12">
            <div className="h-[15rem] h-[15rem] flex  flex-col col-span-4 pr-[5rem] ">
              <ImageUploader />
            </div>
            <div className=" col-span-8">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Service Name
                </label>
                <Input onChange={handleChange} name={"name"} type="text" />
              </div>

              {/* <div>
                                <label
                                    htmlFor="scientificName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Service Category
                                </label>
                                <div className='mt-2 mb-2'><ServiceDropDown /></div>
                            </div>
                            <div>
                                <label
                                    htmlFor="scientificName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Service Provider
                                </label>
                                <div className='mt-2 mb-2'><ServiceProviderDropDown /></div>
                            </div> */}
              <label
                htmlFor="description"
                className="mt-5 block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                onChange={handleChange}
                name={"description"}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border border-primary rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mt-3"
                >
                  Price
                </label>
                <Input name={"price"} onChange={handleChange} type="text" />
              </div>
              <div className="w-full mb-8 mt-8 flex justify-start">
                <Button className="w-40" type="primary" onClick={addService}>
                  {loading ? <ButtonLoader /> : "Add Service"}
                </Button>
              </div>
            </div>

            {/* <div class="h-[28rem] mb-[2rem] w-[1px] bg-[#000000] shadow-lg"></div> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default ServiceForm;
