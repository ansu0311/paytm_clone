export const CircleInitials = ({ firstName, lastName, onClick }) => {
  const initials = firstName[0] + lastName[0];
  return (
    <div onClick={onClick} className="flex cursor-pointer align-middle">
      <div className="flex h-full justify-center align-middle">
        <div
          className="flex flex-col text-[#242424] text-lg font-semibold w-12 h-12 bg-teal-300 rounded-full items-center justify-center"
        >{initials}
        </div>
      </div>
    </div>
  )
}
export const CircleSendInitials = ({ firstName, lastName, onClick }) => {
  const initials = firstName[0] + lastName[0];
  const nameShow = firstName + " " + lastName[0];
  return (
    <div className="flex flex-col">
      <div onClick={onClick} className="flex cursor-pointer align-middle">
        <div className="flex h-full justify-center align-middle">
          <div
            className="flex flex-col text-white bg-teal-900 hover:bg-[#242424] hover:text-teal-300 border-2 border-transparent hover:border-teal-300 text-lg font-semibold w-12 h-12 rounded-full items-center justify-center"
          >{initials}
          </div>
        </div>
      </div>
      <div className="mt-0.5 cursor-default text-xs flex justify-center">
        {nameShow}
      </div>
    </div>
  )
}
export const CircleInitialsProfile = ({ firstName, lastName, onClick }) => {
  const initials = firstName[0] + lastName[0];
  return (
    <div onClick={onClick} className="flex cursor-pointer align-middle">
      <div className="flex h-full justify-center align-middle">
        <div
          className="flex flex-col text-white text-4xl font-bold w-24 h-24 bg-teal-900 rounded-full items-center justify-center"
        >{initials}
        </div>
      </div>
    </div>
  )
}