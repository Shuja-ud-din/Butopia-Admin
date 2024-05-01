import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ProductDetailsComponent = () => {
  const [productDetails, setProductDetails] = useState();
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
          `https://api.agerlink.it/api/v1/product/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const categoryResponse = await axios.get(
          "https://api.agerlink.it/api/v1/category?type=product",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("plant category response", categoryResponse);
        setProductDetails(productResponse.data.data);
        setCategories(categoryResponse?.data?.data);
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
    setProductDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setProductDetails((prevData) => ({
        ...prevData,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSave = async () => {
    if (!productDetails) {
      console.error("No plant details to save.");
      toast.error("No plant details to save.");
      return;
    }

    let imageUrl = productDetails.image; // Default to the current image URL

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
      ...productDetails,
      image: imageUrl,
    };

    try {
      const response = await axios.patch(
        `https://api.agerlink.it/api/v1/product/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product updated successfully:", response.data);
      setIsEditing(false);
      toast.success("Product updated successfully.");
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response ? error.response.data : error.message
      );
      toast.error("Error updating product.");
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

  console.log(productDetails);

  return (
    <>
      <div className="w-full flex justify-between items-center pt-5">
        <h2 className="text-[#039443] font-[700] text-[27px]">
          Product Details
        </h2>

        <Link
          to={`/products/editProduct/${id}`}
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
                    {productDetails?.title}
                  </span>
                </div>

                <div className={`grid grid-cols-2 px-4 py-3 font-[600]`}>
                  <span
                    className={`col-span-1 text-gray-600 capitalize pr-[6rem]`}
                  >
                    Caution:{" "}
                  </span>
                  <span className="col-span-1 text-[#858992]">
                    {productDetails?.caution}{" "}
                  </span>
                </div>

                <div className={`grid grid-cols-2 px-4 py-3 font-[600]`}>
                  <span
                    className={`col-span-1 text-gray-600 capitalize pr-[6rem]`}
                  >
                    Category:{" "}
                  </span>
                  <span className="col-span-1 text-[#858992]">
                    {
                      categories.filter(
                        (category) => category._id === productDetails.category
                      )[0]?.title
                    }
                  </span>
                </div>
              </div>
              {/* <div className="flex justify-center items-center flex-col"> */}
              <div className="w-[300px] h-[300px] relative">
                <img
                  src={productDetails?.image}
                  alt={productDetails?.name}
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
              <p className="text-[#858992]">{productDetails?.descritption}</p>
            </div>
          </div>

          <div className="  w-full bg-[white] border  border-[#E6E6E6] my-5 rounded-lg">
            <div className="border-b  border-[#E6E6E6] p-5">
              <h4 className="font-[600] text-[18px] text-primary ">
                Application Method
              </h4>
            </div>
            <div className=" p-5">
              <p className="font-[600] mb-3">Description</p>
              <p className="text-[#858992]">
                {productDetails?.applicationMethod}
              </p>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ProductDetailsComponent;
