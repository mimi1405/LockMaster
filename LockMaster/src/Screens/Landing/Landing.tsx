import React from "react";
import "./Landing.css";
import { AiFillLock } from "react-icons/ai";
import Suggestions from "../../Components/Suggestions/Suggestions";
import Info from "../../Components/InfoPW/Info";

const Landing = () => {
  return (
    <>
      <div className="landing-container">
        <div className="title-box">
          <h1>LockMaster</h1>
          <AiFillLock
            style={{ marginLeft: "10px", marginTop: "5px" }}
            size={25}
          />
        </div>
        <div className="landing-content">
          <Suggestions />
          <Info/>
        </div>
      </div>
    </>
  );
};

export default Landing;
