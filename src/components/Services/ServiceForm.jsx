import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import useServices from "../../Hooks/useServices";
import ImageUploader from "../ImageUploader/ImageUploader";
import ButtonLoader from "../ButtonLoader/ButtonLoader";
import useCategories from "../../Hooks/useCategories";
import { Autocomplete, TextField } from "@mui/material";
import useProvider from "../../Hooks/useProvider";

const ServiceForm = () => {
  const {
    addService,
    handleChange,
    addServiceData,
    loading,
    setAddServiceData,
    setImageUrl,
  } = useServices();

  const { getAllCategories, getCategoryTable } = useCategories();
  const { data, getProviderTable } = useProvider();

  useEffect(() => {
    getCategoryTable();
    getProviderTable();
  }, []);

  console.log(getAllCategories);

  return (
    <>
      <div className="w-full">
        <h3 className="text-[25px] font-[500] ">Add Services</h3>
      </div>
      <div className="mt-4 bg-[white] rounded-[9px]  border border-[#c4c4c4] shadow-lg">
        <form className="p-7 " onSubmit={addService}>
          <div className=" mt-10 grid grid-cols-12">
            <div className="h-[15rem] flex  flex-col col-span-4 pr-[5rem] ">
              <ImageUploader setUrl={setImageUrl} />
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

              <div className="mt-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium mb-3 text-gray-700"
                >
                  Category
                </label>
                <Autocomplete
                  disablePortal
                  className="p-0 bg-[white]"
                  size="small"
                  id="combo-box-demo"
                  onChange={(e, newValue) => {
                    setAddServiceData({
                      ...addServiceData,
                      category: newValue.id,
                    });
                  }}
                  options={
                    getAllCategories?.filter(
                      (category) => category.isActive
                    ) || [{ name: "Loading..." }]
                  }
                  sx={{ width: "100%" }}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField {...params} label="Category" />
                  )}
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium mb-3 text-gray-700"
                >
                  Provider
                </label>
                <Autocomplete
                  disablePortal
                  className="p-0 bg-[white]"
                  size="small"
                  id="combo-box-demo"
                  onChange={(e, newValue) => {
                    setAddServiceData({
                      ...addServiceData,
                      provider: newValue.id,
                    });
                  }}
                  options={
                    data?.filter((doctor) => doctor.isValid) || [
                      { name: "Loading..." },
                    ]
                  }
                  sx={{ width: "100%" }}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Provider" />
                  )}
                />
              </div>

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
                className="mt-1 block w-full px-3 py-2 border border-primary rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
