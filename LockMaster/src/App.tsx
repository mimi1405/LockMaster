import React from "react";
import Landing from "./Screens/Landing/Landing";
import { Routes, Route } from "react-router-dom";
import CreateNewPassword from "./Screens/CreateNewPW/CreateNewPassword";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/cnp" element={<CreateNewPassword/>} />
      </Routes>
    </>
  );
};

export default App;
