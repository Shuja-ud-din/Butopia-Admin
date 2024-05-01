import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlantDetailComponent = () => {
  const [plantData, setPlantData] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(
          "https://api.agerlink.it/api/v1/product",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const plantResponse = await axios.get(
          `https://api.agerlink.it/api/v1/plant/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const plantCategoryResponse = await axios.get(
          "https://api.agerlink.it/api/v1/category?type=plant",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("plant category response", plantCategoryResponse);
        setProducts(productResponse.data.data);
        setPlantData(plantResponse.data.data);
        setCategories(plantCategoryResponse?.data?.data);
        setSelectedProducts(
          plantResponse.data.data.products.map((product) => product._id)
        );
      } catch (error) {
        toast.error("Failed to fetch plant or product data.");
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, [id, token]);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPlantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setPlantData((prevData) => ({
        ...prevData,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSave = async () => {
    if (!plantData) {
      console.error("No plant details to save.");
      toast.error("No plant details to save.");
      return;
    }

    let imageUrl = plantData.image; // Default to the current image URL

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const uploadResponse = await axios.post(
          "https://api.agerlink.it/api/v1/common/uploadImage",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (uploadResponse.data.data) {
          imageUrl = uploadResponse.data.data; // Update the image URL with the uploaded image URL
          toast.success("Image uploaded successfully.");
        }
      } catch (error) {
        console.error(
          "Error uploading image",
          error.response ? error.response.data : error.message
        );
        toast.error("Error uploading image.");
        return; // Stop the save process if image upload fails
      }
    }

    const payload = {
      ...plantData,
      image: imageUrl,
    };

    try {
      const response = await axios.patch(
        `https://api.agerlink.it/api/v1/plant/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Plant updated successfully:", response.data);
      setIsEditing(false);
      toast.success("Plant updated successfully.");
    } catch (error) {
      console.error(
        "Error updating plant:",
        error.response ? error.response.data : error.message
      );
      toast.error("Error updating plant.");
    }
  };

  const handleProductChange = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  return (
    <>
      <div className="w-full flex justify-between items-center pt-5">
        <h2 className="text-[#039443] font-[700] text-[27px]">Plant Details</h2>

        <Link
          to={`/plants/editPlant/${id}`}
          className="bg-primary text-[white] px-3 py-1 text-[14px] font-[700] rounded"
        >
          <p className="p-2">Edit Information</p>
        </Link>
      </div>
      <div className="">
        <div className="">
          <div className="  w-full bg-[white] border  border-[#E6E6E6] my-5 rounded-lg">
            <div className="border-b  border-[#E6E6E6] p-5">
              <h4 className="font-[600] text-[18px] text-primary ">
                Main Features
              </h4>
            </div>
            <div className="flex justify-between  p-5">
              <div className="">
                <div className={`grid grid-cols-2 px-4 py-3 font-[600]`}>
                  <span
                    className={`col-span-1 text-gray-600 capitalize pr-[6rem]`}
                  >
                    Name:
                  </span>
                  <span className="col-span-1 text-[#858992]">
                    {plantData?.name}
                  </span>
                </div>

                <div className={`grid grid-cols-2 px-4 py-3 font-[600]`}>
                  <span
                    className={`col-span-1 text-gray-600 capitalize pr-[6rem]`}
                  >
                    Scientific Name:{" "}
                  </span>
                  <span className="col-span-1 text-[#858992]">
                    {plantData?.scientificName}{" "}
                  </span>
                </div>

                <div className={`grid grid-cols-2 px-4 py-3 font-[600]`}>
                  <span
                    className={`col-span-1 text-gray-600 capitalize pr-[6rem]`}
                  >
                    Category:{" "}
                  </span>
                  <span className="col-span-1 text-[#858992]">
                    {plantData?.category?.title}{" "}
                  </span>
                </div>

                <div className={`grid grid-cols-2 px-4 py-3 font-[600]`}>
                  <span
                    className={`col-span-1 text-gray-600 capitalize pr-[6rem]`}
                  >
                    Planting Period:{" "}
                  </span>
                  <span className="col-span-1 text-[#858992]">
                    {plantData?.plantingPeriod}{" "}
                  </span>
                </div>

                <div className={`grid grid-cols-2 px-4 py-3 font-[600]`}>
                  <span
                    className={`col-span-1 text-gray-600 capitalize pr-[6rem]`}
                  >
                    Harvesting Period:{" "}
                  </span>
                  <span className="col-span-1 text-[#858992]">
                    {plantData?.harvestingPeriod}{" "}
                  </span>
                </div>
              </div>
              {/* <div className="flex justify-center items-center flex-col"> */}
              <div className="w-[300px] h-[300px] relative">
                <img
                  src={plantData?.image}
                  alt={plantData?.name}
                  className="w-[300px] h-[300px] object-cover rounded-md"
                />
                {isEditing && (
                  <label className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 cursor-pointer">
                    <span className="text-white text-lg">Change Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              {/* </div> */}
            </div>
          </div>

          <div className="  w-full bg-[white] border  border-[#E6E6E6] my-5 rounded-lg">
            <div className="border-b  border-[#E6E6E6] p-5">
              <h4 className="font-[600] text-[18px] text-primary ">
                Description
              </h4>
            </div>
            <div className=" p-5">
              <p className="font-[600] mb-3">Description</p>
              <p className="text-[#858992]">{plantData?.description}</p>
            </div>
          </div>

          <div className="  w-full bg-[white] border  border-[#E6E6E6] my-5 rounded-lg">
            <div className="border-b  border-[#E6E6E6] p-5">
              <h4 className="font-[600] text-[18px] text-primary ">
                Growth Requirements
              </h4>
            </div>
            <div className=" p-5">
              <p className="font-[600] mb-3">Description</p>
              <p className="text-[#858992]">{plantData?.growthRequirements}</p>
            </div>
          </div>

          <div className="  w-full bg-[white] border  border-[#E6E6E6] my-5 rounded-lg">
            <div className="border-b  border-[#E6E6E6] p-5">
              <h4 className="font-[600] text-[18px] text-primary ">
                Compatible Products
              </h4>
            </div>
            <div className="flex flex-wrap gap-4 p-5">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="px-[16px] py-[6px] border border-[#979797] cursor-pointer rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-[14px] font-[600] text-[#979797]">
                    {product.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default PlantDetailComponent;
