// LoginScreen.js

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthState, LoginData } from "../../types";
import { useLoginUserMutation } from "../../redux/api";
import { setCredentials } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginScreen = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loginData, setLoginData] = useState<LoginData>();
  const [responseError, setResponseError] = useState<string>("");
  const navigate = useNavigate();

  const [user, { isLoading, error }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const onLogin = async () => {
    if ([email, password].every(Boolean) && !isLoading) {
      try {
        const data: { access_token: string; message: string } = await user({
          email,
          password,
        }).unwrap();
        toast(data.message, { position: "top-center" });
        dispatch(setCredentials({ access_token: data.access_token }));
      } catch (error: any) {
        toast(error.data.message, {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "20rem",
        margin: "auto",
      }}>
      <ToastContainer />
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button onClick={() => onLogin()}>Submit</button>
    </div>
  );
};
export default LoginScreen;
