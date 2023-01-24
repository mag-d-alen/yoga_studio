import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/api";
import { is } from "immer/dist/internal";
import { GenericResponse } from "../../types";
import { useNavigate } from "react-router-dom";

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

          <button onClick={handleOnClick}>Go back</button>
        </div>
      ) : (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "20rem",
            margin: "auto",
          }}
          onSubmit={e=>register}>
          <input
            onChange={(e) => setFirst_name(e.target.value)}
            value={first_name}></input>
          <input
            onChange={(e) => setLast_name(e.target.value)}
            value={last_name}></input>

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}></input>

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}></input>

          <button type="submit">submit</button>
        </form>
      )}
    </>
  );
};
