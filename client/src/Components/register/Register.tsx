import React, { useState } from "react";
import { useRegisterUserMutation } from "../../redux/api";
import { useNavigate } from "react-router-dom";
import { Button } from "../button/Button";
import { Input } from "../inputField/Input";

export const Register = () => {
  const [first_name, setFirst_name] = useState<string>("");
  const [last_name, setLast_name] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [response, setResponse] = useState<{
    message?: string;
    status?: number;
  }>({});

  const [newUser, { isLoading, error }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const onRegisterUser = async () => {
    if ([first_name, last_name, email, password].every(Boolean) && !isLoading) {
      try {
        const data = await newUser({
          first_name,
          last_name,
          email,
          password,
        }).unwrap();
        clear();
        setResponse({ message: data.message, status: 200 });
      } catch (error: any) {
        clear();
        setResponse({ message: error.data.message, status: 409 });
      }
    }
  };

  const clear = () => {
    setFirst_name("");
    setLast_name("");
    setEmail("");
    setPassword("");
  };

  const handleOnClick = () => {
    response.status === 200 ? navigate("/") : setResponse({});
  };

  const register = (e: SubmitEvent) => {
    e.preventDefault();
    onRegisterUser();
  };
  return (
    <>
      {response.message ? (
        <div>
          {response.message}
          <Button label={"Go back"} clickHandler={handleOnClick} />
        </div>
      ) : (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "20rem",
            margin: "auto",
          }}
          onSubmit={(e) => register}>
          <Input
            placeholder={"first name"}
            changeHandler={(e) => setFirst_name(e.target.value)}
            value={first_name}></Input>
          <Input
            placeholder={"last name"}
            changeHandler={(e) => setLast_name(e.target.value)}
            value={last_name}></Input>

          <Input
            placeholder={"email"}
            changeHandler={(e) => setEmail(e.target.value)}
            value={email}></Input>

          <Input
            placeholder={"password"}
            changeHandler={(e) => setPassword(e.target.value)}
            value={password}></Input>
          <Button type="submit" label={"submit"} clickHandler={() => {}} />
        </form>
      )}
    </>
  );
};
