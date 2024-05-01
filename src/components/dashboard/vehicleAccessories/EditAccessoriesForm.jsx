import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FormField } from "../vehicle/AddVehicleComponent";
import { useNavigate, useParams } from "react-router-dom";

const mainFeaturesFields = ["name", "material", "weight", "length", "width"];

const EditAccessoriesForm = () => {
  const token = localStorage.getItem("token");
  const baseURL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    material: "",
    weight: 0,
    length: 0,
    width: 0,
    functionalDescription: "",
    installation: "",
  });
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

  const handleInputChange = (e) => {
    const { value } = e.target;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const fetchAccessoryDetails = async () => {
    try {
      const response = await axios.get(`${baseURL}/vehicleAccessories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setImagePreview(response.data.data.image);
      setFormData(response.data.data);
    } catch (e) {
      console.error("Error in fetching acessory", e.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios
        .patch(
          baseURL + `/vehicleAccessories/${id}`,
          {
            image: formData.image,
            name: formData.name,
            material: formData.material,
            weight: parseInt(formData.weight),
            length: parseInt(formData.length),
            width: parseInt(formData.width),
            installation: formData.installation,
            functionalDescription: formData.functionalDescription,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          navigate("/vehicleAccessories");
        });
    } catch (e) {
      console.error("Error in updating accessory", e.response);
      toast.error("Error in updating accessory");
    }
  };

  useEffect(() => {
    fetchAccessoryDetails();
  }, []);

  return (
    <>
      <div className="w-full flex justify-between items-center pt-5">
        <h2 className="text-[#039443] font-[700] text-[27px]">
          Edit Accessory
        </h2>

        <button
          className="bg-primary text-[white] px-3 py-1 text-[14px] font-[700] rounded"
          onClick={handleSubmit}
        >
          <p className="p-2">Save Accessory Information</p>
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
              Installation
            </h4>

            <label
              htmlFor="description"
              className="block text-sm font-medium text-[#6D6D6D]"
            >
              Description
            </label>
            <textarea
              name="installation"
              id="description"
              rows={4}
              value={formData.installation}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-[#6D6D6D] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className=" w-full  p-5 w-full bg-[white]  my-5 rounded-lg">
            <h4 className="font-[600] text-[17px] text-[#222B45] mb-5">
              Functional Description
            </h4>

            <label
              htmlFor="description"
              className="block text-sm font-medium text-[#6D6D6D]"
            >
              Description
            </label>
            <textarea
              name="functionalDescription"
              id="description"
              rows={4}
              value={formData.functionalDescription}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-[#6D6D6D] rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </form>
      </div>
    </>
  );
};

const SectionTitle = ({ children }) => (
  <div className="bg-[#797979] text-[white] text-center text-lg px-4 py-2 my-10">
    {children}
  </div>
);

export default EditAccessoriesForm;
