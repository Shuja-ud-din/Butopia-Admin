import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FormField } from "../vehicle/AddVehicleComponent";
import { useNavigate } from "react-router-dom";

const mainFeaturesFields = ["name", "scientificName"];

const AddSeedForm = () => {
  const token = localStorage.getItem("token");
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [categories, setCatagories] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          "https://api.agerlink.it/api/v1/common/uploadImage",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
              // Add any other headers your API needs, such as Authorization
            },
          }
        );

        if (response.data.data) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            image: response.data.data,
          }));

          toast.success("image uploaded successfully");
        }

        console.log(response.data.data);
      } catch (error) {
        // console.error(
        //   "Error uploading image",
        //   error.response ? error.response.data : error.message
        // );
        toast.error(
          error.response?.data?.message || "An error occurred while updating"
        );
      }
    }
  };

  const fetchCatagories = async () => {
    try {
      const response = await axios.get(baseURL + "/category?type=seed", {
        headers: { Authorization: "Bearer " + token },
      });

      setCatagories(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        baseURL + "/seed",
        {
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Seed Created Successfully!");

      setTimeout(() => {
        navigate("/seeds");
      }, 3000);
    } catch (error) {
      console.error("Error creating seed", error);
    }
  };

  useEffect(() => {
    fetchCatagories();
  }, []);

  return (
    <>
      <div className="w-full flex justify-between items-center pt-5">
        <h2 className="text-[#039443] font-[700] text-[27px]">
          Seed Attributes
        </h2>

        <button
          className="bg-primary text-[white] px-3 py-1 text-[14px] font-[700] rounded"
          onClick={handleSubmit}
        >
          <p className="p-2">Save Seed Information</p>
        </button>
      </div>
      <div className="">
        <form onSubmit={handleSubmit} className="">
          <div className="flex  gap-28 w-full  p-5 w-full bg-[white]  my-5 rounded-lg">
            <div className="w-full">
              <h4 className="font-[600] text-[17px] text-[#222B45] my-3">
                Main Features
              </h4>
              {mainFeaturesFields.map((field, index) => (
                <FormField
                  key={field}
                  name={field}
                  value={formData[field]}
                  handleChange={handleInputChange}
                  index={index}
                />
              ))}
              <div
                className={`grid grid-cols-2 justify-between mb-4 ${"bg-white"}`}
              >
                <label
                  htmlFor={"category"}
                  className="mb-2 text-[#6D6D6D] cap-first "
                >
                  category
                </label>
                <select
                  className="border-2 border-[#E5E5E5] rounded-[10px] p-2"
                  name="category"
                  onChange={handleInputChange}
                >
                  <option value="0">Category</option>
                  {categories.map((category, index) => {
                    return (
                      <option value={category._id}>{category.title}</option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="flex justify-center items-center flex-col">
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="w-[350px] h-[300px] flex justify-center items-center border-2 border-[#E5E5E5] rounded-[12px] overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Vehicle"
                      className="w-full h-full"
                    />
                  ) : (
                    <img src="/placeholder.svg" alt="placeholder" />
                  )}
                </div>
                <input
                  id="image-upload"
                  name="image"
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className=" w-full  p-5 w-full bg-[white]  my-5 rounded-lg">
            <h4 className="font-[600] text-[17px] text-[#222B45] mb-5">
              Climate Zone
            </h4>

            <label
              htmlFor="description"
              className="block text-sm font-medium text-[#6D6D6D]"
            >
              Description
            </label>
            <textarea
              name="climateZone"
              id="description"
              rows={4}
              placeholder="Type Here"
              value={formData.climateZone}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-[#6D6D6D] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className=" w-full  p-5 w-full bg-[white]  my-5 rounded-lg">
            <h4 className="font-[600] text-[17px] text-[#222B45] mb-5">
              Sowing Period
            </h4>

            <label
              htmlFor="description"
              className="block text-sm font-medium text-[#6D6D6D]"
            >
              Description
            </label>
            <textarea
              name="sowingPeriod"
              id="description"
              rows={4}
              placeholder="Type Here"
              value={formData.sowingPeriod}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-[#6D6D6D] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className=" w-full  p-5 w-full bg-[white]  my-5 rounded-lg">
            <h4 className="font-[600] text-[17px] text-[#222B45] mb-5">
              Sun Exposure
            </h4>

            <label
              htmlFor="description"
              className="block text-sm font-medium text-[#6D6D6D]"
            >
              Description
            </label>
            <textarea
              name="sunExposure"
              id="description"
              rows={4}
              placeholder="Type Here"
              value={formData.sunExposure}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-[#6D6D6D] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className=" w-full  p-5 w-full bg-[white]  my-5 rounded-lg">
            <h4 className="font-[600] text-[17px] text-[#222B45] mb-5">
              Harvest Time
            </h4>

            <label
              htmlFor="description"
              className="block text-sm font-medium text-[#6D6D6D]"
            >
              Description
            </label>
            <textarea
              name="harvestTime"
              id="description"
              rows={4}
              placeholder="Type Here"
              value={formData.harvestTime}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-[#6D6D6D] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </form>
      </div>

      <ToastContainer />
    </>
  );
};

const SectionTitle = ({ children }) => (
  <div className="bg-[#797979] text-[white] text-center text-lg px-4 py-2 my-10">
    {children}
  </div>
);

export default AddSeedForm;
