import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const EditProductForm = () => {
  const token = localStorage.getItem("token");
  const baseURL = import.meta.env.VITE_BASE_URL;

  const { id } = useParams();

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

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(baseURL + `/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFormData(response.data.data);
      setImagePreview(response.data.data.image);
    } catch (error) {
      console.error("Error in product details", error.response);
    }
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
      const response = await axios.patch(
        `https://api.agerlink.it/api/v1/product/${id}`,
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
        "Error updating Product",
        error.response ? error.response : error
      );
    }

    // console.log("Form submitted", jsonFormData);
  };

  useEffect(() => {
    fetchCatagories();
    fetchProductDetails();
  }, []);

  const renderSection = (title, fields) => {
    return (
      <>
        <SectionTitle>{title}</SectionTitle>
        {fields.map((field, index) => (
          <div
            key={field}
            className={`grid grid-cols-2 justify-between mb-4 ${
              index % 2 ? "bg-secondary" : "bg-white"
            }`}
          >
            <label htmlFor={field} className="mb-2 capitalize">
              {field.split(/(?=[A-Z])/).join(" ")}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              className="border-2 border-[#E5E5E5] rounded p-2"
              placeholder="Enter value"
            />
          </div>
        ))}
      </>
    );
  };

  const SectionTitle = ({ children }) => (
    <div className="bg-[#797979] text-[white] text-center text-lg px-4 py-2 my-10">
      {children}
    </div>
  );

  // Define the fields for each section
  const mainFeaturesFields = ["title", "caution"];

  return (
    <>
      <div className="w-full flex justify-between items-center pt-5">
        <h2 className="text-[#039443] font-[700] text-[27px]">Edit Product</h2>

        <button
          className="bg-primary text-[white] px-3 py-1 text-[14px] font-[700] rounded"
          onClick={handleSubmit}
        >
          <p className="p-2">Save Product Information</p>
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
                  value={formData.category}
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
        </form>
      </div>
    </>
  );
};

const FormField = ({ name, value, handleChange, index }) => (
  <div
    className={`grid grid-cols-2 justify-between mb-4 ${
      index % 2 ? "bg-gray-100" : "bg-white"
    }`}
  >
    <label htmlFor={name} className="mb-2 capitalize">
      {name.split(/(?=[A-Z])/).join(" ")}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      className="border-2 border-[#E5E5E5] rounded p-2"
      placeholder={`Enter ${name
        .split(/(?=[A-Z])/)
        .join(" ")
        .toLowerCase()}`}
    />
  </div>
);

export default EditProductForm;
