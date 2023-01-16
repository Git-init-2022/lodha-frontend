import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loaderClass">
      <div className="loading">
        <div></div>
      </div>
      <span style={{ letterSpacing: "1px", fontSize: "40px", color: "#675A0E" }}>
        Loading
      </span>
      <p style={{ letterSpacing: "1px", fontSize: "25px", color: "black" }}>
        Please wait until the page is loaded.
      </p>
    </div>
  );
};

export default Loader;