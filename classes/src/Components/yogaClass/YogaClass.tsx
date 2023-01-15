import React, {  useState } from "react";
import { YogaClassType } from "../../types";
import { YogaClassContainer } from "./YogaClass.styled";




export const YogaClass: React.FC<{
  yogaClass: YogaClassType;
  open: (name:string) => void;
}> = ({ yogaClass, open }) => {
  const { class_type, teacher_name } = yogaClass;

  return (
    <YogaClassContainer onClick={(e) => open(class_type)}>
      <h2>{class_type}</h2>
      <p>Teacher :{teacher_name}</p>
    </YogaClassContainer>
  );
};
