import React, { Suspense, useEffect, useState } from "react";
import { InputBox } from "./InputBox";

const Transaction = ({ transaction, nowUserId, menu }) => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState(transaction);

  useEffect(() => {
    const newList = transaction.filter((item) => {
      return (
        item.toFirstName.toLowerCase().includes(filter.toLowerCase()) ||
        item.toLastName.toLowerCase().includes(filter.toLowerCase())
      );
    });
    setSearch(newList);
  }, [filter]);

  return (
    <>
      {menu ? (
        <></>
      ) : (
        <InputBox
          placeholder={"Search users..."}
          onChange={(e) => setFilter(e.target.value)}
        />
      )}
      <Suspense fallback={<div>Loading</div>}>
        <div className="flow-root">
          <ul
            role="list"
            className={menu === true ? `h-100` : `overflow-y-scroll h-80 scrollbar-thumb-teal-300 scrollbar-track-teal-300/15 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full`}
          >
            {search.map((transaction, index) => (
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
  const sender = nowUserId === transaction.toAccount;
  const fullName =
    (sender ? transaction.fromFirstName : transaction.toFirstName) +
    " " +
    (sender ? transaction.fromLastName : transaction.toLastName);

  return (
    <div className="items-center flex justify-between bg-teal-300/15 rounded-lg my-3 px-2 mx-2">
      <div className="flex flex-row items-center gap-2 my-2 col">
        <div className="w-9 h-9 text-teal-300 flex justify-center">
          {sender ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25a.75.75 0 0 1 .75.75v16.19l6.22-6.22a.75.75 0 1 1 1.06 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 1 1 1.06-1.06l6.22 6.22V3a.75.75 0 0 1 .75-.75Z"
                clip-rule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-full h-full"
            >
              <path
                fill-rule="evenodd"
                d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
                clip-rule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <div className=" text-2xl font-semibold">
            {sender ? "From " : "To "}
            {fullName}
          </div>
          <div className="text-md text-teal-300 leading-3 pb-1">
            {formatDate(transaction.date)}
          </div>
        </div>
      </div>
      <div className="mr-2 font-semibold text-white text-3xl">
        {sender ? "+" : "-"}₹{transaction.amount.toFixed(2)}
      </div>
    </div>
  );
}

export default Transaction;

function formatDate(inputDate) {
  const dateParts = inputDate.split("/");
  const day = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // month is zero-based in JavaScript Date object
  const year = parseInt(dateParts[2]);

  const inputDateObj = new Date(year, month, day);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (inputDateObj.toDateString() === today.toDateString()) {
    return "Today";
  } else if (inputDateObj.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    const formattedDate = inputDateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  }
}
