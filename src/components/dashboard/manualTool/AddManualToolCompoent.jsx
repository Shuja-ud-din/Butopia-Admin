import React, { useEffect, useState } from "react";
import FormField from "../../utils/FormField";
import ImageField from "../../utils/ImageField";
import SelectField from "../../utils/SelectField";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../../utils/Spinner";
import { toast } from "react-toastify";

const AddManualToolCompoent = ({ manualTool, setManualTool, editAllowed }) => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const { tid } = useParams();
  // const [categoryLoading, setCategoryLoading] = useState(false);
  const [toolLoading, setToolLoading] = useState(false);

  const changeHandler = (propertyName, value) => {
    setManualTool((prevState) => ({
      ...prevState,
      [propertyName]: value,
    }));
  };

  const getAllCategories = async () => {
    try {
      // setCategoryLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "https://api.agerlink.it/api/v1/category?type=manual_tool",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data) {
        setCategories(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
    // setCategoryLoading(false);
  };
  const getManualTool = async () => {
    try {
      setToolLoading(true);
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `https://api.agerlink.it/api/v1/manualTool/${tid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data) {
        setManualTool({
          name: data.data?.name,
          material: data.data?.material,
          usage: data.data?.usage,
          image: data.data?.image,
          category: data.data?.category?._id,
          weight: data.data?.weight,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setToolLoading(false);
  };

  useEffect(() => {
    getAllCategories();
    if (tid) {
      getManualTool();
    }
  }, []);

  return (
    <div className="">
      {/* white container 1 */}
      <div className=" w-full  p-5 w-full bg-[white]  my-5 rounded-lg">
        <div className="flex gap-5 items-center">
          <h2 className="font-semibold text-lg">Name of the Tool</h2>
          {toolLoading && <Spinner />}
        </div>

        {/* Form Begins here*/}
        <div className="p-2 flex justify-between gap-10 mt-2">
          {/* text fields aka left side */}
          <div className="">
            <FormField
              label="Tool Name"
              name="name"
              value={manualTool.name}
              handleChange={changeHandler}
              editAllowed={editAllowed}
            />

            <SelectField
              label="Category"
              name="category"
              options={categories}
              value={manualTool.category}
              handleChange={changeHandler}
              editAllowed={editAllowed}
            />
            {/* {categoryLoading && <Spinner />} */}
            {/* </div> */}
            <FormField
              label="material"
              name="material"
              value={manualTool.material}
              handleChange={changeHandler}
              editAllowed={editAllowed}
            />
            <FormField
              type="number"
              label="Weight"
              name="weight"
              value={manualTool.weight}
              handleChange={changeHandler}
              editAllowed={editAllowed}
              placeholder={0}
            />
          </div>

          {/* image section i.e right side */}
          <ImageField
            image={image || manualTool.image}
            setImage={setImage}
            changeHandler={changeHandler}
            editAllowed={editAllowed}
          />
        </div>
      </div>

      {/* white container 2 */}
      <div className=" w-full  p-5 w-full bg-[white]  my-5 rounded-lg">
        <h2 className="font-semibold text-lg">Usage</h2>

        {/* text box component */}
        <div className="px-2 mt-4">
          <label
            htmlFor={name}
            className="capitalize font-semibold text-grigio"
          >
            Description
          </label>
          <textarea
            className="border rounded-xl w-full outline-none p-2"
            name="usage"
            id=""
            cols="30"
            rows="8"
            placeholder="Type Here"
            value={manualTool.usage}
            readOnly={!editAllowed}
            onChange={(e) => changeHandler("usage", e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AddManualToolCompoent;
