import React, { useState } from 'react';

export default function DatePicker( {
    onChange, // Function to handle date change
    selectedDate, // Value of selected date
    labelValue = 'Select Date',
} ) {
  return (
    <div className="flex flex-col items-start w-1/2 sm:w-[20%] md:w-[15%]">
      <label htmlFor="date" className="font-semibold text-gray-700">
        {labelValue}
      </label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={onChange}
        className="border border-gray-300 w-full rounded-xl px-2 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition"
      />
    </div>
  );
}
