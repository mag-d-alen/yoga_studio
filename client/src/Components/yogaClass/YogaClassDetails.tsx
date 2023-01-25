import React from "react";
import { YogaClassType } from "../../types";
import { YogaClassDetailsContainer } from "./YogaClass.styled";
import { useBookClassMutation, useGetClassDetailsQuery } from "../../redux/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "../button/Button";
import { CloseButton } from "../button/CloseButton";
export const YogaClassDetails: React.FC<{
  yogaClass: YogaClassType;
  close: () => void;
}> = ({ yogaClass, close }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((s: any) => s.auth.user);
  const { data, isLoading } = useGetClassDetailsQuery(yogaClass.class_type);
  const [bookclassrequest, { error, isLoading: isBookLoading }] =
    useBookClassMutation();

  const bookClass = async () => {
    try {
      let yoga = yogaClass.class_type;
      let email = currentUser.email;
      const result = await bookclassrequest({
        classType: yoga,
        email,
      }).unwrap();
      toast(result.message, {
        position: "top-center",
        onClose: () => navigate("/"),
      });
    } catch (error: any) {
      toast(error.data.message, { position: "top-center" });
    }
  };
  return (
    <YogaClassDetailsContainer>
      <CloseButton clickHandler={close} />
      <ToastContainer />
      {isLoading ? <div>Loading</div> : null}
      {data ? (
        <>
          <h2>{data.message.class_type}</h2>
          <p>Taught by: {data.message.teacher_name}</p>
          <p>{data.message.description}</p>
          {data.message.participants ? (
            <p>Participants: {data.message.participants}</p>
          ) : null}
          {currentUser ? (
            <Button
              label={`Book the ${data.message.class_type} class`}
              clickHandler={bookClass}
            />
          ) : (
            <Button
              label={"Log in to book the class"}
              clickHandler={() => navigate("/login")}
            />
          )}
        </>
      ) : null}
    </YogaClassDetailsContainer>
  );
};
