import React from 'react'
import { fetchMonthly } from '../../../Functions/HistoryFunctions'

export default function ReportsCard({
    dataObject,
    index,
}) {

    fetchMonthly();
    
  return (
    <div className='border-[2px] border-gray-300 rounded-lg px-3 py-2 flex flex-col w-full shadow-lg' key={index}>
    <h1 className='font-bold'>{dataObject.date}</h1>
    <div className='w-full flex flex-col px-2'>
      <h1 className='text-blue-600 font-bold text-xs'>Status:</h1>
      <h1 className='text-gray-600 text-xs'>{dataObject.temperatureReport}</h1>
      <h1 className='text-gray-600 text-xs'>{dataObject.smokeFlameReport}</h1>
      <h1 className='text-gray-600 text-xs'>{dataObject.vibrationReport}</h1>
    </div>
  </div>
  )
}
