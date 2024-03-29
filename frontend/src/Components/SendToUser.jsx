import React from "react";

export const SendToUser = ({ firstName, lastName ,theme }) => {
  const initials = firstName[0] + lastName[0];
  const fullName = firstName + " " + lastName;
  return (
      <div className="flex flex-col justify-center mx-auto items-center gap-2 mt-10 mb-4" >
        <div className='w-20 h-20 rounded-full bg-purple-400 flex items-center justify-center'>
          <span className="text-4xl text-white">{initials}</span>
        </div>
        <h3 className="text-xl font-semibold">{fullName}</h3>
      </div>
  );
};
