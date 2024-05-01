import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VehicleDetailsComponent = () => {
  const [vehicleDetails, setVehicleDetails] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editingAccessories, setEditingAccessories] = useState(false);
  const [selectedAccessories, setSelectedAccessories] = useState([]);
  const [allAccessories, setAllAccessories] = useState([]);
  const [accessories, setAccessories] = useState([]);

  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [imageFile, setImageFile] = useState(null);

  const [limit, setLimit] = useState(10);

  const changeLimit = () => {
    setLimit(limit + 10);
  };

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const { data } = await axios.get(
          `https://api.agerlink.it/api/v1/vehicleAccessories?limit=${limit}`,
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
  }, [limit]);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.agerlink.it/api/v1/vehicle/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.data;
        setVehicleDetails({
          mainFeatures: {
            name: data.name,
            brand: data.brand,
            model: data.vehicleModel,
            vehicleType: data.vehicleType,
            year: data.yearOfManufacture,
          },
          motor: {
            power: data.power,
            powerUnit: data.powerUnit,
            engineDisplacement: data.engineDisplacement,
            nominalSpeed: data.nominalSpeed,
            maximumTorque: data.maximumTorque,
            engineBrand: data.engineBrand,
            engineType: data.engineType,
            engineManufacturer: data.engineManufacturer,
            numberOfCylinders: data.engineCylinder,
            engineFuelType: data.engineFuelType,
            emissionLevel: data.emissionLevel,
            injectionRegulation: data.injectionRegulation,
            injectionPump: data.injectionPump,
            torqueReserve: data.torqueReserve,
          },
          wheelsAndTires: {
            frontTireSize: data.frontTireSize,
            rearTireSize: data.rearTireSize,
          },
          contenances: {
            fuelTankCapacity: data.fuelCapacity,
          },
          transmission: {
            numberOfRanges: data.numberOfRanges,
            numberOfGears: data.numberOfGears,
            numberOfForwardGears: data.numberofForwardGears,
            numberOfReverseGears: data.numberofReverseGears,
            steeringType: data.steeringType,
          },
          image: data.image,
          name: data.name,
          accessories: data.accessories,
        });
        setSelectedAccessories(
          data.accessories.map((accessory) => accessory._id)
        );
      } catch (error) {
        console.error("Error fetching vehicle details", error);
        toast.error("Error fetching vehicle details.");
      }
    };

    fetchVehicleDetails();
  }, [id, token]);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setVehicleDetails((prevDetails) => ({
        ...prevDetails,
        image: URL.createObjectURL(file),
      }));
    }
  };

  console.log("vehicle details", vehicleDetails);

  const handleSave = async () => {
    if (!vehicleDetails) {
      console.error("No vehicle details to save.");
      return;
    }

    let imageUrl = vehicleDetails.image;

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
          imageUrl = uploadResponse.data.data;
          toast.success("Image uploaded successfully.");
        }
      } catch (error) {
        toast.error("Error uploading image.");
        return;
      }
    }

    const payload = {
      name: vehicleDetails.name,
      vehicleModel: vehicleDetails.mainFeatures.model,
      brand: vehicleDetails.mainFeatures.brand,
      vehicleType: vehicleDetails.mainFeatures.vehicleType,
      yearOfManufacture: parseInt(vehicleDetails.mainFeatures.year, 10),
      image: imageUrl,
      power: parseInt(vehicleDetails.motor.power, 10),
      powerUnit: vehicleDetails.motor.powerUnit,
      engineDisplacement: parseInt(vehicleDetails.motor.engineDisplacement, 10),
      nominalSpeed: parseInt(vehicleDetails.motor.nominalSpeed, 10),
      maximumTorque: parseInt(vehicleDetails.motor.maximumTorque, 10),
      engineBrand: vehicleDetails.motor.engineBrand,
      engineType: vehicleDetails.motor.engineType,
      engineManufacturer: vehicleDetails.motor.engineManufacturer,
      engineCylinder: parseInt(vehicleDetails.motor.numberOfCylinders, 10),
      engineFuelType: vehicleDetails.motor.engineFuelType,
      emissionLevel: vehicleDetails.motor.emissionLevel,
      injectionRegulation: vehicleDetails.motor.injectionRegulation,
      injectionPump: vehicleDetails.motor.injectionPump,
      torqueReserve: parseInt(vehicleDetails.motor.torqueReserve, 10),
      frontTireSize: parseInt(vehicleDetails.wheelsAndTires.frontTireSize, 10),
      rearTireSize: parseInt(vehicleDetails.wheelsAndTires.rearTireSize, 10),
      fuelCapacity: parseInt(vehicleDetails.contenances.fuelTankCapacity, 10),
      numberOfRanges: parseInt(vehicleDetails.transmission.numberOfRanges, 10),
      numberOfGears: parseInt(vehicleDetails.transmission.numberOfGears, 10),
      numberofForwardGears: parseInt(
        vehicleDetails.transmission.numberOfForwardGears,
        10
      ),
      numberofReverseGears: parseInt(
        vehicleDetails.transmission.numberOfReverseGears,
        10
      ),
      steeringType: vehicleDetails.transmission.steeringType,
      accessories: selectedAccessories,
    };

    try {
      const response = await axios.patch(
        `https://api.agerlink.it/api/v1/vehicle/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditing(false);
      toast.success("Vehicle updated successfully.");

      // Update the vehicleDetails state with the new data from the response
      setVehicleDetails((prevDetails) => ({
        ...prevDetails,
        ...response.data.data,
        accessories: response.data.data.accessories.map((accId) =>
          allAccessories.find((acc) => acc._id === accId)
        ),
      }));
      setSelectedAccessories(response.data.data.accessories);
    } catch (error) {
      toast.error("Error updating vehicle.");
    }
  };

  const handleAccessoryChange = (accessoryId) => {
    setSelectedAccessories((prevSelected) => {
      if (prevSelected.includes(accessoryId)) {
        return prevSelected.filter((id) => id !== accessoryId);
      } else {
        return [...prevSelected, accessoryId];
      }
    });
  };

  if (!vehicleDetails) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  console.log(vehicleDetails);

  return (
    <>
      <div className="w-full flex justify-between items-center pt-5">
        <h2 className="text-[#039443] font-[700] text-[27px]">
          Vehicle Details
        </h2>

        <Link
          to={`/vehicles/editVehicle/${id}`}
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
                  {Object.keys(vehicleDetails.mainFeatures).map(
                    (key, index) => (
                      <DataRow
                        featureName={key}
                        featureValue={vehicleDetails.mainFeatures[key]}
                      />
                    )
                  )}
                </div>

                <div className="w-[300px] h-[300px] relative">
                  <img
                    src={vehicleDetails.image}
                    alt={vehicleDetails.name}
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
                <h4 className="font-[600] text-[18px] text-primary ">Motor</h4>
              </div>
              <div className="grid grid-cols-4  gap-6 p-5">
                {Object.keys(vehicleDetails.motor).map((key, index) => (
                  <div className="col-span-1">
                    <DataCol
                      featureName={key}
                      featureValue={vehicleDetails.motor[key]}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="  w-full bg-[white] border  border-[#E6E6E6] my-5 rounded-lg">
              <div className="border-b  border-[#E6E6E6] p-5">
                <h4 className="font-[600] text-[18px] text-primary ">
                  Wheels and Tires
                </h4>
              </div>
              <div className="grid grid-cols-4  gap-6 p-5">
                {Object.keys(vehicleDetails.wheelsAndTires).map(
                  (key, index) => (
                    <div className="col-span-1">
                      <DataCol
                        featureName={key}
                        featureValue={vehicleDetails.wheelsAndTires[key]}
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="  w-full bg-[white] border  border-[#E6E6E6] my-5 rounded-lg">
              <div className="border-b  border-[#E6E6E6] p-5">
                <h4 className="font-[600] text-[18px] text-primary ">
                  Contenances
                </h4>
              </div>
              <div className="grid grid-cols-4  gap-6 p-5">
                {Object.keys(vehicleDetails.contenances).map((key, index) => (
                  <div className="col-span-1">
                    <DataCol
                      featureName={key}
                      featureValue={vehicleDetails.contenances[key]}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="  w-full bg-[white] border  border-[#E6E6E6] my-5 rounded-lg">
              <div className="border-b  border-[#E6E6E6] p-5">
                <h4 className="font-[600] text-[18px] text-primary ">
                  Transmission
                </h4>
              </div>
              <div className="grid grid-cols-4  gap-6 p-5">
                {Object.keys(vehicleDetails.transmission).map((key, index) => (
                  <div className="col-span-1">
                    <DataCol
                      featureName={key}
                      featureValue={vehicleDetails.transmission[key]}
                    />
                  </div>
                ))}
              </div>
            </div>

            {isEditing ? (
              <>
                <SectionTitle>Accessories</SectionTitle>
                <div className="grid grid-cols-3 gap-4">
                  {accessories.map((accessory) => (
                    <label
                      key={accessory._id}
                      className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAccessories.includes(accessory._id)}
                        onChange={() => handleAccessoryChange(accessory._id)}
                        className="form-checkbox text-primary h-5 w-5 mr-3"
                      />
                      <span className="text-lg font-medium text-gray-700">
                        {accessory.name}
                      </span>
                    </label>
                  ))}
                </div>
              </>
            ) : (
              <div className="  w-full bg-[white] border  border-[#E6E6E6] my-5 rounded-lg">
                <div className="border-b  border-[#E6E6E6] p-5">
                  <h4 className="font-[600] text-[18px] text-primary ">
                    Accessories
                  </h4>
                </div>
                <div className="flex flex-wrap gap-4 p-5">
                  {vehicleDetails.accessories.map((accessory) => (
                    <div
                      key={accessory._id}
                      className="px-[16px] py-[6px] border border-[#979797] cursor-pointer rounded-[2rem] shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="text-[14px] font-[600] text-[#979797]">
                        {accessory.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

const SectionTitle = ({ children }) => (
  <div className="bg-primary text-[white] text-center text-lg px-4 py-2 my-4">
    {children}
  </div>
);

const Feature = React.memo(
  ({ section, featureName, featureValue, index, onChange, isEditing }) => (
    <div
      className={`flex justify-between px-4 py-3 ${
        (index + 1) % 2 === 0 ? "bg-secondary" : "bg-[white]"
      }`}
    >
      <span className="text-gray-600 capitalize">
        {featureName.replace(/([A-Z])/g, " $1").trim()}:
      </span>
      {isEditing ? (
        <input
          type="text"
          name={featureName}
          value={featureValue}
          onChange={(e) => onChange(section, featureName, e.target.value)}
          className="text-gray-800 border rounded p-1"
        />
      ) : (
        <span className="text-gray-800">{featureValue}</span>
      )}
    </div>
  ),
  (prevProps, nextProps) => {
    return (
      prevProps.featureValue === nextProps.featureValue &&
      prevProps.onChange === nextProps.onChange &&
      prevProps.isEditing === nextProps.isEditing
    );
  }
);

const DataRow = ({ featureName, featureValue }) => {
  return (
    <div className={`grid grid-cols-2 px-4 py-3 font-[600]`}>
      <span className={`col-span-1 text-gray-600 capitalize pr-[6rem]`}>
        {featureName.replace(/([A-Z])/g, " $1").trim()}:
      </span>
      {/* <span className="text-gray-800">{featureValue}</span> */}
      <span className="col-span-1 text-[#858992]">{featureValue}</span>
    </div>
  );
};

const DataCol = ({ featureName, featureValue }) => {
  return (
    <div className={`flex flex-col font-[600]`}>
      <span className={` text-gray-600 capitalize mb-1`}>
        {featureName.replace(/([A-Z])/g, " $1").trim()}:
      </span>
      {/* <span className="text-gray-800">{featureValue}</span> */}
      <span className="text-[#858992]">{featureValue}</span>
    </div>
  );
};

export default VehicleDetailsComponent;
export { SectionTitle, Feature };
