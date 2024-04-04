import { useState } from 'react'
import { CircleInitialsProfile } from '../Components/CircleInitials'
import { InputBoxProfile } from '../Components/InputBox'
import { ButtonSmall } from '../Components/Button'

export const Profile = ({firstName, lastName, userId}) => {

  const [firstNameNew, setFirstNameNew] = useState("")
  const [lastNameNew, setLastNameNew] = useState("")
  const [passwordNew, setPasswordNew] = useState("")

  return (
    <div className='flex flex-col'>
      <CircleInitialsProfile firstName={firstName} lastName={lastName}/>
      <div className='text-4xl font-bold text-teal-300 py-4'>
        {firstName}{" "}{lastName}
      </div>
      <div className='w-3/5 mt-6'>
      <InputBoxProfile editable={"plaintext-only"} type={"text"} label={"User ID"} value={userId}/>
      <InputBoxProfile editable={true} type={"text"} onChange={(e)=>setFirstNameNew(e.target.value)} label={"First Name"} placeholder={firstName}/>
      <InputBoxProfile editable={true} type={"text"} onChange={(e)=>setLastNameNew(e.target.value)} label={"Last Name"} placeholder={lastName}/>
      <InputBoxProfile editable={true} type={"password"} onChange={(e)=>setPasswordNew(e.target.value)} label={"New Password"} placeholder={"Password"}/>
      </div>
      <div className='w-1/3 pt-10'>
        <ButtonSmall label={"Update"} onClick={() => {

          const newData = {}
          if(firstNameNew != ""){ newData.firstName = firstNameNew}
          if(lastNameNew != ""){ newData.lastName = lastNameNew}
          if(passwordNew != ""){ newData.password = passwordNew}

                  axios.post(
                    `${process.env.PUBLIC_URL}/user/update`,
                    newData,
                    {
                      headers: {
                        authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  );
                }}/>
    </div>
    </div>
  )
}
