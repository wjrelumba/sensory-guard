import React from 'react';
import monthExtractor from '../../../Essentials/MonthExtractor';

export default function DetailedAccountsCard({ 
    dataObject 
}) {
  return (
    <div className='border border-gray-300 rounded-lg w-full flex flex-col gap-1 py-2 px-4'>
        <h1 className='text-xl font-bold'>{dataObject.name}</h1>
        <div className='flex flex-col gap-1'>

          {/* Email Section */}
            <div className='flex gap-1'>
                <h1 className='text-sm w-[2.5rem]'>Email:</h1>
                <h1 className='text-sm text-gray-400'>{dataObject.email}</h1>
            </div>

            {/* Role section */}
            <div className='flex gap-1'>
                <h1 className='text-sm w-[2.5rem]'>Role:</h1>
                <h1 className='text-sm text-gray-400'>{dataObject.role}</h1>
            </div>

            {/* Created on section */}
            <div className='flex gap-1 mt-2'>
                <h1 className='text-sm italic text-gray-400'>Created on:</h1>
                <h1 className='text-sm text-gray-400 italic'>{monthExtractor(dataObject.date_created.month)} {dataObject.date_created.day}, {dataObject.date_created.year}</h1>
            </div>

            {/* Last modified section */}
            <div className='flex gap-1'>
                <h1 className='text-sm italic text-gray-400'>Last modified:</h1>
                <h1 className='text-sm text-gray-400 italic'>{dataObject.last_modified}</h1>
            </div>

            {/* Buttons section */}
            <div className='w-full flex justify-end gap-1'>
                <button className='rounded-full px-4 bg-blue-600 text-sm text-white'>Edit</button>
                <button className='rounded-full px-4 bg-red-600 text-sm text-white'>Delete</button>
            </div>
        </div>
    </div>
  );
}
