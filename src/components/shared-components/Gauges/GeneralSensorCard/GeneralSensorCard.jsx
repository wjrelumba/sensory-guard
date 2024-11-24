import React, { useEffect, useState } from 'react'
import { Gauges } from '../Gauge';
import Loader from '../../Loader/Loader';

export default function GeneralSensorCard( {
  prototypeId, // Current prototype ID
  readingValues, // Values
  prototypeImportantValues // Important values from prototype
} ) {
  const [dataValues, setDataValues] = useState(null);
  const [importantDataValues, setImportantDataValues] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const parentClassname = 'w-full bg-white rounded-xl p-2 border-[2px] border-gray-300 shadow-lg';

  const getDataValues = () => {
    const dataValueChild = readingValues?.filter(value => value.proto_id === prototypeId); // Get only data for specific prototype
    const importantDataValueChild = prototypeImportantValues?.filter(value => value.id === prototypeId) // Get only important data for specific prototype

    if(dataValueChild && importantDataValueChild){
      setDataValues(dataValueChild[dataValueChild.length-1]);
      setImportantDataValues(importantDataValueChild[0]);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDataValues();
    console.log(readingValues);
  },[readingValues])

  useEffect(() => {console.log(dataValues)},[dataValues]);
  
  return (
    <div className='w-full p-2 bg-white text-gray-900 rounded-xl'>
      <div className='w-full p-2 flex'>
        <div className='flex flex-col items-center w-full'>
          {isLoading ? (
            <Loader/>
          ):(
            <>
              {dataValues && importantDataValues && (
              <>
                <h1 className='border-b py-1 border-black w-full mb-4'>{importantDataValues.proto_name}</h1>
                  <div className='grid grid-cols-2 sm:grid-cols-4 w-full justify-items-center items-center gap-1'>
                    <Gauges.TemperatureGauge
                    allowed_temperature={importantDataValues.allowed_temperature} 
                    temperature={dataValues.temperature}
                    parentClassname={parentClassname}
                    firstLimitText='Allowed Temperature'
                    secondLimitText='Too High Temperature!'
                    thirdLimitText='Danger Zone!'
                    gaugeType='radial'
                    />
                    <Gauges.HumidityGauge 
                    allowed_humidity={importantDataValues.allowed_humidity} 
                    humidity={dataValues.humidity}
                    parentClassname={parentClassname}
                    firstLimitText='Allowed Humidity'
                    secondLimitText='Too High Humidity!'
                    thirdLimitText='Danger Zone!'
                    gaugeType='radial'
                    />
                    <Gauges.SmokeGasGauge
                    allowed_smoke_gas={importantDataValues.allowed_smoke_gas}
                    smokeGas={dataValues.smoke_gas}
                    parentClassname={parentClassname}
                    firstLimitText='No Smoke and Gas'
                    secondLimitText='Smoke and Gas Detected'
                    gaugeType='radial'
                    />
                    <Gauges.VibrationGauge
                    allow_vibration={importantDataValues.allowed_vibration}
                    vibration={dataValues.vibration}
                    parentClassname={parentClassname}
                    firstLimitText='No Vibration'
                    secondLimitText='Vibration Detected'
                    gaugeType='radial'
                    />
                  </div>
                </>
              )}
              </>
            )}
        </div>
      </div>
    </div>
  )
}
