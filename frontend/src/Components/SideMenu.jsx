import logo from "../assets/logo/flux-light.svg";
import { ButtonMenu } from "./Button";
import { useNavigate } from "react-router-dom";

export const SideMenu = ({children , setPage,page}) => {

  const navigate = useNavigate()

  return (
    <div className='bg-[#242424] h-screen text-white grid grid-cols-5'>
        <div className='bg-teal-900/30 col-span-1 flex'>
        <div className="flex flex-col justify-center z-10">
            <img src={logo} alt="logo" className="w-16 absolute top-6 left-6" />
            <div className="flex flex-col px-4 h-screen justify-between">
                <div className="pt-20">
                <ButtonMenu page={page} label={"Dashboard"} onClick={()=>setPage("Dashboard")} />
                <ButtonMenu page={page} label={"Analytics"} onClick={()=>setPage("Analytics")} />
                <ButtonMenu page={page} label={"Profile"} onClick={()=>setPage("Profile")} />
                </div>
                <div>
                    <ButtonMenu label={"Logout"} onClick={()=>{
                      localStorage.removeItem("token")
                      navigate("/Signin")}} />
                </div>
            </div>
          </div>
        </div>
        <div className='col-span-4 p-6'>
        {children}
        </div>
    </div>
  )
}
