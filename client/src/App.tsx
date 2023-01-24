import React from "react";

import { Route, Routes } from "react-router-dom";
import { Register } from "./Components/register/Register";
import { YogaClasses } from "./Components/YogaClasses";
import { Navbar } from "./Components/navbar/Navbar";
import { AboutYoga } from "./Components/aboutYoga/AboutYoga";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Login } from "./Components/login/Login";

const App = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route path="/" element={<YogaClasses />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/about_yoga" element={<AboutYoga />}></Route>
      </Routes>
    </Provider>
  );
};

export default App;
