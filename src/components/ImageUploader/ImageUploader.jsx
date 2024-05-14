import React, { useEffect, useState } from "react";
import profile_image from "../../assets/user_profile.png";
import upload_img from "../../assets/upload_img.jpg";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Loader from "../Loader/Loader";
import { api } from "../../api/api";

const ImageUploader = ({ profile = false, image, setUrl }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [shwoEdit, setShowEdit] = useState(false);

  const [imagePreview, setImagePreview] = useState("");

  const uploadImage = async (file) => {
    try {
      const res = await api.post(
        "/api/upload/image",
        {
          image: file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setFile(res.data.url);
      setIsLoading(false);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  const defaultHandleChangeFunction = (e) => {
    e.preventDefault();
    setFile(null);
    setIsLoading(true);
    const imgFile = e.target.files[0];

    if (imgFile) {
      uploadImage(imgFile);
    } else {
      setError("Please select an image");
    }
  };

  useEffect(() => {
    if (image) {
      setFile(image);
    }
  }, [image]);

  useEffect(() => {
    if (setUrl) setUrl(file);
  }, [file]);

  return (
    <>
      <div htmlFor="image-upload " className=" cursor-pointer w-full h-full   ">
        <label className="w-full h-full">
          <div className="w-full h-full  flex justify-center items-center">
            {!isLoading ? (
              <div
                className={`w-full h-full cursor-pointer  relative`}
                onMouseOver={() => {
                  if (file) {
                    setShowEdit(true);
                  }
                }}
                onMouseLeave={() => {
                  if (file) {
                    setShowEdit(false);
                  }
                }}
              >
                <img
                  className={`cursor-pointer w-full h-full ${
                    profile ? "rounded-full" : "rounded-lg"
                  } `}
                  src={file || (profile ? profile_image : upload_img)}
                  alt=""
                />

                {shwoEdit && (
                  <div
                    className={`flex justify-center items-center absolute h-full w-full bg-[gray] bg-opacity-50 text-white p-2 ${
                      profile ? "rounded-full" : "rounded-lg"
                    } bottom-0 w-full`}
                  >
                    <MdOutlineModeEditOutline size={30} />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col w-full items-center">
                <Loader />
                <p className="mt-3">Uploading Image...</p>
              </div>
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
