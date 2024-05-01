import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Feature, SectionTitle } from "../vehicle/VehicleDetailComponent";

const SeedDetailsComponent = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const mainFeatures = [
    "name",
    "scientificName",
    "climateZone",
    "sowingPeriod",
    "sunExposure",
    "harvestTime",
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [catagories, setCatagories] = useState([]);
  const [seedDetails, setSeedDetails] = useState({
    name: "",
    scientificName: "",
    climateZone: "",
    sowingPeriod: "",
    sunExposure: "",
    harvestTime: "",
    image: "",
    category: "",
  });

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = async () => {
    let imageUrl = seedDetails.image; // Default to the current image URL

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
      ...seedDetails,
      category: seedDetails.category._id,
    };

    try {
      const response = await axios.patch(
        `https://api.agerlink.it/api/v1/seed/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Seed updated successfully:", response.data);
      setIsEditing(false);
      toast.success("Seed updated successfully.");
      setTimeout(() => {
        navigate("/seeds");
      }, 3000);
    } catch (error) {
      console.error(
        "Error updating Seed:",
        error.response ? error.response.data : error.message
      );
      toast.error("Error updating Seed.");
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setSeedDetails((prevData) => ({
        ...prevData,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSeedDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchSeedDetails = async () => {
    try {
      const response = await axios.get(`${baseURL}/seed/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSeedDetails({
        ...response.data.data,
        category: response.data.data.category,
      });
    } catch (e) {}
  };

  useEffect(() => {
    fetchSeedDetails();
    fetchCatagories();
  }, []);

  console.log(seedDetails);

  return (
    <>
      <div className="w-full flex justify-between items-center pt-5">
        <h2 className="text-[#039443] font-[700] text-[27px]">Seed Details</h2>

        <Link
          to={`/seeds/editSeed/${id}`}
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
                    {seedDetails?.name}
                  </span>
                </div>

                <div className={`grid grid-cols-2 px-4 py-3 font-[600]`}>
                  <span
                    className={`col-span-1 text-gray-600 capitalize pr-[6rem]`}
                  >
                    Scientific Name:{" "}
                  </span>
                  <span className="col-span-1 text-[#858992]">
                    {seedDetails?.scientificName}{" "}
                  </span>
                </div>

                <div className={`grid grid-cols-2 px-4 py-3 font-[600]`}>
                  <span
                    className={`col-span-1 text-gray-600 capitalize pr-[6rem]`}
                  >
                    Category:{" "}
                  </span>
                  <span className="col-span-1 text-[#858992]">
                    {seedDetails?.category?.title}{" "}
                  </span>
                </div>
              </div>
              {/* <div className="flex justify-center items-center flex-col"> */}
              <div className="w-[300px] h-[300px] relative">
                <img
                  src={seedDetails?.image}
                  alt={seedDetails?.name}
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
                Climate Zone
              </h4>
            </div>
            <div className=" p-5">
              <p className="font-[600] mb-3">Description</p>
              <p className="text-[#858992]">{seedDetails?.climateZone}</p>
            </div>
          </div>

          <div className="  w-full bg-[white] border  border-[#E6E6E6] my-5 rounded-lg">
            <div className="border-b  border-[#E6E6E6] p-5">
              <h4 className="font-[600] text-[18px] text-primary ">
                Sowing Period
              </h4>
            </div>
            <div className=" p-5">
              <p className="font-[600] mb-3">Description</p>
              <p className="text-[#858992]">{seedDetails?.sowingPeriod}</p>
            </div>
          </div>

          <div className="  w-full bg-[white] border  border-[#E6E6E6] my-5 rounded-lg">
            <div className="border-b  border-[#E6E6E6] p-5">
              <h4 className="font-[600] text-[18px] text-primary ">
                Sun Exposure
              </h4>
            </div>
            <div className=" p-5">
              <p className="font-[600] mb-3">Description</p>
              <p className="text-[#858992]">{seedDetails?.sunExposure}</p>
            </div>
          </div>

          <div className="  w-full bg-[white] border  border-[#E6E6E6] my-5 rounded-lg">
            <div className="border-b  border-[#E6E6E6] p-5">
              <h4 className="font-[600] text-[18px] text-primary ">
                Harvest Time
              </h4>
            </div>
            <div className=" p-5">
              <p className="font-[600] mb-3">Description</p>
              <p className="text-[#858992]">{seedDetails?.harvestTime}</p>
            </div>
          </div>

          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default SeedDetailsComponent;
