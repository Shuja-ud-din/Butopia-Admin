import axios from "axios";



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProfileCard({ profile, userProfile , setImage, setBusinessImage }) {

  


  const [imageSrc, setImageSrc] = useState("/placeholder.jpg");
  const [businessProfile,setBusinessProfile] = useState("/placeholder.jpg")

  const { id } = useParams();

  const handleFileInputChange = async (event) => {

    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append(`${userProfile? 'user' : 'business' }`, userProfile?userProfile._id:id); 
      formData.append("image", file); 

      // console.log("enter");

      try {

        const token = localStorage.getItem("token");

        const response = await fetch(
          userProfile? `https://api.agerlink.it/api/v1/user/image
          ` : profile?`https://api.agerlink.it/api/v1/businessOwner/profile`:'',
          {
            method: "PATCH",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok && userProfile) {
          const data = await response.json();
          setImage(data.data.image);

        } 
        else if(response.ok && profile){
          const data = await response.json();
          setBusinessImage(data?.data?.image);
        }
        else {
          console.error(
            "Failed to upload image:",
            response.status,
            await response.text()
          );
        }
      } catch (error) {
      }
    } else {
      setImageSrc("/placeholder.jpg"); 
    }
  };



  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(profile?.description || "no description available");


  useEffect(() => {
    if (profile) {
      setDescription(profile.description);
    }
  }, [profile]);
  
  const handleEditSave =async () => {
    if (isEditing) {

      try {

        const token = localStorage.getItem("token");


        const formDescription = new FormData();
        formDescription.append('business',id); 
        formDescription.append("description", description); 

        const response = await fetch(`https://api.agerlink.it/api/v1/businessOwner/profile`,
          {
            method: "PATCH",
            body: formDescription,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        if (response.ok) {
          const data = await response.json();

          setDescription(data.data.description);
        } 
        else {
          console.error(
            "Failed to upload image:",
            response.status,
            await response.text()
          );
        }
      } catch (error) {
          console.log("error", error)
      }



    }
    setIsEditing(!isEditing);
  };

  const handleChange = (event) => {
    setDescription(event.target.value);
  };



  return (
    <div className="bg-[white] w-[350px]">
      <div className="mx-4 pt-10 pb-4 flex flex-col items-center border-b">
        <div className="relative inline-block">

        <div className="rounded-full w-[150px] bg-[primary] h-[150px] flex justify-center items-center">
          <img
            src={profile
              ? profile?.image? profile.image : businessProfile
              : userProfile?.image? userProfile?.image
              : imageSrc
            }
            alt=""
            className="rounded-full w-[150px] h-[150px]"
          />
        </div>


<div>

            <input
              id="image-upload"
              type="file"
              className="hidden"
              onChange={handleFileInputChange}
              accept="image/*" // Accept only images
            />
          </div>
          <label
            htmlFor="image-upload"
            className="absolute top-[14px] right-[6px] cursor-pointer bg-[white] rounded-full"
          >
            <div className="w-6 h-6 bg-white text-primary rounded-full border-2 border-white flex justify-center items-center shadow-md">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              onChange={handleFileInputChange}
            />
          </label>

</div>
  
        

        <div className="py-2">
          <h1 className="font-bold text-center">
            {profile
              ? profile?.owner?.firstName
              : userProfile
              ? userProfile.firstName
              : null}
          </h1>
          <p>
            {profile
              ? profile?.owner?.email
              : userProfile
              ? userProfile.email
              : null}
          </p>
        </div>
      </div>

      {
        profile && (
          <>
 <div className="bg-gray-50 p-5 rounded-lg shadow-md">
  <div className="flex justify-between items-center mb-4">
    <p className="text-lg font-semibold">Description</p>
    <button onClick={handleEditSave} className={`px-4 py-2 rounded text-[white] ${isEditing ? 'bg-[#019320] hover:bg-[#019320]' : 'bg-[gray] hover:bg-[gray]'}`}>
      {isEditing ? 'Save' : 'Edit'}
    </button>
  </div>
  {isEditing ? (
    <input
      type="text"
      value={description}
      onChange={handleChange}
      className="w-full p-2 border border-[gray]-300 rounded text-[gray]-700"
    />
  ) : (
    <p className="text-gray-700">{description}</p>
  )}
</div>

          </>
        )
}


      {
        userProfile && (
          <>

          <div className="px-5 pb-10">
        <p className="pt-3">Description</p>
        <p className="text-[gray] text-[14px] pt-2">
          {userProfile
            ? userProfile.bio
            :''}
        </p>
      </div>

          </>
        )
      }






    </div>
  );
}

export default ProfileCard;
