import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/UserSlice";
import { Button, Input } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate()
  const dispatch = useDispatch();
  const auth = getAuth(app);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          addUser({
            authtoken: user.stsTokenManager.accessToken,
            email: user.email,
            name:user.email.split("@")[0]
          })
        );
        // sessionStorage.setItem('token',user.accessToken)
        window.location.replace("/dashboard");
        console.log("loggedin", user);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className=" col-span-6 grid grid-cols-2">
      <div className="order-1 mx-auto my-auto ">
        <Title className="py-10">Login</Title>
        <div>
          <label level={5} htmlFor="Email" className="text-sm my-2">
            Email
          </label>
          <br />
          <Input
            placeholder="Email..."
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {/* <input
            className="border rounded p-2"
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />{" "} */}
        </div>{" "}
        <br />
        <div>
          <label htmlFor="" className="text-sm ">
            Password
          </label>{" "}
          <Input.Password
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password..."
          />
          {/* <input
            className="border rounded p-2"
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />{" "} */}
        </div>{" "}
        <br />
        <Button
          type="primary"
          onClick={handleLogin}
          className="my-2 bg-blue-400"
        >
          Login
        </Button>
        <a href="/createuser" className="mx-2">
          {" "}
          Create a new account?
        </a>
      </div>
      <div className=" w-full h-screen bg-green-500 flex justify-center">
        <p className="my-auto font-semibold text-[90px] text-white">Hotel Managment System</p>
      </div>
    </div>
  );
};

export default Login;
