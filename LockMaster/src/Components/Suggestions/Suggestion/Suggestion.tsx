import React from "react";
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";
import "./Suggestion.css";
import { Link, Path, To } from "react-router-dom";

interface SuggestionProps {
  title: String;
  path: To;
}

const Suggestion: React.FC<SuggestionProps> = ({ title, path }) => {
  return (
    <>
      <Link to={path}>
        <div className="suggestion-container">
          <h4>{title}</h4>
          <BsFillArrowUpRightSquareFill size={30} />
        </div>
      </Link>
    </>
  );
};

export default Suggestion;
