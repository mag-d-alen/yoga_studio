import React from "react";
import { YogaClassType } from "../../types";
import { YogaClassDetailsContainer } from "./YogaClass.styled";


export const YogaClassDetails: React.FC<{
  yogaClass: YogaClassType;
  close: () => void;
}> = ({ yogaClass, close }) => {
  const { class_type, teacher_name, description } = yogaClass;

  return (
    <YogaClassDetailsContainer>
      <button onClick={close}>close</button>
      <h2>{class_type}</h2>
      <p>Home star : {teacher_name}</p>
      <p>{description}</p>

      <button>delete</button>
      <button>update</button>
    </YogaClassDetailsContainer>
  );
};
