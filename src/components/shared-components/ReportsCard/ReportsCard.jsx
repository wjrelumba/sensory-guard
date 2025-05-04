import React, { useEffect, useState } from 'react'
import monthExtractor from '../../../Essentials/MonthExtractor'

export default function ReportsCard({
    dataObject,
    index,
    mode,
    onClick,
}) {
    
  if(mode.monthlyMode) return (
    <div className='border-[2px] border-gray-300 rounded-lg px-3 py-2 flex flex-col w-full shadow-lg' key={index}>
      <h1 className='font-bold'>{monthExtractor(dataObject.month)}</h1>
      <div className='w-full flex flex-col px-2'>
        {dataObject.dataExists ? (
          <>
            <h1 className='text-blue-600 font-bold text-xs'>Status:</h1>
            <h1 className='text-gray-600 text-xs'>Average Temperature: {dataObject.averageTemp}</h1>
            <h1 className='text-gray-600 text-xs'>Average Humidity: {dataObject.averageHumidity}</h1>
            <h1 className='text-gray-600 text-xs'>{dataObject.smokeDetected ? 'Smoke was detected' : 'No Smoke Detected'}</h1>
            <h1 className='text-gray-600 text-xs'>{dataObject.vibrationDetected ? 'Vibrations were detected' : 'No Vibration Detected'}</h1>
          </>
        ) : (
          <>
            <h1 className='text-blue-600 font-bold text-xs'>Status:</h1>
            <h1 className='text-gray-600 text-xs'>No data to show</h1>
          </>
        )}
      </div>
    </div>
  )

  if(mode.weeklyMode) return (
    <div className='border-[2px] border-gray-300 rounded-lg px-3 py-2 flex flex-col w-full shadow-lg' key={index}>
      <h1 className='font-bold'>Week {dataObject.week}</h1>
      <div className='w-full flex flex-col px-2'>
        {dataObject.dataExists ? (
          <>
            <h1 className='text-blue-600 font-bold text-xs'>Status:</h1>
            <h1 className='text-gray-600 text-xs'>Average Temperature: {dataObject.averageTemp}</h1>
            <h1 className='text-gray-600 text-xs'>Average Humidity: {dataObject.averageHumidity}</h1>
            <h1 className='text-gray-600 text-xs'>{dataObject.smokeDetected ? 'Smoke was detected' : 'No Smoke Detected'}</h1>
            <h1 className='text-gray-600 text-xs'>{dataObject.vibrationDetected ? 'Vibrations were detected' : 'No Vibration Detected'}</h1>
          </>
        ) : (
          <>
            <h1 className='text-blue-600 font-bold text-xs'>Status:</h1>
            <h1 className='text-gray-600 text-xs'>No data to show</h1>
          </>
        )}
      </div>
    </div>
  )
  
  if(mode.dailyMode) return (
    <div onClick={() => onClick(dataObject)} className='border-[2px] border-gray-300 rounded-lg px-3 py-2 flex flex-col w-full shadow-lg' key={index}>
      <h1 className='font-bold'>{monthExtractor(dataObject.month)} {dataObject.date}</h1>
      <div className='w-full flex flex-col px-2'>
        {dataObject.dataExists ? (
          <>
            <h1 className='text-blue-600 font-bold text-xs'>Status:</h1>
            <h1 className='text-gray-600 text-xs'>Average Temperature: {dataObject.averageTemp}</h1>
            <h1 className='text-gray-600 text-xs'>Average Humidity: {dataObject.averageHumidity}</h1>
            <h1 className='text-gray-600 text-xs'>{dataObject.smokeDetected ? 'Smoke was detected' : 'No Smoke Detected'}</h1>
            <h1 className='text-gray-600 text-xs'>{dataObject.vibrationDetected ? 'Vibrations were detected' : 'No Vibration Detected'}</h1>
          </>
        ) : (
          <>
            <h1 className='text-blue-600 font-bold text-xs'>Status:</h1>
            <h1 className='text-gray-600 text-xs'>No data to show</h1>
          </>
        )}
      </div>
    </div>
  )
}
