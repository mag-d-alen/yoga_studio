import React, { ChangeEvent } from "react";
import { FormInput } from "./InputField.styled";

export const Input: React.FC<{
  value: string;
  changeHandler: (e: any) => void;
  placeholder: string;
  type?: string;
}> = ({ value, changeHandler, type, placeholder }) => {
  return (
    <FormInput
      type={type ? type : "text"}
      onChange={changeHandler}
      value={value}
      placeholder={placeholder}
    />
  );
};
