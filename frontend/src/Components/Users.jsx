import { Suspense, useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { DashBoardUser } from "./DashBoardUser";
import { InputBox } from "./InputBox";
import { useNavigate } from "react-router-dom";


export const Users = () => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(()=>{
        axios.get(`${process.env.PUBLIC_URL}/user/bulk?filter=`+filter,{
            headers:{
                authorization:("Bearer " + localStorage.getItem("token"))
            }
        }).then((res)=>{
            setUsers(res.data.users)
        }).catch((err) => console.error(err));
    },[filter])

    return <>
        <InputBox onChange={(e)=>setFilter(e.target.value)} placeholder={"Search users..."} />
        <Suspense fallback={<div>Loading</div>}>
        <div>
            {users.map((user,index) => <User key={index} user={user}/>)}
        </div>
        </Suspense>
    </>
}

function User({user}) {

    const navigate = useNavigate()

    return <div className="flex justify-between my-3">
            <DashBoardUser firstName={user.firstName} lastName={user.lastName} />

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"} onClick={(e)=>navigate("/send?id=" + user._id +"&firstname="+ user.firstName+"&lastname=" + user.lastName)}/>
        </div>
    </div>
}