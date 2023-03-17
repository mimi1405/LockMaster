import React from "react";
import Landing from "./Screens/Landing/Landing";
import { Routes, Route } from "react-router-dom";
import CreateNewPassword from "./Screens/CreateNewPW/CreateNewPassword";
import Passwords from "./Screens/Read/Passwords";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/cnp" element={<CreateNewPassword/>} />
        <Route path="/passwords" element={<Passwords/>} />
      </Routes>
    </>
  );
};

export default App;
