import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Heading } from "./Heading";

export const Appbar = ({ firstName, lastName }) => {
  const initials = firstName[0] + lastName[0];
  const navigate = useNavigate()

  return (
    <div className="shadow h-auto flex justify-between">
      <Heading label={"PayTM App"} />
      <div className="flex  align-middle">
        <div className="flex h-full justify-center align-middle">
          <div className="flex flex-col m-3 text-white text-xl w-12 h-12 bg-rose-400 rounded-full items-center justify-center"
          >{initials}
          </div>
          <button className="flex justify-center w-20 h-10 m-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={()=>{
          localStorage.removeItem("token")
          navigate("/Signin")
        }}>Logout</button>
        </div>
        
        </div>
      </div>
  );
};
