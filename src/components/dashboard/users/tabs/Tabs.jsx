import React, { useState } from "react";
import Tab from "./Tab";

function Tabs({ activeTab, setActiveTab, setCount }) {
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex gap-6 mt-5 mb-0">
      <Tab
        name="All Users"
        active={activeTab === "All"}
        onClick={() => {
          handleTabClick("All");
          setCount(1);
        }}
      />
      <Tab
        name="Pending Users"
        active={activeTab === "Pending"}
        onClick={() => {
          handleTabClick("Pending");
          setCount(1);
        }}
      />
      <Tab
        name="Business Owners"
        active={activeTab === "businessOwners"}
        onClick={() => {
          handleTabClick("businessOwners");
          setCount(1);
        }}
      />
    </div>
  );
}

export default Tabs;
