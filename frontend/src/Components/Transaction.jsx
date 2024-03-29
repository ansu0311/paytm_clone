import React, { Suspense, useEffect, useState } from "react";
import { InputBox } from "./InputBox";
import { DashBoardUser } from "./DashBoardUser";
import axios from "axios";

const Transaction = ({ nowUserId }) => {
  const [transaction, setTransaction] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.PUBLIC_URL}/transaction/bulk?filter=` + filter, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTransaction(res.data.transactions);
      })
      .catch((err) => console.error(err));
  }, [filter]);

  return (
    <>
      <InputBox
        placeholder={"Search users..."}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Suspense fallback={<div>Loading</div>}>
          <div className="flow-root px-8">
            <ul role="list" className="divide-y divide-slate-500">
              {transaction.map((transaction, index) => (
                <TransactionFormat
                  key={index}
                  nowUserId={nowUserId}
                  transaction={transaction}
                />
              ))}
            </ul>
          </div>
      </Suspense>
    </>
  );
};

function TransactionFormat({ transaction, nowUserId }) {

const sender =(nowUserId === transaction.toAccount)
const success =(transaction.completed)
  const initials = (sender?transaction.fromFirstName[0]:transaction.toFirstName[0]) + (sender?transaction.fromLastName[0]:transaction.toLastName[0]);
  const fullName = (sender?transaction.fromFirstName:transaction.toFirstName) + " " + (sender?transaction.fromLastName:transaction.toLastName);

  return (
    <li className="py-2">
      <div className="items-center grid grid-cols-4">
        <div className="flex flex-row items-center gap-2 m-2 col">
          <div className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center">
            <span className="text-xl text-white">{initials}</span>
          </div>
          <div className="text-l">{fullName}</div>
        </div>
        <div className="text-black flex-col">
            <div className="text-sm font-semibold">{transaction.date}</div>
            <div className="text-xs">{transaction.time.toUpperCase()}</div>
        </div>
        <div className="flex-col">
          <div className="font-semibold text-sm">Transaction Status: {(success)?"Successful":"Failed"}</div>
          <div className={(success)?"text-xs text-green-800":"text-xs text-red-800"}>Message: {transaction.message}</div>
        </div>
        <div className={(sender)?"font-semibold text-right px-5 text-green-800":"font-semibold text-right px-5 text-red-800"}>
        {(sender)?"+":"-"} ₹{transaction.amount}
        </div>
      </div>
    </li>
  );
}

export default Transaction;
