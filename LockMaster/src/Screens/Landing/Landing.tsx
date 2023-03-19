import React from "react";
import "./Landing.css";
import { AiFillLock } from "react-icons/ai";
import Suggestions from "../../Components/Suggestions/Suggestions";
import Info from "../../Components/InfoPW/Info";

const Landing = () => {
  return (
    <>
      <div className="landing-container">
        <h1>Welcome!</h1>
        <div className="landing-content">
          <Info/>
        </div>
      </div>
    </>
  );
};

export default Landing;
