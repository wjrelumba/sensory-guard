import React from 'react';
import monthExtractor from '../../../Essentials/MonthExtractor';

export default function DetailedAccountsCard({ 
    dataObject 
}) {
  return (
    <div className="border-[1.5px] border-gray-300 rounded-lg px-4 py-3 flex flex-col w-full max-w-sm shadow-md bg-white space-y-3">
      {/* Name */}
      <h1 className="font-bold text-2xl text-black">{dataObject.name}</h1>

      {/* Details */}
      <div className="w-full flex flex-col px-2 space-y-2 text-gray-600">
        {/* Email */}
        <div className="flex items-center">
          <h1 className="text-gray-600 font-bold text-sm w-28">Email:</h1>
          <h1 className="font-bold text-sm">{dataObject.email}</h1>
        </div>

        {/* Role */}
        <div className="flex items-center">
          <h1 className="text-gray-600 font-bold text-sm w-28">Role:</h1>
          <h1 className="font-bold text-sm">{dataObject.role}</h1>
        </div>

        {/* Created On */}
        <div className="flex items-center">
          <h1 className="text-gray-600 text-sm w-28 italic">Created on:</h1>
          <h1 className="text-sm">{monthExtractor(dataObject.date_created.month)} {dataObject.date_created.day}, {dataObject.date_created.year}</h1>
        </div>

        {/* Last Modified */}
        <div className="flex items-center">
          <h1 className="text-gray-600 text-sm w-28 italic">Last modified:</h1>
          <h1 className="text-sm">
            {dataObject.last_modified}
          </h1>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-2">
        <button className="bg-blue-600 text-white text-sm font-medium py-1 px-4 rounded-full transition">
          Edit
        </button>
        <button className="bg-red-600 text-white text-sm font-medium py-1 px-4 rounded-full transition">
          Delete
        </button>
      </div>
    </div>

    // <div className='border border-gray-300 rounded-lg w-full flex flex-col gap-1 py-2 px-4'>
    //     <h1 className='text-lg font-bold'>{dataObject.name}</h1>
    //     <div className='flex flex-col gap-1'>
    //         <div className='flex gap-1'>
    //             <h1 className='text-sm'>Email:</h1>
    //             <h1 className='text-sm text-gray-400'>{dataObject.email}</h1>
    //         </div>
    //         <div className='flex gap-1'>
    //             <h1 className='text-sm'>Role:</h1>
    //             <h1 className='text-sm text-gray-400'>{dataObject.role}</h1>
    //         </div>
    //         <div className='flex gap-1 mt-2'>
    //             <h1 className='text-sm italic text-gray-400'>Created on:</h1>
    //             <h1 className='text-sm text-gray-400 italic'>{dataObject.created_at}</h1>
    //         </div>
    //         <div className='flex gap-1'>
    //             <h1 className='text-sm italic text-gray-400'>Last modified:</h1>
    //             <h1 className='text-sm text-gray-400 italic'>{dataObject.last_modified}</h1>
    //         </div>
    //         <div className='w-full flex justify-end gap-1'>
    //             <button className='rounded-full px-4 bg-blue-600 text-sm text-white'>Edit</button>
    //             <button className='rounded-full px-4 bg-red-600 text-sm text-white'>Delete</button>
    //         </div>
    //     </div>
    // </div>
  );
}
