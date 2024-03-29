import React, { useEffect, useState } from "react";
import { SubHeading } from "../Components/SubHeading";
import { Heading } from "../Components/Heading";
import { BottomWarning } from "../Components/BottomWarning";
import { Button } from "../Components/Button";
import { InputBox } from "../Components/InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [firstNameUser,setFirstNameUser] = useState("")
  const [firstName,setFirstName] = useState("")
  const navigate = useNavigate()
  const [lastName,setLastName] = useState("")
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")


  const AuthToken = localStorage.getItem("token")


  if(AuthToken){
    useEffect(()=>{
      axios.get(`${process.env.PUBLIC_URL}/user/`,{
        headers:{
          Authorization:"Bearer " + AuthToken
        }
      }).then((res)=>{
        setFirstNameUser(res.data.firstName)
        navigate("/Dashboard")
      }).catch(err =>{
        localStorage.removeItem("token");
      })
    },[AuthToken])
    }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
          <InputBox onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
          <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="Email" />
          <div className="pt-4">
            <Button label={"Sign up"} onClick={async () =>{
              const response = await axios.post(`${process.env.PUBLIC_URL}/user/signup`,{
                firstName,
                lastName,
                username,
                password
              })
              localStorage.setItem("token",response.data.token)
              navigate("/Dashboard")
            }} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
