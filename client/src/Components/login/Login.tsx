import React from "react";
import LoginScreen from "./LoginScreen";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <LoginScreen />
      <button onClick={() => navigate("/register")}>create account </button>
    </div>
  );
};
