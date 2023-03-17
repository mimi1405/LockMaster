import React from "react";
import "./Suggestions.css";
import Suggestion from "./Suggestion/Suggestion";
import { Path } from "react-router-dom";

interface SuggestionsProps {}

const Suggestions: React.FC<SuggestionsProps> = ({}) => {

  return (
    <>
      <div className="suggestions-container">
        <h3>Suggestions for today</h3>
        <div>
          <Suggestion title="Show passwords" path="/passwords" />
          <Suggestion title="Create new password" path="/cnp" />
        </div>
      </div>
    </>
  );
};

export default Suggestions;
