// LoginScreen.js

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthState, LoginData, UserType } from "../../types";
import { useLoginUserMutation } from "../../redux/api";
import { setCredentials } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../button/Button";
import { Input } from "../inputField/Input";

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
        const data: { access_token: string; message: string; user: UserType } =
          await user({
            email,
            password,
          }).unwrap();
        toast(data.message, {
          position: "top-center",
          onClose: () => navigate("/"),
        });
        dispatch(
          setCredentials({ access_token: data.access_token, user: data.user })
        );
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
      <Input changeHandler={(e) => setEmail(e.target.value)} placeholder="Email" value={email} />
      <Input
        type="password"
        changeHandler={(e) => setPassword(e.target.value)}
        placeholder="Password" value={password}      />

      <Button label="submit" clickHandler={onLogin} />
    </div>
  );
};
export default LoginScreen;
