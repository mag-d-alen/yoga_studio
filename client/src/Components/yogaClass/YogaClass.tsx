import React, { useState } from "react";
import { YogaClassType } from "../../types";
import { YogaClassContainer } from "./YogaClass.styled";

export const YogaClass: React.FC<{
  yogaClass: YogaClassType;
}> = ({ yogaClass }) => {
  const { class_type, teacher_name } = yogaClass;

  return (
    <>
      <h2>{class_type}</h2>
      <p>Teacher :{teacher_name}</p>
    </>
  );
};
