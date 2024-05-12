import React from "react";
import "./Loader.css";

const Loader = ({ size = 50, color = "#09373d", weight = 70 }) => {
  return (
    <>
      <div
        className="loader"
        style={{
          width: `${size}px`,
          background: `radial-gradient(farthest-side, ${color} ${weight}%, #0000) top/8px 8px
        no-repeat,
      conic-gradient(#0000 30%, ${color})`,
        }}
      ></div>
    </>
  );
};

export default Loader;
