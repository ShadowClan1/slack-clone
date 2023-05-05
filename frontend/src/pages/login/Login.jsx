import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { login } from "../redux/slices/user";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../localstorage manger/localstorage";
import data from "./config.json";
import { io } from "socket.io-client";
import { socket } from "../../socket.io/socket";
import { login } from "../../redux/slices/user";

const Login = () => {
  const u = useSelector((state) => state.user);
  console.log(u);
  const navigate = useNavigate();
  const [signup, setSignup] = useState(false);

  const user = useSelector((state) => state.user);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    type: "",
  });
  const dispatch = useDispatch();
  const change = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    // return console.log(credentials)
    if (credentials.email.length > 3) {
      dispatch(login({ email: credentials.email }));
    }
setTimeout(() => {
    if(getUser()) navigate('/home')

}, 3000);

  };
  const handleSignup = () => {
    if (signup) setSignup(false);
    else setSignup(true);
  };

  useEffect(() => {
    if (getUser()) navigate("/home");
  }, []);
  socket.on("connection", (socket) => {
    console.log("im connected");
  });
  return (
    <div className=" w-screen h-screen flex flex-row justify-center md:justify-start  items-center relative">
      <div className="absolute top-0 -z-10">
        <img
          src="https://i.pcmag.com/imagery/reviews/06ZvTNln3Toz309WtTLDiwP-25.fit_scale.size_760x427.v1652212718.jpg"
          className="w-screen h-screen"
        />
      </div>

      <div
        className="flex flex-col  items-top bg-white  bg-opacity-50 backdrop-blur-xl rounded-2xl gap-4 py-10 px-3  md:ml-36 "
        style={{ transitionDuration: "0.8s" }}
      >
        <div className="flex flex-row items-center justify-center ">
          <img
            src="https://hindubabynames.info/downloads/wp-content/themes/hbn_download/download/education-companies/iit-roorkee-logo.png"
            alt=""
            className="w-32 animate-spin"
            style={{ animationDuration: "60s" }}
          />
        </div>

        <input
          type="text"
          onChange={change}
          className=" bg px-3 py-2 rounded-md"
          name="email"
          placeholder="Email"
        />
        {signup && (
          <>
            <input
              type="text"
              onChange={change}
              className=" bg px-3 py-2 rounded-md"
              name="name"
              placeholder="Name"
            />
          </>
        )}

        <button
          onClick={handleLogin}
          className="bg-red-400 text-white  px-3 py-2 rounded-3xl hover:scale-105 "
          style={{ transitionDuration: "0.5s" }}
        >
          {signup ? "Sign up" : "login"}
        </button>

        <div className="text-center text-">OR</div>

        <button
          onClick={handleSignup}
          className=" text-blue-500 text-sm hover:scale-125 "
          style={{ transitionDuration: "0.5s" }}
        >
          {!signup ? "Sign up" : "login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
