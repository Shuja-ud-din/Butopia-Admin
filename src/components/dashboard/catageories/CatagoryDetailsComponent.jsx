import React, { useEffect, useState } from "react";
import { Feature, SectionTitle } from "../vehicle/VehicleDetailComponent";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CatagoryDetailsComponent = () => {
  const label = useLocation().pathname.split("/")[1];

  const baseURL = import.meta.env.VITE_BASE_URL;
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [categoryDetails, setCatagoryDetails] = useState({
    mainFeatures: {
      title: "",
    },
    image: "",
    description: "",
    type: "",
  });
  const [isEditing, setIsEditing] = useState(
    label === "editcategories" ? true : false
  );
  const [imageFile, setImageFile] = useState(null);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", categoryDetails.mainFeatures.title);
      formData.append("description", categoryDetails.description);
      formData.append("type", categoryDetails.type);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await axios.patch(
        `${baseURL}/category/${id}`,
        {
          title: categoryDetails.mainFeatures.title,
          description: categoryDetails.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setIsEditing(false);
        toast.success("Category updated successfully");
      }
    } catch (error) {
      console.error("Error updating category:", error.response);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setCatagoryDetails((prevDetails) => ({
        ...prevDetails,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const fetchCatagory = async () => {
    try {
      const response = await axios.get(`${baseURL}/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      setCatagoryDetails({
        mainFeatures: {
          title: response.data.data.title,
        },
        description: response.data.data.description,
        type: response.data.data.type,
        image: response.data.data.image,
      });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCatagory();
  }, []);

  console.log(categoryDetails);

  return (
    <>
      <div className="w-full flex justify-between items-center pt-5">
        <h2 className="text-[#039443] font-[700] text-[27px]">
          Catagory Details
        </h2>

        <Link
          to={`/catageories/editCatageory/${id}`}
          className="bg-primary text-[white] px-3 py-1 text-[14px] font-[700] rounded"
        >
          <p className="p-2">Edit Catagory Information</p>
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
                      Title:
                    </span>
                    <span className="col-span-1 text-[#858992]">
                      {categoryDetails?.mainFeatures.title}
                    </span>
                  </div>

                  <div className={`grid grid-cols-2 px-4 py-3 font-[600]`}>
                    <span
                      className={`col-span-1 text-gray-600 capitalize pr-[6rem]`}
                    >
                      Type:{" "}
                    </span>
                    <span className="col-span-1 text-[#858992]">
                      {categoryDetails?.type}{" "}
                    </span>
                  </div>
                </div>

                <div className="w-[300px] h-[300px] relative">
                  <img
                    src={categoryDetails?.image}
                    alt={categoryDetails?.name}
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
                <p className="text-[#858992]">{categoryDetails?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatagoryDetailsComponent;
