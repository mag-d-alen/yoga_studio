import React, { useState } from "react";
import { YogaClassType } from "../types";
import { YogaClassContainer } from "./yogaClass/YogaClass.styled";
import { YogaClass } from "./yogaClass/YogaClass";
import { YogaClassDetails } from "./yogaClass/YogaClassDetails";
import { YogaClassesContainer } from "./yogaClasses/YogaClassContainer";
import { useGetYogaClassesQuery } from "../redux/api";

export const YogaClasses: React.FC = () => {
  const { isLoading, data } = useGetYogaClassesQuery([]);
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const openModal = (classType: string) => setModalOpen(classType);
  return (
    <div>
      <h2>Welcome to The Seven Paths Yoga Studio</h2>
      <YogaClassesContainer>
        {data
          ? data.map((yogaClass: YogaClassType) =>
              modalOpen === yogaClass.class_type ? (
                <YogaClassDetails
                  key={yogaClass.id}
                  close={() => setModalOpen(null)}
                  yogaClass={yogaClass}
                />
              ) : (
                <YogaClassContainer
                  onClick={() => openModal(yogaClass.class_type)}>
                  <YogaClass key={yogaClass.id} yogaClass={yogaClass} />
                </YogaClassContainer>
              )
            )
          : null}
        {isLoading ? <div>classes are coming...</div> : null}
      </YogaClassesContainer>
    </div>
  );
};
