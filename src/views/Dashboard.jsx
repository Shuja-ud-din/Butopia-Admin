import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<>Hi admin</>} />
      </Routes> */}

      <div className="w-full min-h-screen">
        <div className="h-10 w-10 bg-primary"></div>
        <Header />
      </div>
    </>
  );
};

export default Dashboard;
