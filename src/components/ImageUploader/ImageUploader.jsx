import React, { useState } from "react";
import profile_image from "../../assets/user_profile.png";
import upload_img from "../../assets/upload_img.jpg";
import Loader from "../Loader/Loader";

const ImageUploader = ({ profile = false, image, setUrl }) => {
  const [file, setFile] = useState(image || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const defaultHandleChangeFunction = (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    if (file) {
      console.log(file);
    } else {
      setError("Please select an image");
    }
  };

  return (
    <>
      <div
        htmlFor="image-upload "
        className=" cursor-pointer w-auto  rounded-[9px]  "
      >
        <label className="w-full h-full">
          <div className=" rounded-[9px] flex justify-center items-center">
            {!isLoading ? (
              <img
                className="cursor-pointer w-full h-full rounded-[9px]"
                src={file || (profile ? profile_image : upload_img)}
                alt=""
              />
            ) : (
              <Loader />
            )}
            <input
              name={"image_upload"}
              id="image-upload"
              type="file"
              className="hidden"
              onChange={defaultHandleChangeFunction}
              accept="image/*"
            />
          </div>
          <p className="text-[red]">{error}</p>
        </label>
      </div>
    </>
  );
};

export default ImageUploader;
