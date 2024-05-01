import React, { useEffect, useState } from "react";

import Lottie from "react-lottie";
import success from "../../../utils/success.json";
import arrow from "../../../assets/arrow-down.svg";
import action from "../../../assets/action.svg";
import axios from "axios";


const LandManagement = ({profile,handleCreated}) => {


  const [lands, setLands] = useState();
  const [newLand, setNewLand] = useState("");
  const [newBlock, setNewBlock] = useState("");
  const [newPlot, setNewPlot] = useState("");
  const [newParcel, setNewParcel] = useState("");

  const [createLand, setCreateLand] = useState(false);
  const [createBlock, setCreateBlock] = useState(Array(50).fill(false));
  const [createPlot, setCreatePlot] = useState(Array(50).fill(false));
  const [createParcel, setCreateParcel] = useState(Array(50).fill(false));

// console.log("lands data", lands)


  useEffect(()=>{
    setLands(profile?.lands)
  },[profile])
  


  const [lottie, setLottie] = useState(false);



  const token = localStorage.getItem("token")

  const handleCreateLand = () => {
    const newLand = prompt("Enter Land Name:");
    if (newLand) {
      const landData = {
        owner: profile._id,
        name: newLand, // Fix: Use newLand instead of landName
      };
  
      axios.post(
        'https://api.agerlink.it/api/v1/land',
        landData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        } // Fix: Add closing parenthesis here
      )
        .then((res) => {
          localStorage.setItem("landId", res.data.data._id);
          handleCreated(res.data.data._id)
  
          if (res.data.success) {
            toast.success(res.data.message);
          }
        })
        .catch((err) => {
          setMessage(err.response.data.message);
        });
    }
  };
  

  const handleCreateBlock = (id) => {
    // if (newBlock) {
    //   const updatedLands = [...lands];
    //   updatedLands[landIndex].blocks.push({ name: newBlock, plots: [] });
    //   setLands(updatedLands);
    //   setNewBlock("");
    // }


    const blockData = {
      land: id,
      name: newBlock, // Fix: Use newLand instead of landName
    };

    // console.log("block data", blockData)

    axios.post(
      'https://api.agerlink.it/api/v1/block',
      blockData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } // Fix: Add closing parenthesis here
    )
      .then((res) => {
        // localStorage.setItem("landId", res.data.data._id);
        handleCreated(res.data.data._id)

        if (res.data.success) {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });




  };

  const handleCreatePlot = (landIndex, blockIndex) => {
    if (newPlot) {
      const updatedLands = [...lands];
      updatedLands[landIndex].blocks[blockIndex].plots.push({
        name: newPlot,
        parcels: [],
      });
      setLands(updatedLands);
      setNewPlot("");
    }
  };

  const handleCreateParcel = (landIndex, blockIndex, plotIndex) => {
    if (newParcel) {
      const updatedLands = [...lands];
      updatedLands[landIndex].blocks[blockIndex].plots[plotIndex].parcels.push({
        name: newParcel,
      });
      setLands(updatedLands);
      setNewParcel("");
    }
  };

  const [expandedLand, setExpandedLand] = useState(null);
  const [expandedBlock, setExpandedBlock] = useState(null);
  const [expandedPlot, setExpandedPlot] = useState(null);

  const toggleLand = (index) => {
    setExpandedLand(expandedLand === index ? null : index);
  };

  const toggleBlock = (landIndex, blockIndex) => {
    setExpandedBlock(
      expandedBlock === `${landIndex}-${blockIndex}`
        ? null
        : `${landIndex}-${blockIndex}`
    );
  };

  const togglePlot = (landIndex, blockIndex, plotIndex) => {
    setExpandedPlot(
      expandedPlot === `${landIndex}-${blockIndex}-${plotIndex}`
        ? null
        : `${landIndex}-${blockIndex}-${plotIndex}`
    );
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: success,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  };

  return (
    <div className="p-7 ">
      <div className=" flex justify-between">
        <h1>Land Management</h1>
        <button onClick={handleCreateLand}>+</button>
      </div>

      <div className="bg-[white] mt-5">
        <div className="mb-10">
          {lands?.map((land, landIndex) => (
            <div key={landIndex} className="p-4 border-b border-[#979797] mb-4">
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                  <div onClick={() => toggleLand(landIndex)}>
                    <img src={arrow} alt="arrow-down" />
                  </div>
                  <h2>{land.name}</h2>
                </div>
                <div className="flex">
                  {createBlock[landIndex] ? (
                    <div className="bg-[white] border  border-[#979797]">
                      <div className="flex p-2 relative">
                        <input
                          type="text"
                          value={newBlock}
                          onChange={(e) => setNewBlock(e.target.value)}
                          placeholder="Block Name"
                          style={{ outline: "none" }}
                        />
                        <p
                          onClick={() => {
                            handleCreateBlock(land._id);
                            setLottie(true);
                            setTimeout(() => {
                              const updatedCreateBlock = [...createBlock];
                              updatedCreateBlock[landIndex] = false;
                              setCreateBlock(updatedCreateBlock);
                            }, 2000);
                            setTimeout(() => {
                              setLottie(false);
                            }, 2000);
                          }}
                        >
                          {lottie ? (
                            <div className="absolute right-10 right-[-30px] bottom-[-30px]">
                              <Lottie
                                options={defaultOptions}
                                height={100}
                                width={100}
                              />
                            </div>
                          ) : (
                            "done"
                          )}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        const updatedCreateBlock = [...createBlock];
                        updatedCreateBlock[landIndex] = true;
                        setCreateBlock(updatedCreateBlock);
                      }}
                    >
                      <img src={action} alt="action" />
                    </button>
                  )}
                </div>
              </div>

              {expandedLand === landIndex && (
                <div className="ml-4 mt-2">
                  {land.blocks.map((block, blockIndex) => (
                    <div key={blockIndex} className="ml-4 mt-2">
                      <div className="flex justify-between mt-[20px]">
                        <div className="flex gap-2 items-center">
                          <div
                            onClick={() => toggleBlock(landIndex, blockIndex)}
                          >
                            <img src="arrow-down.svg" alt="arrow-down" />
                          </div>
                          <h3>{block.name}</h3>
                        </div>

                        <div className="flex">
                          {createPlot[blockIndex] ? (
                            <div className="bg-[white] border  border-[#979797]">
                              <div className="flex p-2 relative">
                                <input
                                  type="text"
                                  value={newPlot}
                                  onChange={(e) => setNewPlot(e.target.value)}
                                  placeholder="Plot Name"
                                  style={{ outline: "none" }}
                                />

                                <p
                                  onClick={() => {
                                    handleCreatePlot(landIndex, blockIndex);
                                    setLottie(true);
                                    setTimeout(() => {
                                      const updatedCreateBlock = [...createPlot];
                        updatedCreateBlock[landIndex] = false;
                        setCreatePlot(updatedCreateBlock);
                                    }, 2000);
                                    setTimeout(() => {
                                      setLottie(false);
                                    }, 2000);
                                  }}
                                >
                                  {lottie ? (
                                    <div className="absolute right-10 right-[-30px] bottom-[-30px]">
                                      <Lottie
                                        options={defaultOptions}
                                        height={100}
                                        width={100}
                                      />
                                    </div>
                                  ) : (
                                    "done"
                                  )}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <button
                      onClick={() => {
                        const updatedCreateBlock = [...createPlot];
                        updatedCreateBlock[landIndex] = true;
                        setCreatePlot(updatedCreateBlock);
                      }}
                    >
                      <img src="action.svg" alt="action" />
                    </button>
                          )}
                        </div>
                      </div>

                      {expandedBlock === `${landIndex}-${blockIndex}` && (
                        <div className="ml-4 mt-2">
                          {block.plots.map((plot, plotIndex) => (
                            <div key={plotIndex} className="ml-4 mt-2">
                              <div className="flex justify-between mt-[20px]">
                                <div className="flex gap-2 items-center">
                                  <div
                                    onClick={() =>
                                      togglePlot(
                                        landIndex,
                                        blockIndex,
                                        plotIndex
                                      )
                                    }
                                  >
                                    <img
                                      src="arrow-down.svg"
                                      alt="arrow-down"
                                    />
                                  </div>
                                  <h4>{plot.name}</h4>
                                </div>

                                <div className="flex">
                                  {createParcel[plotIndex] ? (
                                    <div className="bg-[white] border  border-[#979797]">
                                      <div className="flex p-2 relative">
                                        <input
                                          type="text"
                                          value={newParcel}
                                          onChange={(e) =>
                                            setNewParcel(e.target.value)
                                          }
                                          placeholder="Parcel Name"
                                          style={{ outline: "none" }}
                                        />
                                        <p
                                          onClick={() => {
                                            handleCreateParcel(
                                              landIndex,
                                              blockIndex,
                                              plotIndex
                                            );
                                            setLottie(true);
                                            setTimeout(() => {
                                              const updatedCreateBlock = [...createParcel];
                        updatedCreateBlock[plotIndex] = true;
                        setCreateParcel(updatedCreateBlock);
                                            }, 2000);
                                            setTimeout(() => {
                                              setLottie(false);
                                            }, 2000);
                                          }}
                                        >
                                          {lottie ? (
                                            <div className="absolute right-10 right-[-30px] bottom-[-30px]">
                                              <Lottie
                                                options={defaultOptions}
                                                height={100}
                                                width={100}
                                              />
                                            </div>
                                          ) : (
                                            "done"
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        const updatedCreateBlock = [...createParcel];
                        updatedCreateBlock[plotIndex] = true;
                        setCreateParcel(updatedCreateBlock);
                                      }}
                                    >
                                      <img src="action.svg" alt="action" />
                                    </button>
                                  )}
                                </div>
                              </div>
                              {expandedPlot ===
                                `${landIndex}-${blockIndex}-${plotIndex}` && (
                                <div className="ml-4 mt-2 mt-[20px]">
                                  {plot.parcels.map((parcel, parcelIndex) => (
                                    <div
                                      key={parcelIndex}
                                      className="ml-4 mt-2"
                                    >
                                      <p>{parcel.name}</p>
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
    </div>
  );
};

export default LandManagement;
