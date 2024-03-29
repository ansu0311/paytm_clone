import React, { Suspense, useEffect, useState } from "react";
import { Appbar } from "../Components/Appbar";
import { Balance } from "../Components/Balance";
import { Users } from "../Components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashBoardBody from "../Components/DashBoardBody";
import Transaction from "../Components/Transaction";

const Dashboard = () => {

  const [firstName, setFirstName] = useState("User");
  const [lastName, setLastName] = useState(" ");
  const [userId, setUserId] = useState(" ");
  const navigate = useNavigate()
  const AuthToken = localStorage.getItem("token")


  useEffect(()=>{
    axios.get(`${process.env.PUBLIC_URL}/user/`,{
      headers:{
        Authorization:"Bearer " + AuthToken
      }
    }).then((res)=>{
      setFirstName(res.data.firstName)
      setLastName(res.data.lastName)
      setUserId(res.data.userId)
    }).catch(err =>{
      navigate("/Signin")
    })
},[])

  return (
    <div className="bg-slate-300 h-screen flex flex-col p-8">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white text-center p-2 h-max px-4">
          <Appbar firstName={firstName} lastName={lastName} />
          <Balance/>
          <DashBoardBody userTab={<Users/>} transactionTab={<Transaction nowUserId={userId}/>}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
