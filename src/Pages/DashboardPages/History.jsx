import React from 'react'

const sampleHistory = [{
    date: 'December 3, 2024',
    status: 'Normal Levels',
    detection: 'No unusual detection.'
  },{
    date: 'December 2, 2024',
    status: 'Normal Levels',
    detection: 'No unusual detection.'
  },{
    date: 'December 1, 2024',
    status: 'Normal Levels',
    detection: 'Vibration detected.'
  },
];

export default function History() {
  return (
    <div className='w-full h-full p-2'>
      <h1 className='text-xl font-bold'>History</h1>
      <div className='w-full flex justify-end gap-1'>
        <select className='border border-gray-600 py-1 px-2 rounded-lg' name="" id="">
          <option value="">Year</option>
        </select>
        <select className='border border-gray-600 py-1 px-2 rounded-lg' name="" id="">
          <option value="">Latest - oldest</option>
        </select>
      </div>
      <div className='flex flex-col w-full gap-2 mt-4'>
        {sampleHistory.map((data, index) => (
          <div className='border-[2px] border-gray-300 rounded-lg px-3 py-2 flex flex-col w-full shadow-lg' key={index}>
            <h1 className='font-bold'>{data.date}</h1>
            <div className='w-full flex flex-col px-2'>
              <h1 className='text-blue-600 font-bold text-xs'>Status:</h1>
              <h1 className='text-gray-600 text-xs'>{data.status}</h1>
              <h1 className='text-gray-600 text-xs'>{data.detection}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
