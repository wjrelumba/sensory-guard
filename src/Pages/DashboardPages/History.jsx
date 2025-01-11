import React from 'react'
import HistoryCard from '../../components/shared-components/HistoryCard/HistoryCard';
import { showSuccessToast } from '../../Essentials/ShowToast';

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
  {
    date: 'November 1, 2024',
    status: 'Normal Levels',
    detection: 'Vibration detected.'
  },
];

export default function History() {
  const showToast = () => {
    showSuccessToast('Clicked')
  }
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
          <HistoryCard
          dataObject={data}
          index={index}
          onClickFunction={showToast}
          />
        ))}
      </div>
    </div>
  )
}
