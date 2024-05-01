import React, { useEffect, useState } from "react";
import Header from "./users/Header";
import ProfileCard from "./userprofile/ProfileCard";
import LandManagement from "./businessProfile/LandManagement";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProfileDetails from "./businessProfile/ProfileDetails";
import Skeleton from "react-loading-skeleton";
import TaskManagement from "./businessProfile/TaskManagement";

function OwnerProfileComponent() {
  const [profile, setProfile] = useState();
  const [businessImage, setBusinessImage] = useState();

  console.log("businesss image", businessImage);

  const [created, setCreated] = useState();

  function handleCreated(id) {
    // console.log("check id", id);
    setCreated(id);
  }

  const { id } = useParams();

  useEffect(() => {
    // console.log("enter");
    (async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `https://api.agerlink.it/api/v1/admin/getBusinessProfile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log("business Profile", response.data);
        setProfile(response.data.data);
      } catch (error) {
        console.error("Error fetching data", error.response.data); // Change 'err' to 'error'
      }
    })();
  }, [created, businessImage]);

  return (
    <div className="w-full ">
      <div className="flex justify-between p-7">
        <h1 className="text-[32px]">User Profile</h1>
        <div className="flex gap-10">
          <div>
            {profile ? (
              <div className="flex gap-10">
                {profile?.certificate && (
                  <>
                    <a
                      href={profile?.certificate}
                      className="bg-[#039443] rounded-[12px]"
                    >
                      <button className="p-3">
                        <p className="text-[white]">Certificate</p>
                      </button>
                    </a>
                  </>
                )}

                {profile?.corporateFile && (
                  <>
                    <a
                      href={profile?.corporateFile}
                      className="bg-[#039443] rounded-[12px]"
                    >
                      <button className="p-3">
                        <p className="text-[white]">Corporate File</p>
                      </button>
                    </a>
                  </>
                )}

                {profile?.owner?.IDCard && (
                  <>
                    <a
                      href={profile?.owner?.IDCard}
                      className="bg-[#039443] rounded-[12px]"
                    >
                      <button className="p-3">
                        <p className="text-[white]">ID Card</p>
                      </button>
                    </a>
                  </>
                )}
              </div>
            ) : (
              <div style={{ display: "flex", gap: 10 }}>
                <Skeleton
                  count={1}
                  height={48}
                  width={95}
                  style={{ marginBottom: "10px", flex: 1, marginRight: "10px" }}
                />
                <Skeleton
                  count={1}
                  height={48}
                  width={95}
                  style={{ marginBottom: "10px", flex: 1 }}
                />
              </div>
            )}
          </div>

          {/* <button
              className="bg-primary rounded-[8px]"
            >
              <p className="px-5 py-2 text-[white]">Edit</p>
            </button> */}
        </div>
      </div>

      <div className="flex gap-10 px-7">
        <ProfileCard profile={profile} setBusinessImage={setBusinessImage} />

        <ProfileDetails profile={profile} />
      </div>

      <LandManagement profile={profile} handleCreated={handleCreated} />
    </div>
  );
}

export default OwnerProfileComponent;
