import React from 'react'
import { Heading, SubHeading } from './Heading'
import { CircleSendInitials } from './CircleInitials'

export const SendingMenu = ({list}) => {
  return (
    <div className="w-full flex flex-col">
        <SubHeading label={"Last Recipients"}/>
        <Heading label={"Send To"}/>
        <div className='flex gap-4 my-2'>
          {list.map((item,index)=><CircleSendInitials key={index} firstName={item.firstName} lastName={item.lastName} onClick={()=>{console.log(item.firstName+item.lastName)}}/>
        )}
        </div>
    </div>
  )
}
