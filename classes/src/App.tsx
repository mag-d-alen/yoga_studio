import React from "react";

import { Route, Router, Routes } from "react-router-dom";
import { Register } from "./Components/register/Register";
import { YogaClasses } from "./Components/YogaClasses";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<YogaClasses />}></Route>\
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<YogaClasses />}></Route>
    </Routes>
  );
};

export default App;
