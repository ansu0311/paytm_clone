import { SendToUser } from "../Components/SendToUser";
import { ButtonSmall } from "../Components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo/flux-light.svg";
import union from "../assets/transfer/Union.svg";
import illustration from "../assets/transfer/illustration.svg";
import { AccountSelection } from "../Components/AccountSelection";
import { AmountTransfer } from "../Components/AmountTransfer";

const SendMoney = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [searchParams] = useSearchParams();
  const firstNameSend = searchParams.get("firstname");
  const LastNameSend = searchParams.get("lastname");
  const userIdSend = searchParams.get("id");
  const AuthToken = localStorage.getItem("token");

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
    <div className="bg-teal-900 h-screen flex">
      <div className="grid grid-cols-2 w-screen">
        <div className=" col-span-1 flex justify-center">
          <div className="flex flex-col justify-center z-10">
            <img src={logo} alt="logo" className="w-24 absolute top-6 left-6" />
            <div className="rounded-lg bg-teal-700/30 w-full gap-2 flex flex-col text-center py-10 h-max px-8">
              <SendToUser firstName={firstNameSend} lastName={LastNameSend} />
              <AccountSelection userId={userIdSend}/>
              <AmountTransfer
                onChange={(e) => setAmount(e.target.value)}
                placeholder={"Enter amount"}
              />
              <div className="flex justify-center">
              <ButtonSmall
                label={"Send"}
                onClick={() => {
                  axios.post(
                    `${process.env.PUBLIC_URL}/account/transfer`,
                    {
                      to: userIdSend,
                      from: userId,
                      amount: amount,
                      toFirstName: firstNameSend,
                      toLastName: LastNameSend,
                      fromFirstName: firstName,
                      fromLastName: lastName,
                    },
                    {
                      headers: {
                        authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  );
                  navigate("/Home");
                }}
              />
              <ButtonSmall
                label={"Cancel"}
                onClick={() => navigate("/Dashboard")}/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex justify-center z-10">
          <div className="flex flex-col justify-center">
            <img
              src={illustration}
              alt="design pic1"
              className="object-center w-full object-contain"
            />
          </div>
        </div>
        <img
          src={union}
          alt="design pic1"
          className=" absolute object-center left-0 z-1 h-screen w-7/12 object-cover"
        />
      </div>
    </div>
  );
};
export default SendMoney;
