import React, { useEffect, useState } from "react";
import { Feature, SectionTitle } from "../vehicle/VehicleDetailComponent";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const VehicleAcessoryDetailsComponent = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [accessoryDetails, setAccessoryDetails] = useState({
    mainFeatures: {
      name: "",
      material: "",
      weight: 0,
      length: 0,
      width: 0,
    },
    image: "",
    installation: "",
    functionalDescription: "",
  });

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = async () => {
    let imageUrl = accessoryDetails.image; // Default to the current image URL

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
      image: imageUrl,
      ...accessoryDetails.mainFeatures,
      installation: accessoryDetails.installation,
      functionalDescription: accessoryDetails.functionalDescription,
    };

    try {
      const response = await axios.patch(
        `https://api.agerlink.it/api/v1/vehicleAccessories/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product updated successfully:", response.data);
      setIsEditing(false);
      toast.success("Acesory updated successfully.");
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response ? error.response.data : error.message
      );
      toast.error("Error updating product.");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setAccessoryDetails((prevData) => ({
        ...prevData,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAccessoryDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchAcessory = async () => {
    try {
      const response = await axios.get(`${baseURL}/vehicleAccessories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      setAccessoryDetails({
        mainFeatures: {
          name: response.data.data.name,
          material: response.data.data.material,
          weight: response.data.data.weight,
          length: response.data.data.length,
          width: response.data.data.width,
        },
        installation: response.data.data.installation,
        functionalDescription: response.data.data.functionalDescription,
        image: response.data.data.image,
      });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchAcessory();
  }, []);

  return (
    <>
      <div className="w-full flex justify-between items-center pt-5">
        <h2 className="text-[#039443] font-[700] text-[27px]">
          Accessory Details
        </h2>

        <Link
          to={`/vehicleAccessories/editAccessory/${id}`}
          className="bg-primary text-[white] px-3 py-1 text-[14px] font-[700] rounded"
        >
          <p className="p-2">Edit Information</p>
        </Link>
      </div>
      <div className="">
        <div className="">
          <div>
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
                      {accessoryDetails.mainFeatures?.name}
                    </span>
                  </div>

                  <div className={`grid grid-cols-2 px-4 py-3 font-[600]`}>
                    <span
                      className={`col-span-1 text-gray-600 capitalize pr-[6rem]`}
                    >
                      Material:{" "}
                    </span>
                    <span className="col-span-1 text-[#858992]">
                      {accessoryDetails.mainFeatures?.material}{" "}
                    </span>
                  </div>

                  <div className={`grid grid-cols-2 px-4 py-3 font-[600]`}>
                    <span
                      className={`col-span-1 text-gray-600 capitalize pr-[6rem]`}
                    >
                      Length:{" "}
                    </span>
                    <span className="col-span-1 text-[#858992]">
                      {accessoryDetails.mainFeatures?.length}{" "}
                    </span>
                  </div>

                  <div className={`grid grid-cols-2 px-4 py-3 font-[600]`}>
                    <span
                      className={`col-span-1 text-gray-600 capitalize pr-[6rem]`}
                    >
                      weight:{" "}
                    </span>
                    <span className="col-span-1 text-[#858992]">
                      {accessoryDetails.mainFeatures?.weight}{" "}
                    </span>
                  </div>

                  <div className={`grid grid-cols-2 px-4 py-3 font-[600]`}>
                    <span
                      className={`col-span-1 text-gray-600 capitalize pr-[6rem]`}
                    >
                      Width:{" "}
                    </span>
                    <span className="col-span-1 text-[#858992]">
                      {accessoryDetails.mainFeatures?.width}{" "}
                    </span>
                  </div>
                </div>
                {/* <div className="flex justify-center items-center flex-col"> */}
                <div className="w-[300px] h-[300px] relative">
                  <img
                    src={accessoryDetails?.image}
                    alt={accessoryDetails.mainFeatures?.name}
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
          </div>

          <div className="  w-full bg-[white] border  border-[#E6E6E6] my-5 rounded-lg">
            <div className="border-b  border-[#E6E6E6] p-5">
              <h4 className="font-[600] text-[18px] text-primary ">
                Installation
              </h4>
            </div>
            <div className=" p-5">
              <p className="font-[600] mb-3">Description</p>
              <p className="text-[#858992]">{accessoryDetails?.installation}</p>
            </div>
          </div>

          <div className="  w-full bg-[white] border  border-[#E6E6E6] my-5 rounded-lg">
            <div className="border-b  border-[#E6E6E6] p-5">
              <h4 className="font-[600] text-[18px] text-primary ">
                Functional Description
              </h4>
            </div>
            <div className=" p-5">
              <p className="font-[600] mb-3">Description</p>
              <p className="text-[#858992]">
                {accessoryDetails?.functionalDescription}
              </p>
            </div>
          </div>

          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default VehicleAcessoryDetailsComponent;
