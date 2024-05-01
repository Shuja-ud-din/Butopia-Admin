import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Login from "./pages/Login";
import { SkeletonTheme } from "react-loading-skeleton";
import Dashboard from "./screens/Dashboard";

function App() {
  return (
    <>
      <SkeletonTheme baseColor="#f6f6f6" highlightColor="#ECECEC">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/*" element={<Dashboard />} />
          </Routes>
        </Router>
      </SkeletonTheme>
    </>
  );
}

export default App;
