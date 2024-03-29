import { Heading } from "../Components/Heading";
import { SendToUser } from "../Components/SendToUser";
import { InputBox } from "../Components/InputBox";
import { ButtonGreen } from "../Components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Send Money"} />
          <SendToUser firstName={firstNameSend} lastName={LastNameSend} />
          <InputBox
            onChange={(e) => setAmount(e.target.value)}
            placeholder={"Enter amount"}
          />
          <ButtonGreen
            label={"Initiate Transfer"}
            onClick={() => {
              axios
                .post(
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
                      authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                )
                navigate("/Dashboard");

            }}
          />
        </div>
      </div>
    </div>
  );
};
export default SendMoney;
