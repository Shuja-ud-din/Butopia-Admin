import React, { useEffect, useState } from "react";
import request from "../../utils/request";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./Spinner";

const ImageField = ({ image, setImage, changeHandler, editAllowed }) => {
  // state
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  //   change handler function
  const handleImageChange = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    setImage(file);
    setFlag(true);
  };

  const handleAttachmentSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const { data } = await request.post("/common/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.success) {
        toast.success("image uploaded successfully");
        setImagePreview(data?.data);
        changeHandler("image", data?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (flag) {
      handleAttachmentSubmit();
      setFlag(false);
    }
  }, [image]);

  return (
    <div className="flex justify-center items-center flex-col">
      <label htmlFor="image-upload" className="cursor-pointer">
        <div className="w-[320px] h-[250px] flex justify-center items-center border-2 border-[#E5E5E5] rounded-[12px] overflow-hidden">
          {imagePreview ? (
            <img src={imagePreview} alt="Vehicle" className="w-full h-full" />
          ) : loading ? (
            <Spinner />
          ) : (
            <img src={image || "/placeholder.svg"} alt="placeholder" />
          )}
        </div>
        <input
          id="image-upload"
          name="image"
          type="file"
          onChange={handleImageChange}
          className="hidden"
          readOnly={!editAllowed}
        />
      </label>
      <ToastContainer />
    </div>
  );
};

export default ImageField;
