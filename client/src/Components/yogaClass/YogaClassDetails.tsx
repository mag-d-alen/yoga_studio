import React from "react";
import { YogaClassType } from "../../types";
import { YogaClassDetailsContainer } from "./YogaClass.styled";
import { useGetClassDetailsQuery } from "../../redux/api";

export const YogaClassDetails: React.FC<{
  yogaClass: YogaClassType;
  close: () => void;
}> = ({ yogaClass, close }) => {
  const { data, isLoading } = useGetClassDetailsQuery(yogaClass.class_type);

  return (
    <YogaClassDetailsContainer>
      <button onClick={close}>close</button>

      {isLoading ? <div>Loading</div> : null}
      {data ? (
        <>
          <h2>{data.message.class_type}</h2>
          <p>Taught by: {data.message.teacher_name}</p>
          <p>{data.message.description}</p>
          {data.message.participants ? (
            <p>Participants: {data.message.participants}</p>
          ) : null}
          <button>Book the {data.message.class_type} class</button>
        </>
      ) : null}
    </YogaClassDetailsContainer>
  );
};
