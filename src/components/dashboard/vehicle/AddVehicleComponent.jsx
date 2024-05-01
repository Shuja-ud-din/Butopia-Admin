import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SectionTitle = ({ children }) => (
  <div className="bg-[#797979] text-[white] text-center text-lg px-4 py-2 my-10 font-[700]">
    {children}
  </div>
);

const AddVehicleComponent = () => {
  const token = localStorage.getItem("token");
  const initialFormState = {
    image: "",
    name: "",
    brand: "",
    vehicleModel: "",
    vehicleType: "",
    yearOfManufacture: 0,
    power: 0,
    powerUnit: "horsepower",
    engineDisplacement: 0,
    nominalSpeed: 0,
    maximumTorque: 0,
    maxTorqueSpeed: "",
    engineBrand: "",
    engineType: "",
    engineManufacturer: "",
    engineCylinder: 0,
    engineFuelType: "",
    emissionLevel: "",
    injectionRegulation: "",
    injectionPump: "",
    torqueReserve: 0,
    frontTireSize: 0,
    rearTireSize: 0,
    fuelCapacity: 0,
    numberOfRanges: 0,
    numberOfGears: 0,
    numberOfForwardGears: 0,
    numberOfReverseGears: 0,
    steeringType: "",
    // Add more fields as necessary
  };

  const [formData, setFormData] = useState(initialFormState);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [selectedAccessories, setSelectedAccessories] = useState([]);
  const [accessories, setAccessories] = useState([]);

  const handleInputChange = (event) => {
    let { name, value } = event.target;

    // Fields that should be stored as integers
    const integerFields = [
      "yearOfManufacture",
      "power",
      "engineDisplacement",
      "nominalSpeed",
      "maximumTorque",
      "engineCylinder",
      "torqueReserve",
      "frontTireSize",
      "rearTireSize",
      "fuelCapacity",
      "numberOfRanges",
      "numberOfGears",
      "numberOfForwardGears",
      "numberOfReverseGears",
      // add other integer fields here
    ];

    if (integerFields.includes(name)) {
      // Convert value to an integer, if it's not empty
      value = value ? parseInt(value, 10) : "";
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
        console.error(
          "Error uploading image",
          error.response ? error.response.data : error.message
        );
        toast.error(
          error.response?.data?.message || "An error occurred while updating"
        );
      }
    }
  };
  console.log(token);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const jsonFormData = {
      ...formData,
      accessories: selectedAccessories,
    };
    // TODO: Replace with your API endpoint and configuration.
    console.log(jsonFormData);
    try {
      const response = await axios.post(
        `https://api.agerlink.it/api/v1/vehicle`,
        jsonFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.data) {
        toast.success("Vehicle added successfully");
      }

      // console.log("add vehicle", response);
    } catch (error) {
      console.error(
        "Error adding vehicle",
        error.response ? error.response : error
      );
      toast.error(
        error.response?.data?.message || "An error occurred while updating"
      );
    }

    // console.log("Form submitted", jsonFormData);
  };

  const renderSection = (title, fields) => {
    return (
      <>
        <div className=" p-5 w-full bg-[white]  my-5 rounded-lg">
          <h4 className="font-[600] text-[17px] text-[#222B45] mb-3">
            {title}
          </h4>
          <div className={`grid grid-cols-4 gap-4 items-center `}>
            {fields.map((field, index) => {
              // If the field is 'power', add 'powerUnit' in the same grid area.

              const rowClasses = `mb-4 ${
                index % 2 ? "bg-gray-100" : "bg-white"
              }`;

              return (
                <React.Fragment key={field}>
                  <div className={`col-span-1 flex flex-col ${rowClasses}`}>
                    <label
                      htmlFor={field}
                      className="col-span-1 mb-2 capitalize text-[#6D6D6D]"
                    >
                      {field.split(/(?=[A-Z])/).join(" ")}
                    </label>
                    <input
                      type="text"
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="col-span-1 border-2 text-[#6D6D6D] border-[#E5E5E5] rounded-[10px] p-2"
                      placeholder="Enter value"
                    />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  // Define the fields for each section
  const mainFeaturesFields = [
    "name",
    "brand",
    "vehicleModel",
    "vehicleType",
    "yearOfManufacture",
  ];
  const motorFields = [
    "power",
    // "powerUnit",
    "engineDisplacement",
    "nominalSpeed",
    "maximumTorque",
    "maxTorqueSpeed",
    "engineBrand",
    "engineType",
    "engineManufacturer",
    "engineCylinder",
    "engineFuelType",
    "emissionLevel",
    "injectionRegulation",
    "injectionPump",
    "torqueReserve",
  ];
  const wheelsAndTiresFields = ["frontTireSize", "rearTireSize"];
  const contenancesFields = ["fuelCapacity"];
  const transmissionFields = [
    "numberOfRanges",
    "numberOfGears",
    "numberOfForwardGears",
    "numberOfReverseGears",
    "steeringType",
  ];

  const handleAccessoryChange = (accessoryId) => {
    setSelectedAccessories((prevSelected) => {
      if (prevSelected.includes(accessoryId)) {
        return prevSelected.filter((id) => id !== accessoryId);
      } else {
        return [...prevSelected, accessoryId];
      }
    });
  };

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const { data } = await axios.get(
          `https://api.agerlink.it/api/v1/vehicleAccessories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAccessories(data.data); // Store the accessories data
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchAccessories();
  }, []);

  console.log(accessories);

  return (
    <>
      <div className="w-full flex justify-between items-center pt-5">
        <h2 className="text-[#039443] font-[700] text-[27px]">Add Vehicle</h2>

        <button
          className="bg-primary text-[white] px-3 py-1 text-[14px] font-[700] rounded"
          onClick={handleSubmit}
        >
          <p className="p-2">Save Vehicle Information</p>
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

          {renderSection("Motor", motorFields)}
          {renderSection("Wheels and Tires", wheelsAndTiresFields)}
          {renderSection("Contenances", contenancesFields)}
          {renderSection("Transmission", transmissionFields)}

          <div className="mt-4  p-5 w-full bg-[white]  my-5 rounded-lg">
            <h4 className="font-[600] text-[17px] text-[#222B45] mb-3">
              Add Compantibel Accessories
            </h4>
            <div className="flex flex-wrap gap-4">
              {accessories.map((accessory) => (
                <div
                  key={accessory._id}
                  className={`px-[16px] py-[6px] border border-[#979797] cursor-pointer rounded-[2rem] shadow-sm hover:shadow-md transition-shadow  ${
                    selectedAccessories.includes(accessory._id)
                      ? "bg-primary text-[white]"
                      : "text-[#979797]"
                  }`}
                >
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAccessories.includes(accessory._id)}
                      onChange={() => handleAccessoryChange(accessory._id)}
                      className="hidden"
                    />
                    <span className="text-[14px] font-[600]">
                      {accessory.name}
                    </span>
                  </label>
                </div>
              ))}
            </div>

            {/* <div className="flex justify-center mt-5">
              <button
                type="button"
                onClick={changeLimit}
                className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <p className="text-lg">See More</p>
              </button>
            </div> */}
          </div>

          {/* <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div> */}
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
    <label htmlFor={name} className="mb-2 text-[#6D6D6D] cap-first ">
      {name.split(/(?=[A-Z])/).join(" ")}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      className="border-2 border-[#E5E5E5] rounded-[10px] p-2"
      placeholder={`Enter ${name
        .split(/(?=[A-Z])/)
        .join(" ")
        .toLowerCase()}`}
    />

    <ToastContainer />
  </div>
);

export default AddVehicleComponent;
export { FormField, SectionTitle };
