import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FormField } from "../vehicle/AddVehicleComponent";

const AddProductComponent = () => {
  const token = localStorage.getItem("token");
  const baseURL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const initialFormState = {
    image: "",
    title: "",
    descritption: "",
    category: "",
    caution: "",
    applicationMethod: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formValidation, setFormValidation] = useState({
    catagory: false,
    image: false,
  });
  const [catageories, setCatageories] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [addingProduct, setAddingProduct] = useState(false);

  const isFormValid = () => {
    const errors = {};

    if (formData.image === "" || formData.image === undefined) {
      errors.image = true;
    }
    if (formData.category === "") {
      errors.catagory = true;
    }
    console.log(formData.image);
    console.log(errors);

    setFormValidation(errors);

    return Object.keys(errors).length === 0;
  };

  const fetchCatagories = async () => {
    await axios
      .get(baseURL + "/category", {
        params: {
          type: "product",
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

  const handleAddProduct = () => {
    setAddingProduct(true);
  };

  const handleSaveProduct = () => {
    if (newProductName.trim()) {
      setProducts([...products, newProductName]);
      setNewProductName("");
      setAddingProduct(false);
    }
  };

  const handleCancel = () => {
    setNewProductName("");
    setAddingProduct(false);
  };

  const removeProduct = (index) => {
    const newProducts = products.filter((_, prodIndex) => index !== prodIndex);
    setProducts(newProducts);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    // TODO: Replace with your API endpoint and configuration.
    const token = localStorage.getItem("token");

    console.log(formData);
    try {
      const response = await axios.post(
        `https://api.agerlink.it/api/v1/product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/products");
      // console.log("add vehicle", response);
    } catch (error) {
      console.error(
        "Error adding vehicle",
        error.response ? error.response : error
      );
    }

    // console.log("Form submitted", jsonFormData);
  };

  useEffect(() => {
    fetchCatagories();
  }, []);

  const SectionTitle = ({ children }) => (
    <div className="bg-[#797979] text-[white] text-center text-lg px-4 py-2 my-10">
      {children}
    </div>
  );

  // Define the fields for each section
  const mainFeaturesFields = ["title", "caution", "applicationMethod"];

  return (
    <>
      <div className="w-full flex justify-between items-center pt-5">
        <h2 className="text-[#039443] font-[700] text-[27px]">Add Product</h2>

        <button
          className="bg-primary text-[white] px-3 py-1 text-[14px] font-[700] rounded"
          onClick={handleSubmit}
        >
          <p className="p-2">Save Product Information</p>
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
                  {catageories.map((category, index) => {
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
              name="descritption"
              id="description"
              rows={4}
              value={formData.descritption}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-[#6D6D6D] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className=" w-full  p-5 w-full bg-[white]  my-5 rounded-lg">
            <h4 className="font-[600] text-[17px] text-[#222B45] mb-5">
              Application Method
            </h4>

            <label
              htmlFor="description"
              className="block text-sm font-medium text-[#6D6D6D]"
            >
              Description
            </label>
            <textarea
              name="applicationMethod"
              id="description"
              rows={4}
              value={formData.applicationMethod}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-[#6D6D6D] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* <div className="flex justify-end mt-[1rem]">
            <button
              type="submit"
              className="bg-primary hover:bg-blue-700 text-[white] font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div> */}
        </form>
      </div>
    </>
  );
};

export default AddProductComponent;
