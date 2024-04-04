import React from "react";

export const SendToUser = ({ firstName, lastName ,theme }) => {
  const initials = firstName[0] + lastName[0];
  const fullName = firstName + " " + lastName;
  return (
      <div className="flex flex-col justify-center mx-auto items-center gap-2 mt-10 mb-4" >
        <div className='w-24 h-24 rounded-full bg-teal-300 flex items-center justify-center'>
          <span className="text-4xl font-bold text-[#242424]">{initials}</span>
        </div>
        <h3 className="text-2xl text-white font-semibold">{fullName}</h3>
      </div>
  );
};
