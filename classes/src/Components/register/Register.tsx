import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Register = () => {
  const [first_name, setFirst_name] = useState<string>("");
  const [last_name, setLast_name] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const url = "/register";
  const registerUser = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axios.post(url, {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
      });
      if (result.status === 200) console.log(`Welcome ${first_name}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Link to={"/"}>Home</Link>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "20rem",
          margin: "auto",
        }}
        onSubmit={registerUser}>
        <input
          onChange={(e) => setFirst_name(e.target.value)}
          value={first_name}></input>
        <input
          onChange={(e) => setLast_name(e.target.value)}
          value={last_name}></input>

        <input onChange={(e) => setEmail(e.target.value)} value={email}></input>

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}></input>

        <button type="submit">submit</button>
      </form>
    </div>
  );
};
