import React, { useEffect, useState } from "react";
import axios from "axios";
import arrow from "../../../assets/arrow-down.svg";
import action from "../../../assets/action.svg";
import { toast } from "react-toastify"; // Assuming toast notifications
import add from "../../../assets/add.svg";
import edit from "../../../assets/edit.svg";
import del from "../../../assets/delete.svg";

const LandManagement = ({ profile, handleCreated }) => {
  const [lands, setLands] = useState([]);
  const [expandedLand, setExpandedLand] = useState(null);
  const [expandedBlock, setExpandedBlock] = useState(null);
  const [expandedPlot, setExpandedPlot] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLands(profile?.lands || []);
  }, [profile]);

  const handleCreateEntity = async (entityType, parentId = null) => {
    const entityName = prompt(
      `Enter ${entityType.charAt(0).toUpperCase() + entityType.slice(1)} Name:`
    );
    if (!entityName) return;

    const data = {};
    switch (entityType) {
      case "land":
        data["owner"] = profile._id; // Assuming profile._id is the business owner's ID
        break;
      case "block":
        data["land"] = parentId; // ID of the land
        break;
      case "plot":
        data["block"] = parentId; // ID of the block
        break;
      case "parcel":
        data["plot"] = parentId; // ID of the plot
        break;
      default:
        return;
    }

    data["name"] = entityName;

    try {
      const response = await axios.post(
        `https://api.agerlink.it/api/v1/${entityType}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      handleCreated(response.data.data._id);
      toast.success(response.data.message);
      // Update state to reflect new entity
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleEditEntity = async (entityType, entityId) => {
    const entityName = prompt("Enter new name:");
    if (!entityName) return;

    try {
      const response = await axios.patch(
        `https://api.agerlink.it/api/v1/${entityType}/${entityId}`,
        { name: entityName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Entity updated successfully");
      // Refresh data - consider refetching or updating local state
      handleCreated(response);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred while updating"
      );
    }
  };

  const handleDeleteEntity = async (entityType, entityId) => {
    if (!confirm("Are you sure you want to delete this entity?")) return;

    try {
      await axios.delete(
        `https://api.agerlink.it/api/v1/${entityType}/${entityId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Entity deleted successfully");
      handleCreated(response);
      // Refresh data - consider refetching or updating local state
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred while deleting"
      );
    }
  };

  return (
    <div className="p-7">
      <div className="flex justify-between">
        <h1>Land Management</h1>
        <button
          onClick={() => handleCreateEntity("land")}
          className="bg-green-500 rounded-lg"
        >
          <p className="text-white p-3">Create new Land</p>
        </button>
      </div>

      <div className="bg-white mt-5">
        {lands.map((land, landIndex) => (
          <div key={land._id} className="p-4 border-b border-secondary mb-4">
            <div className="flex justify-between mb-5">
              <div className="flex gap-2 items-center">
                <div
                  onClick={() =>
                    setExpandedLand(
                      expandedLand === landIndex ? null : landIndex
                    )
                  }
                >
                  <img src={arrow} alt="arrow-down" />
                </div>
                <h2>{land.name}</h2>
              </div>
              <div className="flex gap-5 items-center">
                <button onClick={() => handleCreateEntity("block", land._id)}>
                  {/* <img src={add} alt="add" className='w-[20px] h-[20px]' /> */}
                  {/* <svg xmlns="http://www.w3.org/2000/svg"  width="48" height="48" id="add"><path d="M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="hover:fill-[green] w-[27px] h-[27px]"
                    viewBox="0 0 101 101"
                    id="add"
                  >
                    <path d="M50.5 16.4c-18.8 0-34.1 15.3-34.1 34.1s15.3 34.1 34.1 34.1 34.1-15.3 34.1-34.1-15.3-34.1-34.1-34.1zm0 63.4c-16.1 0-29.3-13.1-29.3-29.3s13.1-29.3 29.3-29.3c16.1 0 29.3 13.1 29.3 29.3S66.6 79.8 50.5 79.8z"></path>
                    <path d="M66.2 47.8H52.9V34.5c0-1.3-1.1-2.4-2.4-2.4-1.3 0-2.4 1.1-2.4 2.4v13.3H34.8c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4h13.3v13.3c0 1.3 1.1 2.4 2.4 2.4 1.3 0 2.4-1.1 2.4-2.4V52.6h13.3c1.3 0 2.4-1.1 2.4-2.4s-1.1-2.4-2.4-2.4z"></path>
                  </svg>
                </button>
                <button onClick={() => handleEditEntity("land", land._id)}>
                  {/* <img src={edit} alt="Edit" className='w-[20px] h-[20px]'/> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="hover:fill-[green] w-[17px] h-[17px]"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    id="edit"
                  >
                    <path d="M3.5,24h15A3.51,3.51,0,0,0,22,20.487V12.95a1,1,0,0,0-2,0v7.537A1.508,1.508,0,0,1,18.5,22H3.5A1.508,1.508,0,0,1,2,20.487V5.513A1.508,1.508,0,0,1,3.5,4H11a1,1,0,0,0,0-2H3.5A3.51,3.51,0,0,0,0,5.513V20.487A3.51,3.51,0,0,0,3.5,24Z"></path>
                    <path d="M9.455,10.544l-.789,3.614a1,1,0,0,0,.271.921,1.038,1.038,0,0,0,.92.269l3.606-.791a1,1,0,0,0,.494-.271l9.114-9.114a3,3,0,0,0,0-4.243,3.07,3.07,0,0,0-4.242,0l-9.1,9.123A1,1,0,0,0,9.455,10.544Zm10.788-8.2a1.022,1.022,0,0,1,1.414,0,1.009,1.009,0,0,1,0,1.413l-.707.707L19.536,3.05Zm-8.9,8.914,6.774-6.791,1.4,1.407-6.777,6.793-1.795.394Z"></path>
                  </svg>
                </button>
                <button onClick={() => handleDeleteEntity("land", land._id)}>
                  {/* <img src={del} alt="Delete" className="w-[20px] h-[20px]" /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="hover:fill-[green] w-[25px] h-[25px]"  viewBox="0 0 32 32" id="delete"><path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z"></path></svg>
                </button>
              </div>
            </div>

            {expandedLand === landIndex && land.blocks && (
              <div className="ml-4 mt-2">
                {land.blocks.map((block, blockIndex) => (
                  <div key={block._id} className="ml-4 mt-2">
                    <div className="flex justify-between">
                      <div className="flex gap-2 items-center">
                        <div
                          onClick={() =>
                            setExpandedBlock(
                              expandedBlock === `${landIndex}-${blockIndex}`
                                ? null
                                : `${landIndex}-${blockIndex}`
                            )
                          }
                        >
                          <img src={arrow} alt="Expand" />
                        </div>
                        <h3>{block.name}</h3>
                      </div>
                      <div className="flex gap-5 items-center">
                        <button
                          onClick={() => handleCreateEntity("plot", block._id)}
                        >
                          {/* <img src={add} alt="add" className='w-[20px] h-[20px]'/>
                           */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="hover:fill-[green] w-[27px] h-[27px]"
                            viewBox="0 0 101 101"
                            id="add"
                          >
                            <path d="M50.5 16.4c-18.8 0-34.1 15.3-34.1 34.1s15.3 34.1 34.1 34.1 34.1-15.3 34.1-34.1-15.3-34.1-34.1-34.1zm0 63.4c-16.1 0-29.3-13.1-29.3-29.3s13.1-29.3 29.3-29.3c16.1 0 29.3 13.1 29.3 29.3S66.6 79.8 50.5 79.8z"></path>
                            <path d="M66.2 47.8H52.9V34.5c0-1.3-1.1-2.4-2.4-2.4-1.3 0-2.4 1.1-2.4 2.4v13.3H34.8c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4h13.3v13.3c0 1.3 1.1 2.4 2.4 2.4 1.3 0 2.4-1.1 2.4-2.4V52.6h13.3c1.3 0 2.4-1.1 2.4-2.4s-1.1-2.4-2.4-2.4z"></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleEditEntity("block", block._id)}
                        >
                          {/* <img src={edit} alt="Edit" className='w-[20px] h-[20px]'/> */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="hover:fill-[green] w-[17px] h-[17px]"
                            data-name="Layer 1"
                            viewBox="0 0 24 24"
                            id="edit"
                          >
                            <path d="M3.5,24h15A3.51,3.51,0,0,0,22,20.487V12.95a1,1,0,0,0-2,0v7.537A1.508,1.508,0,0,1,18.5,22H3.5A1.508,1.508,0,0,1,2,20.487V5.513A1.508,1.508,0,0,1,3.5,4H11a1,1,0,0,0,0-2H3.5A3.51,3.51,0,0,0,0,5.513V20.487A3.51,3.51,0,0,0,3.5,24Z"></path>
                            <path d="M9.455,10.544l-.789,3.614a1,1,0,0,0,.271.921,1.038,1.038,0,0,0,.92.269l3.606-.791a1,1,0,0,0,.494-.271l9.114-9.114a3,3,0,0,0,0-4.243,3.07,3.07,0,0,0-4.242,0l-9.1,9.123A1,1,0,0,0,9.455,10.544Zm10.788-8.2a1.022,1.022,0,0,1,1.414,0,1.009,1.009,0,0,1,0,1.413l-.707.707L19.536,3.05Zm-8.9,8.914,6.774-6.791,1.4,1.407-6.777,6.793-1.795.394Z"></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteEntity("block", block._id)}
                        >
                          {/* <img
                            src={del}
                            alt="Delete"
                            className="w-[20px] h-[20px]"
                          /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="hover:fill-[green] w-[25px] h-[25px]"  viewBox="0 0 32 32" id="delete"><path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z"></path></svg>

                        </button>
                      </div>
                    </div>

                    {expandedBlock === `${landIndex}-${blockIndex}` &&
                      block.plots && (
                        <div className="ml-4 mt-2">
                          {block.plots.map((plot, plotIndex) => (
                            <div key={plot._id} className="ml-4 mt-2">
                              <div className="flex justify-between">
                                <div className="flex gap-2 items-center">
                                  <div
                                    onClick={() =>
                                      setExpandedPlot(
                                        expandedPlot ===
                                          `${landIndex}-${blockIndex}-${plotIndex}`
                                          ? null
                                          : `${landIndex}-${blockIndex}-${plotIndex}`
                                      )
                                    }
                                  >
                                    <img src={arrow} alt="Expand" />
                                  </div>
                                  <h4>{plot.name}</h4>
                                </div>
                                <div className="flex gap-5 items-center">
                                  <button
                                    onClick={() =>
                                      handleCreateEntity("parcel", plot._id)
                                    }
                                  >
                                    {/* <img src={add} alt="add" className='w-[20px] h-[20px]'/> */}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="hover:fill-[green] w-[27px] h-[27px]"
                                      viewBox="0 0 101 101"
                                      id="add"
                                    >
                                      <path d="M50.5 16.4c-18.8 0-34.1 15.3-34.1 34.1s15.3 34.1 34.1 34.1 34.1-15.3 34.1-34.1-15.3-34.1-34.1-34.1zm0 63.4c-16.1 0-29.3-13.1-29.3-29.3s13.1-29.3 29.3-29.3c16.1 0 29.3 13.1 29.3 29.3S66.6 79.8 50.5 79.8z"></path>
                                      <path d="M66.2 47.8H52.9V34.5c0-1.3-1.1-2.4-2.4-2.4-1.3 0-2.4 1.1-2.4 2.4v13.3H34.8c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4h13.3v13.3c0 1.3 1.1 2.4 2.4 2.4 1.3 0 2.4-1.1 2.4-2.4V52.6h13.3c1.3 0 2.4-1.1 2.4-2.4s-1.1-2.4-2.4-2.4z"></path>
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleEditEntity("plot", plot._id)
                                    }
                                  >
                                    {/* <img src={edit} alt="Edit" className='w-[20px] h-[20px]'/> */}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="hover:fill-[green] w-[17px] h-[17px]"
                                      data-name="Layer 1"
                                      viewBox="0 0 24 24"
                                      id="edit"
                                    >
                                      <path d="M3.5,24h15A3.51,3.51,0,0,0,22,20.487V12.95a1,1,0,0,0-2,0v7.537A1.508,1.508,0,0,1,18.5,22H3.5A1.508,1.508,0,0,1,2,20.487V5.513A1.508,1.508,0,0,1,3.5,4H11a1,1,0,0,0,0-2H3.5A3.51,3.51,0,0,0,0,5.513V20.487A3.51,3.51,0,0,0,3.5,24Z"></path>
                                      <path d="M9.455,10.544l-.789,3.614a1,1,0,0,0,.271.921,1.038,1.038,0,0,0,.92.269l3.606-.791a1,1,0,0,0,.494-.271l9.114-9.114a3,3,0,0,0,0-4.243,3.07,3.07,0,0,0-4.242,0l-9.1,9.123A1,1,0,0,0,9.455,10.544Zm10.788-8.2a1.022,1.022,0,0,1,1.414,0,1.009,1.009,0,0,1,0,1.413l-.707.707L19.536,3.05Zm-8.9,8.914,6.774-6.791,1.4,1.407-6.777,6.793-1.795.394Z"></path>
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteEntity("plot", plot._id)
                                    }
                                  >
                                    {/* <img
                                      src={del}
                                      alt="Delete"
                                      className="w-[20px] h-[20px]"
                                    /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="hover:fill-[green] w-[25px] h-[25px]"  viewBox="0 0 32 32" id="delete"><path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z"></path></svg>

                                  </button>
                                </div>
                              </div>

                              {expandedPlot ===
                                `${landIndex}-${blockIndex}-${plotIndex}` &&
                                plot.parcels && (
                                  <div className="ml-4 mt-2">
                                    {plot.parcels.map((parcel) => (
                                      <div
                                        key={parcel._id}
                                        className="ml-4 mt-2"
                                      >
                                        <p>{parcel.name}</p>
                                        <div className="flex gap-5 items-center">
                                          <button
                                            onClick={() =>
                                              handleEditEntity(
                                                "parcel",
                                                parcel._id
                                              )
                                            }
                                          >
                                            {/* <img src={edit} alt="Edit" className='w-[20px] h-[20px]'/> */}
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="hover:fill-[green] w-[17px] h-[17px]"
                                              data-name="Layer 1"
                                              viewBox="0 0 24 24"
                                              id="edit"
                                            >
                                              <path d="M3.5,24h15A3.51,3.51,0,0,0,22,20.487V12.95a1,1,0,0,0-2,0v7.537A1.508,1.508,0,0,1,18.5,22H3.5A1.508,1.508,0,0,1,2,20.487V5.513A1.508,1.508,0,0,1,3.5,4H11a1,1,0,0,0,0-2H3.5A3.51,3.51,0,0,0,0,5.513V20.487A3.51,3.51,0,0,0,3.5,24Z"></path>
                                              <path d="M9.455,10.544l-.789,3.614a1,1,0,0,0,.271.921,1.038,1.038,0,0,0,.92.269l3.606-.791a1,1,0,0,0,.494-.271l9.114-9.114a3,3,0,0,0,0-4.243,3.07,3.07,0,0,0-4.242,0l-9.1,9.123A1,1,0,0,0,9.455,10.544Zm10.788-8.2a1.022,1.022,0,0,1,1.414,0,1.009,1.009,0,0,1,0,1.413l-.707.707L19.536,3.05Zm-8.9,8.914,6.774-6.791,1.4,1.407-6.777,6.793-1.795.394Z"></path>
                                            </svg>
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleDeleteEntity(
                                                "parcel",
                                                parcel._id
                                              )
                                            }
                                          >
                                            {/* <img
                                              src={del}
                                              alt="Delete"
                                              className="w-[20px] h-[20px]"
                                            /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="hover:fill-[green] w-[25px] h-[25px]"  viewBox="0 0 32 32" id="delete"><path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z"></path></svg>

                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandManagement;
