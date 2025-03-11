import React from 'react'
import HistoryCard from '../../components/shared-components/HistoryCard/HistoryCard';
import { showSuccessToast } from '../../Essentials/ShowToast';
import ReportsCard from '../../components/shared-components/ReportsCard/ReportsCard';

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

const sampleReports = [{
  date: 'December 3, 2024',
  temperatureReport: 'Normal Levels',
  smokeFlameReport: 'No Smoke and Flames.',
  vibrationReport: 'No Vibration detected.',
  detection: 'No unusual detection.'
},{
  date: 'December 2, 2024',
  temperatureReport: 'Normal Levels',
  smokeFlameReport: 'No Smoke and Flames.',
  vibrationReport: 'No Vibration detected.',
  detection: 'No unusual detection.'
},{
  date: 'December 1, 2024',
  temperatureReport: 'Normal Levels',
  smokeFlameReport: 'No Smoke and Flames.',
  vibrationReport: 'No Vibration detected.',
  detection: 'Vibration detected.'
},
{
  date: 'November 1, 2024',
  temperatureReport: 'Normal Levels',
  smokeFlameReport: 'No Smoke and Flames.',
  vibrationReport: 'No Vibration detected.',
  detection: 'Vibration detected.'
},
];

export default function History() {
  const showToast = () => {
    showSuccessToast('Clicked')
  }
  return (
    <div className='w-full h-full p-2'>
      {/* History Section */}
      <h1 className='text-xl font-bold'>History</h1>
      <div className='w-full flex justify-end gap-1'>
        <select className='border border-gray-600 py-1 px-2 rounded-lg' name="" id="">
          <option value="">Year</option>
        </select>
        <select className='border border-gray-600 py-1 px-2 rounded-lg' name="" id="">
          <option value="">Latest - oldest</option>
        </select>
      </div>

      <div className='flex flex-col w-full gap-2 mt-4 h-[20rem] pb-2 overflow-scroll'>
        {sampleHistory.map((data, index) => (
          <HistoryCard
          dataObject={data}
          index={index}
          onClickFunction={showToast}
          />
        ))}
      </div>

      {/* Reports section */}
      <h1 className='text-xl font-bold mt-4'>Reports</h1>
      <div className='w-full flex gap-1 mt-1'>
        <select className='border border-gray-600 py-1 px-2 rounded-lg w-[23%]' name="" id="">
          <option value="">Year</option>
        </select>
        <select className='border border-gray-600 py-1 px-2 rounded-lg w-[45%]' name="" id="">
          <option value="">Latest - oldest</option>
        </select>
        <select className='border border-blue-600 bg-blue-600 text-white font-bold py-1 px-2 rounded-lg w-[33%]' name="" id="">
          <option value="">Monthly</option>
        </select>
      </div>
      <div className='flex flex-col w-full gap-2 mt-4 h-[20rem] pb-2 overflow-scroll'>
        {sampleReports.map((data, index) => (
          <ReportsCard
          dataObject={data}
          index={index}
          onClickFunction={showToast}
          />
        ))}
      </div>
    </div>
  )
}
