import React, { useState } from "react";
import { useYogaClasses } from "../hooks/useYogaClasses";
import { YogaClassType } from "../types";
import { YogaClassContainer } from "./yogaClass/YogaClass.styled";
import { YogaClass } from "./yogaClass/YogaClass";
import { YogaClassDetails } from "./yogaClass/YogaClassDetails";
import { YogaClassesContainer } from "./yogaClasses/YogaClassContainer";

export const YogaClasses: React.FC = () => {
  const yogaClasses = useYogaClasses();
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  return (
    <div>
      <h2>Welcome to The Seven Paths Yoga Studio</h2>
      <YogaClassesContainer>
        {yogaClasses.length ? (
          yogaClasses.map((yogaClass: YogaClassType) =>
            modalOpen === yogaClass.class_type ? (
              <YogaClassDetails
                key={yogaClass.id}
                close={() => setModalOpen(null)}
                yogaClass={yogaClass}
              />
            ) : (
              <YogaClass
                key={yogaClass.id}
                open={(name: string) => setModalOpen(name)}
                yogaClass={yogaClass}
              />
            )
          )
        ) : (
          <div>classes are coming...</div>
        )}
      </YogaClassesContainer>
    </div>
  );
};
