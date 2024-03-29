import React from "react";

export const DashBoardUser = ({ firstName, lastName }) => {
  const initials = firstName[0] + lastName[0];
  const fullName = firstName + " " + lastName;
  return (
      <div className="flex flex-row items-center gap-2 m-2" >
        <div className='w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center'>
          <span className="text-xl text-white">{initials}</span>
        </div>
        <div className="text-l">{fullName}</div>
      </div>
  );
};
