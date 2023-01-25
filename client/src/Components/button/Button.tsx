import React from "react";
import { ButtonWrapper } from "./Button.styled";

export const Button: React.FC<{
  label: string;
  clickHandler: () => void;
  type?: "button" | "submit" | "reset";
}> = ({ label, clickHandler = () => {}, type = "button" }) => {
  return (
    <ButtonWrapper type={type ? type : "button"} onClick={clickHandler}>
      {label}
    </ButtonWrapper>
  );
};
