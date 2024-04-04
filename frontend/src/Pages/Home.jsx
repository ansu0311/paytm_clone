import React, { useEffect, useState } from "react";
import { SideMenu } from '../Components/SideMenu'
import Dashboard from './Dashboard'
import { Analytics } from './Analytics'
import { Profile } from './Profile'
import  Users  from '../Components/Users'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [page,setPage] = useState("Dashboard")
  const [pageBill, setPageBill] = useState("Received");

  const [firstName, setFirstName] = useState("User");
  const [lastName, setLastName] = useState(" ");
  const [userId, setUserId] = useState(" ");
  const navigate = useNavigate();
  const AuthToken = localStorage.getItem("token");
  const [transaction, setTransaction] = useState([]);
  const [filter, setFilter] = useState("");
  const [balance, setBalance] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(()=>{
    axios
      .get(`${process.env.PUBLIC_URL}/transaction/bulk?filter=` + filter, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTransaction(res.data.transactions.reverse());
      })
      .catch((err) => console.error(err));

    axios.get(`${process.env.PUBLIC_URL}/account/balance`,{
        headers:{
            Authorization: "Bearer "+ localStorage.getItem("token")
        }
    }).then((res)=>{
        setBalance(res.data.balance)
        setRefresh(false)
    })
    
  },[refresh])

  useEffect(() => {
    axios
      .get(`${process.env.PUBLIC_URL}/user/`, {
        headers: {
          Authorization: "Bearer " + AuthToken,
        },
      })
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setUserId(res.data.userId);
      })
      .catch((err) => {
        navigate("/Signin");
      });
  }, []);

  return (
    <SideMenu setPage={setPage} page={page} >
        {(page === "Dashboard")?<Dashboard setRefresh={setRefresh} setPage={setPage} balance={balance} transaction={transaction.slice(0,10)} setFilter={setFilter} firstName={firstName} lastName={lastName} userId={userId}/>
        :(page === "Analytics")?<Analytics pageBill={pageBill} setPageBill={setPageBill} transaction={transaction} userId={userId}/>:(page === "Profile")?<Profile firstName={firstName} lastName={lastName} userId={userId}/>:<Users/>}
    </SideMenu>
  )
}

export default Home