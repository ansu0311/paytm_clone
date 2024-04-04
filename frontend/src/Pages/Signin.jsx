import React, { useEffect, useState } from "react";
import { ButtonSmall } from "../Components/Button";
import { InputBox } from "../Components/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import union from "../assets/signin/Union.svg";
import subtract from "../assets/signin/Subtract.svg";
import buttonCut from "../assets/signin/button.svg";
import logo from "../assets/logo/flux-light.svg";

const Signin = () => {
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const AuthToken = localStorage.getItem("token");

  if (AuthToken) {
    useEffect(() => {
      axios
        .get(`${process.env.PUBLIC_URL}/user/`, {
          headers: {
            Authorization: "Bearer " + AuthToken,
          },
        })
        .then((res) => {
          setFirstName(res.data.firstName);
          navigate("/Home");
        })
        .catch((err) => {
          localStorage.removeItem("token");
        });
    }, [AuthToken]);
  }

  return (
    <div className="bg-teal-900 h-screen flex">
      <div className="grid grid-cols-2 w-screen">
        <div className="col-span-1 flex">
          <div className="flex flex-col justify-center z-10">
            <img src={logo} alt="logo" className="w-24 absolute top-6 left-6" />
            <div className=" ml-5 w-1/2 text-white text-6xl font-bold">Send money as easily as sending a text</div>
          </div>
        </div>
        <div className=" col-span-1 flex justify-center">
          <div className="flex flex-col justify-center z-10">
            <div className="absolute top-14 right-0 text-xl font-bold text-white">
              <button className="mr-8 text-teal-300 hover:text-white" onClick={()=>{navigate("/Signup")}}>
                Signup</button>
              <button className="mr-8 text-[#242424] cursor-default">Signin</button>
            </div>
            <div className="bg-transparent w-96 text-center h-max px-4">
              <InputBox
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <InputBox
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <div className="pt-4">
                <ButtonSmall
                  label={"Signin"}
                  onClick={async () => {
                    const response = await axios.post(
                      `${process.env.PUBLIC_URL}/user/signin`,
                      {
                        username,
                        password,
                      }
                    );
                    localStorage.setItem("token", response.data.token);
                    navigate("/Home");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img
          src={subtract}
          alt="design pic1"
          className=" absolute object-center right-0 z-1 h-screen w-7/12 object-cover"
        />
        <img
          src={union}
          alt="design pic2"
          className=" absolute object-center right-0 z-2 h-screen w-6/12 object-cover"
        />
        <img
          src={buttonCut}
          alt="design pic3"
          className=" absolute object-center top-5 right-0 z-3"
        />
      </div>
    </div>
  );
};

export default Signin;
