import axios from "axios";
import { useEffect, useState } from "react";

export const Balance = () => {
  const [balance, setBalance] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(()=>{
    axios.get(`${process.env.PUBLIC_URL}/account/balance`,{
        headers:{
            Authorization: "Bearer "+ localStorage.getItem("token")
        }
    }).then((res)=>{
        setBalance(res.data.balance)
        setRefresh(false)
    })
    
  },[refresh])

    return <div className="flex my-4 z-0">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
        <button className="ml-2 border bg-purple-400 rounded-full p-0.5 " onClick={()=> setRefresh(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-white">
  <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg>

        </button>
    </div>
}