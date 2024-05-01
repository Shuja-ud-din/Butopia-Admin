import React, { useEffect, useState } from "react";
import Header from "./users/Header";
import ProfileCard from "./userprofile/ProfileCard";
import LandManagement from "./businessProfile/LandManagement";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProfileDetails from "./businessProfile/ProfileDetails";
import EditModal from "./users/modals/EditModal";

function UserProfileComponent() {
  const [profile, setProfile] = useState();
  const [userProfile, setUserProfile] = useState();
  const [edited, setEdited] = useState(null);
  const [image, setImage] = useState();

  const update = (val) => {
    setEdited(val);
  };

  console.log("edited master", edited);

  const { id } = useParams();

  const [editUser, setEditUser] = useState();
  const [modalIsOpen1, setIsOpen1] = useState(false);

  function openModal1() {
    setIsOpen1(true);
  }

  function closeModal1() {
    setIsOpen1(false);
  }

  // console.log("id->>", id);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      // console.log("enter api call ");
      try {
        const response = await axios.get(
          `https://api.agerlink.it/api/v1/admin/getUserProfile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserProfile(response.data.data);

        // console.log("userProfile", response.data.data);
      } catch (error) {
        console.error("Error fetching data", error.response.data); // Change 'err' to 'error'
      }
    })();
  }, [edited, image]);

  return (
    <div className="w-full ">
      <div className="flex justify-between items-center p-7">
        <h1 className="text-[32px] font-600">User Profile</h1>
        <div>
          <button
            className="bg-primary rounded-[8px]"
            onClick={() => {
              setEditUser(userProfile);
              openModal1();
            }}
          >
            <p className="px-5 py-2 text-[white]">Edit</p>
          </button>
        </div>
      </div>

      <div className="flex gap-10 px-7 mb-5">
        <ProfileCard userProfile={userProfile} setImage={setImage} />

        <ProfileDetails userProfile={userProfile} />
      </div>

      <EditModal
        modalIsOpen={modalIsOpen1}
        closeModal={closeModal1}
        editUser={editUser}
        update={update}
      />
    </div>
  );
}

export default UserProfileComponent;
