import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormField, SectionTitle } from "../vehicle/AddVehicleComponent";

const token = localStorage.getItem("token");

const AddPlantComponent = () => {
  const mainFeaturesFields = [
    "name",
    "scientificName",
    "plantingPeriod",
    "harvestingPeriod",
  ];

  const [formData, setFormData] = useState({
    name: "",
    scientificName: "",
    category: "",
    plantingPeriod: "",
    harvestingPeriod: "",
    description: "",
    growthRequirements: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "https://api.agerlink.it/api/v1/product",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProducts(data.data);
      } catch (error) {
        toast.error("Failed to load products.");
        console.error("Error loading products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "https://api.agerlink.it/api/v1/category?type=plant",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(data.data);
      } catch (error) {
        toast.error("Failed to load categories.");
        console.error("Error loading categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleInputChange = (event) => {
    console.log("enter");
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log("form data", formData);

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

  const handleProductChange = (productId) => {
    setSelectedProducts((prevSelected) => {
      return prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId];
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jsonFormData = {
      ...formData,
      products: selectedProducts,
      // image: imagePreview,
    };

    try {
      const response = await axios.post(
        "https://api.agerlink.it/api/v1/plant",
        jsonFormData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Plant added successfully!");
    } catch (error) {
      toast.error("Failed to add plant.");
      console.error(
        "Error adding plant:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <>
      <div className="w-full flex justify-between items-center pt-5">
        <h2 className="text-[#039443] font-[700] text-[27px]">Add Plant</h2>

        <button
          className="bg-primary text-[white] px-3 py-1 text-[14px] font-[700] rounded"
          onClick={handleSubmit}
        >
          <p className="p-2">Save Plant Information</p>
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
              Description
            </h4>

            <label
              htmlFor="description"
              className="block text-sm font-medium text-[#6D6D6D]"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-[#6D6D6D] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className=" w-full  p-5 w-full bg-[white]  my-5 rounded-lg">
            <h4 className="font-[600] text-[17px] text-[#222B45] mb-5">
              Growth Requirements
            </h4>
            <label
              htmlFor="growthRequirements"
              className="block text-sm font-medium text-[#6D6D6D]"
            >
              Growth Requirements
            </label>
            <textarea
              name="growthRequirements"
              id="growthRequirements"
              rows={4}
              value={formData.growthRequirements}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-[#6D6D6D] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mt-4  p-5 w-full bg-[white]  my-5 rounded-lg">
            <div className="flex justify-between mb-2">
              <h3 className="font-[600] text-[17px] text-[#222B45] mb-3">
                Compatible Products
              </h3>
              <button
                type="button"
                onClick={() => setSelectedProducts([])}
                className="text-[#6D6D6D] hover:text-indigo-900"
              >
                Clear Selection
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className={`px-[16px] py-[6px] border border-[#979797] cursor-pointer rounded-[2rem] shadow-sm hover:shadow-md transition-shadow  ${
                    selectedProducts.includes(product._id)
                      ? "bg-primary text-[white]"
                      : "text-[#979797]"
                  }`}
                  onClick={() => handleProductChange(product._id)}
                >
                  <label className="flex items-center cursor-pointer ">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => handleProductChange(product._id)}
                      className="hidden"
                    />
                    <span className="text-[14px] font-[600]">
                      {product.title}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="mt-8">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Plant
            </button>
          </div> */}
        </form>

        <ToastContainer />
      </div>
    </>
  );
};

export default AddPlantComponent;
