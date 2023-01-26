import React from "react";
import { CloseButtonWrapper } from "./Button.styled";

export const CloseButton: React.FC<{ clickHandler: () => void }> = ({
  clickHandler,
}) => {
  return (
    <CloseButtonWrapper onClick={clickHandler}>x</CloseButtonWrapper>
  );
};
