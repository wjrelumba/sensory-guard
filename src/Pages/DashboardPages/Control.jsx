import React, { useEffect, useState } from 'react'
import { supabase } from '../../Essentials/Supabase';

export default function Control() { 
  // const [sampleAircons, setSampleAircons] = useState();
  const [sampleBuzzers, setSampleBuzzers] = useState();

  // Create states for variables
  const [tempvarClicked, setTempvarClicked] = useState(false);
  const [humidvarClicked, setHumidvarClicked] = useState(false);

  // Set states for prototypes
  const [prototypeData, setPrototypeData] = useState(null);

  const getVariables = async() => {
    const {data} = await supabase.from('prototypes').select();
    if(data){
      console.log(data);
      data.sort((a,b) => a.proto_number - b.proto_number);
      console.log(data);
      setPrototypeData(data);
    }
  }

  const variableBoxFunc = (e) => {
    const {name} = e.currentTarget.dataset;
    if(name == 'tempvar'){
      setTempvarClicked(!tempvarClicked);
    }
    if(name == 'humidvar'){
      setHumidvarClicked(!humidvarClicked);
    }
  }

  useEffect(() => {
    getVariables();
    // const sampleAirconsValue = [{
    //   name: 'AC 1',
    //   open: false,
    // },{
    //   name: 'AC 2',
    //   open: true,
    // }];

    const sampleBuzzersValue = [{
      name: 'BZ 1',
      open: false,
    },{
      name: 'BZ 2',
      open: true,
    }]

    // setSampleAircons(sampleAirconsValue);
    setSampleBuzzers(sampleBuzzersValue);
  },[]);

  // const airconClick = (index) => {
  //   const arrayHolder = [...sampleAircons];
  //   arrayHolder[index].open = !arrayHolder[index].open;

  //   setSampleAircons(arrayHolder);
  // };

  const buzzerClick = (index) => {
    const arrayHolder = [...sampleBuzzers];
    arrayHolder[index].open = !arrayHolder[index].open;

    setSampleBuzzers(arrayHolder);
  };

  const variableRenderer = (text, dataValue, range, mode) => {
    let modeValue;
    if(mode == 'temperature'){
      modeValue = '°C';
    }
    else if(mode == 'humidity'){
      modeValue = 'g/kg'
    }
    return (
          <div className='flex items-center'>
            <div className='w-[25%]'>
              <h1 className='text-gray-500 font-bold'>{text}</h1>
            </div>
            <div className='grid grid-flow-col items-center gap-2 w-[75%]'>
              <div className='col-span-2'>
                <input type="number" className='w-full rounded-lg px-2 py-1 border border-gray-400' defaultValue={dataValue[`${mode}_variables`][range].low}/>
              </div>
              <div className='col-span-1'>
                <h1>-</h1>
              </div>
              <div className='col-span-2'>
                <input type="number" className='w-full rounded-lg px-2 py-1 border border-gray-400' defaultValue={dataValue[`${mode}_variables`][range].high}/>
              </div>
              <div className='col-span-1'>
                <h1>{modeValue}</h1>
              </div>
            </div>
          </div>
    )
  }

  return (
    <div className='w-full h-full flex flex-col gap-6'>
      {/* <div className='p-1'>
        <h1 className='text-xl font-bold text-gray-700'>Air Conditioners</h1>
        <div className='flex gap-1'>
          {sampleAircons && (
            <>
              {sampleAircons.map((data, index) => (
                <div key={index} className='grid grid-cols-2 px-3 py-2 justify-items-center items-center rounded-lg border-[2px] h-[3rem] shadow-lg w-1/2 border-gray-300'>
                    <h1 className='font-bold text-gray-600'>{data.name}</h1>
                    <div onClick={() => airconClick(index)} className={`grid grid-cols-2 w-full p-1 justify-items-center items-center h-full rounded ${data.open ? 'bg-blue-600':'bg-red-600'}`}>
                      <div className={`flex justify-center items-center font-bold rounded w-full h-full text-xs ${data.open ? 'bg-white switch-slide-left' : 'text-white'}`}>
                        <h1>
                          ON
                        </h1>
                      </div>
                      <div className={`flex justify-center items-center font-bold rounded w-full h-full text-xs ${!data.open ? 'bg-white switch-slide-right' : 'text-white'}`}>
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
      </div> */}
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
                      <div className={`${data.open ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'} w-full h-full rounded flex justify-center items-center`}>
                        <h1 className='text-xs font-bold'>
                          {data.open ? 'MUTE' : 'UNMUTE'}
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
          <div className={`flex flex-col justify-center gap-2 ${!tempvarClicked ? 'bg-gray-300' : 'bg-gray-200'} w-full rounded-lg px-4 py-3 text-gray-700`}>
            <div className='flex items-center justify-between w-full'>
              <div className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-thermometer"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>
                <h1 className='text-xl font-bold'>Temperature</h1>
              </div>
              <div className='flex items-center'>
                <button data-name='tempvar' onClick={variableBoxFunc}>
                  {!tempvarClicked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                  ):(
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  )}
                </button>
              </div>
            </div>
            {prototypeData && tempvarClicked && (
              <>
                <h1 className='text-xs'>Set the variable (ranges) for temperature</h1>
                {prototypeData.map((data) => (
                  <div className='w-full' key={data.proto_number}>
                    <div className='w-[35%]'>
                      <h1 className='py-1 px-3 bg-gray-900 rounded-2xl text-white text-center font-bold'>{data.proto_name}</h1>
                    </div>
                    <div className='grid grid-rows-3 w-full mt-2 gap-2 px-1'>
                      {variableRenderer('Normal', data, 'normal', 'temperature')}
                      {variableRenderer('High', data, 'high', 'temperature')}
                      {variableRenderer('Danger', data, 'danger', 'temperature')}
                    </div>
                  </div>
                ))}
                <div className='w-full flex justify-end'>
                  <div className='w-1/2 grid grid-cols-2 gap-2'>
                    <button className='w-full bg-blue-600 rounded-full text-white'>Apply</button>
                    <button className='w-full bg-gray-300 rounded-full text-gray-800'>Cancel</button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={`flex flex-col justify-center gap-2 ${!humidvarClicked ? 'bg-gray-300' : 'bg-gray-200'} w-full rounded-lg px-4 py-3 text-gray-700`}>
            <div className='flex items-center justify-between w-full'>
              <div className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-droplet"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
                <h1 className='text-xl font-bold'>Humidity</h1>
              </div>
              <div className='flex items-center'>
                <button data-name='humidvar' onClick={variableBoxFunc}>
                  {!humidvarClicked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                  ):(
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  )}
                </button>
              </div>
            </div>
            {prototypeData && humidvarClicked && (
              <>
                <h1 className='text-xs'>Set the variable (ranges) for humidity</h1>
                {prototypeData.map((data) => (
                  <div className='w-full' key={data.proto_number}>
                    <div className='w-[35%]'>
                      <h1 className='py-1 px-3 bg-gray-900 rounded-2xl text-white text-center font-bold'>{data.proto_name}</h1>
                    </div>
                    <div className='grid grid-rows-3 w-full mt-2 gap-2 px-1'>
                      {variableRenderer('Normal', data, 'normal', 'humidity')}
                      {variableRenderer('High', data, 'high', 'humidity')}
                      {variableRenderer('Danger', data, 'danger', 'humidity')}
                    </div>
                  </div>
                ))}
                <div className='w-full flex justify-end'>
                  <div className='w-1/2 grid grid-cols-2 gap-2'>
                    <button className='w-full bg-blue-600 rounded-full text-white'>Apply</button>
                    <button className='w-full bg-gray-300 rounded-full text-gray-800'>Cancel</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
