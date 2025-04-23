import React from 'react'
import monthExtractor from '../../../Essentials/MonthExtractor'

export default function AccountsCard({
    dataObject,
    index,
    clickFunction,
}) {
  return (
    <div onClick={() => clickFunction(dataObject)} className='w-full flex p-2 h-[5.2rem] bg-gray-100 rounded-md border border-gray-400 hover:border-blue-500 hover:bg-blue-100' key={index}>
        <div className='w-[75%] flex flex-col justify-between'>
        <div className='w-full flex flex-col'>
            <h1 className='font-bold'>{dataObject.name}</h1>
            <h1 className='text-sm'>{dataObject.email}</h1>
        </div>
        <div className='w-full'>
            <h1 className='font-thin italic text-xs'>Created on: {monthExtractor(dataObject.date_created.month)} {dataObject.date_created.day}, {dataObject.date_created.year}</h1>
        </div>
        </div>
        <div className='w-[25%] flex justify-start items-center'>
        <h1>{dataObject.role}</h1>
        </div>
    </div>
  )
}
