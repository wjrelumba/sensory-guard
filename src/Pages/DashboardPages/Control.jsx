import React, { useEffect, useState } from 'react'

export default function Control() { 
  const [sampleAircons, setSampleAircons] = useState();
  const [sampleBuzzers, setSampleBuzzers] = useState();

  useEffect(() => {
    const sampleAirconsValue = [{
      name: 'AC 1',
      open: false,
    },{
      name: 'AC 2',
      open: true,
    }];

    const sampleBuzzersValue = [{
      name: 'BZ 1',
      open: false,
    },{
      name: 'BZ 2',
      open: true,
    }]

    setSampleAircons(sampleAirconsValue);
    setSampleBuzzers(sampleBuzzersValue);
  },[]);

  const airconClick = (index) => {
    const arrayHolder = [...sampleAircons];
    arrayHolder[index].open = !arrayHolder[index].open;

    setSampleAircons(arrayHolder);
  };

  const buzzerClick = (index) => {
    const arrayHolder = [...sampleBuzzers];
    arrayHolder[index].open = !arrayHolder[index].open;

    setSampleBuzzers(arrayHolder);
  }

  return (
    <div className='w-full h-full flex flex-col gap-6'>
      <div className='p-1'>
        <h1 className='text-xl font-bold text-gray-700'>Air Conditioners</h1>
        <div className='flex gap-1'>
          {sampleAircons && (
            <>
              {sampleAircons.map((data, index) => (
                <div key={index} className='grid grid-cols-2 px-3 py-2 justify-items-center items-center rounded-lg border-[2px] h-[3rem] shadow-lg w-1/2 border-gray-300'>
                    <h1 className='font-bold text-gray-600'>{data.name}</h1>
                    <div onClick={() => airconClick(index)} className={`grid grid-cols-2 w-full p-1 justify-items-center items-center h-full rounded ${data.open ? 'bg-blue-600':'bg-red-600'}`}>
                      <div className={`flex justify-center items-center font-bold rounded w-full h-full text-xs ${data.open ? 'bg-white' : 'text-white'}`}>
                        <h1>
                          ON
                        </h1>
                      </div>
                      <div className={`flex justify-center items-center font-bold rounded w-full h-full text-xs ${!data.open ? 'bg-white' : 'text-white'}`}>
                        <h1>
                          OFF
                        </h1>
                      </div>
                    </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className='p-1 flex flex-col gap-1'>
        <h1 className='text-xl font-bold text-gray-700'>Buzzer</h1>
        <div className='flex gap-4 items-center'>
          <h1 className='font-bold text-gray-700'>
            Alert
          </h1>
          <div className='bg-gray-300 px-3 py-1 rounded'>
            <h1 className='font-bold text-gray-700'>
              Normal Vitals
            </h1>
          </div>
        </div>
        <div className='flex gap-1'>
          {sampleBuzzers && (
            <>
              {sampleBuzzers.map((data, index) => (
                <div key={index} className='grid grid-cols-2 px-3 py-2 justify-items-center items-center rounded-lg border-[2px] h-[3rem] shadow-lg w-1/2 border-gray-300'>
                    <h1 className='font-bold text-gray-600'>{data.name}</h1>
                    <div onClick={() => buzzerClick(index)} className={`bg-gray-400 flex w-full p-1 justify-center items-center h-full rounded`}>
                      <div className={`${data.open ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'} w-full h-full rounded flex justify-center items-center`}>
                        <h1 className='text-xs font-bold'>
                          {data.open ? 'ON' : 'OFF'}
                        </h1>
                      </div>
                    </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className='p-1 flex flex-col gap-1'>
        <h1 className='text-xl font-bold text-gray-700'>Variables</h1>
        <div className='w-full flex flex-col justify-center gap-2 items-center'>
          <div className='flex items-center gap-2 bg-gray-300 w-full rounded-md px-4 py-3 text-gray-700'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-thermometer"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>
            <h1 className='font-bold'>Temperature</h1>
          </div>
          <div className='flex items-center gap-2 bg-gray-300 w-full rounded-md px-4 py-3 text-gray-700'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-droplet"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
            <h1 className='font-bold'>Humidity</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
