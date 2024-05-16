import React, { useEffect } from "react";
import Button from "../Button/Button";
import { FaPlus } from "react-icons/fa";
import DetailCard from "../DetailCard/DetailCard";
import doctorProfile from "../../assets/avatar.jpg";
import Profile from "../../assets/user_profile.png";
import ExperiencePanel from "../../assets/ExperiencePanel/ExperiencePanel";
import heart from "../../assets/heart.png";
import { FaHeart } from "react-icons/fa";
import ReviewDetail from "../ReviewDetail/ReviewDetail";
import ServiceCard from "../ServiceCard/ServiceCard";
import { useLocation, useParams } from "react-router-dom";
import useProvider from "../../Hooks/useProvider";
import Loader from "../Loader/Loader";

const ProviderDetails = () => {
  const { getProvider, getProviderData, providerDetailLoading } = useProvider();
  const url = useLocation();
  const { id } = useParams();
  useEffect(() => {
    getProvider(id);
  }, []);
  console.log(getProviderData);
  return (
    <>
      <div className="w-full flex justify-between mb-5">
        <h3 className="text-[25px] font-[500] ">Provider Details</h3>
      </div>
      {providerDetailLoading ? (
        <div className="min-h-[78vh] w-full bg-[white] p-[1rem]  flex gap-[1rem] justify-center items-center  mt-4   border border-[#c4c4c4]  rounded-[9px]  shadow-lg">
          <Loader />
        </div>
      ) : (
        <>
          <div className="min-h-[78vh] w-full bg-[white] p-[1rem]  flex gap-[1rem] flex-col  mt-4   border border-[#c4c4c4]  rounded-[9px]  shadow-lg">
            <div className="w-full flex ">
              <div className="w-[40%]">
                <DetailCard
                  icon={heart}
                  profilePhoto={getProviderData?.profilePhoto || doctorProfile}
                  name={getProviderData && getProviderData.name}
                  profession={getProviderData && getProviderData.speciality}
                  location={getProviderData && getProviderData.address}
                  starRates={5}
                />
              </div>
              <div className="flex w-[60%] items-center   gap-[4rem] justify-center">
                <ExperiencePanel
                  img={Profile}
                  type="patients"
                  numberOfType="2,000+"
                />
                <ExperiencePanel
                  img={Profile}
                  type="experience"
                  numberOfType={`${
                    getProviderData?.experience || "0"
                  } ${"years"}`}
                />
                <ExperiencePanel
                  img={Profile}
                  type="rating"
                  numberOfType="4.8"
                />
                <ExperiencePanel
                  img={Profile}
                  type="reviews"
                  numberOfType="1872"
                />
              </div>
            </div>
            <div className="w-[90%] h-full mt-[2rem]">
              <div className="w-full">
                <div className="text-[1.2rem] font-primary font-[600] mb-[0.5rem]">
                  About me
                </div>
                <div className="text-[0.93rem] font-[400] ">
                  {getProviderData && getProviderData.about}
                </div>
              </div>
              <div className="w-full mt-[2rem]">
                <div className="text-[1.2rem] font-primary font-[600] mb-[0.5rem]">
                  Working Time
                </div>
                <div className="text-[0.93rem] font-[400] ">
                  Starting Time:{" "}
                  {getProviderData.workingTimes?.start || (
                    <span className="font-[500] text-[#808080]">Loading</span>
                  )}
                </div>
                <div className="text-[0.93rem] font-[400] ">
                  Ending Time:{" "}
                  {getProviderData.workingTimes?.end || (
                    <span className="font-[500] text-[#808080]">Loading</span>
                  )}
                </div>
              </div>
              <div className=" w-full flex  mt-[2rem]">
                <div className="w-[50%] ">
                  <div className="text-[1.2rem] font-primary font-[600] mb-[0.5rem]">
                    Reviews
                  </div>
                  {getProviderData === true ? (
                    getProviderData.reviews.length < 1 ? (
                      "No reviews yet"
                    ) : (
                      <ReviewDetail />
                    )
                  ) : (
                    <div className="font-[500] text-[#808080]">
                      No reviews yet
                    </div>
                  )}
                </div>
                <div className="w-[60%]  flex flex-col">
                  <div className="text-[1.2rem] font-primary font-[600] mb-[0.5rem]">
                    Services
                  </div>
                  <div className="flex justify-between">
                    <div className="">
                      <ServiceCard
                        name="Beauty App Clinics"
                        img={doctorProfile}
                        description="288 McClure Court Arkans"
                      />
                    </div>
                    <div className="">
                      <ServiceCard
                        name="Skin Care"
                        img={doctorProfile}
                        description="What to do have to be best"
                      />
                    </div>
                    <div className="">
                      <ServiceCard
                        name="Acne Solution"
                        img={doctorProfile}
                        description="Curing in a good way to do"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProviderDetails;
