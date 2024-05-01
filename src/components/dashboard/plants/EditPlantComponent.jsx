import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FormField } from "../vehicle/AddVehicleComponent";

const EditPlantComponent = () => {
  const token = localStorage.getItem("token");
  const baseURL = import.meta.env.VITE_BASE_URL;

  const { id } = useParams();

  const navigate = useNavigate();
  const mainFeaturesFields = [
    "name",
    "scientificName",
    "plantingPeriod",
    "harvestingPeriod",
  ];

  const initialFormState = {
    name: "",
    scientificName: "",
    category: "",
    plantingPeriod: "",
    harvestingPeriod: "",
    growthRequirements: "",
    description: "",
    products: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formValidation, setFormValidation] = useState({
    catagory: false,
    image: false,
  });
  const [products, setProducts] = useState([]);
  const [catageories, setCatageories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleProductChange = (productId) => {
    setSelectedProducts((prevSelected) => {
      return prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId];
    });
  };

  const SectionTitle = ({ children }) => (
    <div className="bg-[#797979] text-[white] text-center text-lg px-4 py-2 my-10">
      {children}
    </div>
  );

  const getPlantDetails = async () => {
    try {
      const response = await axios.get(`${baseURL}/plant/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      setFormData(response.data.data);
      setSelectedProducts(
        response.data.data.products.map((product) => product._id)
      );
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!isFormValid()) {
    //   return;
    // }

    console.log(formData);
    // TODO: Replace with your API endpoint and configuration.
    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `https://api.agerlink.it/api/v1/plant/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/plants");
      // console.log("add vehicle", response);
    } catch (error) {
      console.error(
        "Error Updating Plant",
        error.response ? error.response : error
      );
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchCatagories = async () => {
    await axios
      .get(baseURL + "/category", {
        params: {
          type: "plant",
        },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setCatageories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  useEffect(() => {
    fetchCatagories();
    getPlantDetails();
    fetchProducts();
  }, []);

  console.log(selectedProducts);
  // Define the fields for each section

  return (
    <>
      <div className="w-full flex justify-between items-center pt-5">
        <h2 className="text-[#039443] font-[700] text-[27px]">Edit Plant</h2>

        <button
          className="bg-primary text-[white] px-3 py-1 text-[14px] font-[700] rounded"
          onClick={handleSubmit}
        >
          <p className="p-2">Save Plant Information</p>
        </button>
      </div>
      <div className="">
        <form onSubmit={handleSubmit} className="">
          <div className="flex  gap-28 p-5 w-full bg-[white]  my-5 rounded-lg">
            <div className="w-full">
              <h4 className="font-[600] text-[17px] text-[#222B45] mb-3">
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

              <div className={`grid grid-cols-2 justify-between mb-4`}>
                <label className="mb-2 text-[#6D6D6D] cap-first ">
                  Category
                </label>
                <select
                  className="border-2 border-[#E5E5E5] rounded-[10px] p-2"
                  value={formData.category._id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="">Select Catagory</option>
                  {catageories.map((catagory) => (
                    <option value={catagory._id}>{catagory.title}</option>
                  ))}
                </select>

                <ToastContainer />
              </div>
            </div>
            <div className="flex justify-center items-center flex-col">
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="w-[350px] h-[300px]  flex justify-center items-center border-2 border-[#E5E5E5] rounded-[12px] overflow-hidden">
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
          <ToastContainer />

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
              htmlFor="description"
              className="block text-sm font-medium text-[#6D6D6D]"
            >
              Description
            </label>
            <textarea
              name="growthRequirements"
              id="description"
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
        </form>
      </div>
    </>
  );
};

export default EditPlantComponent;
