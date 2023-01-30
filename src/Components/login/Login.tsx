import React from "react";
import LoginScreen from "./LoginScreen";
import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";

export const Login = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <LoginScreen />
    </div>
  );
};
