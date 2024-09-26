import React, { useEffect, useState } from 'react'
import { Gauges } from '../Gauge';

export default function GeneralSensorCard( {
  prototypeId, // Current prototype ID
  readingValues, // Values
  prototypeImportantValues // Important values from prototype
} ) {
  const [dataValues, setDataValues] = useState(null);
  const [importantDataValues, setImportantDataValues] = useState(null);

  const parentClassname = 'w-full bg-gray-700 rounded-xl p-2';

  const getDataValues = () => {
    const dataValueChild = readingValues?.filter(value => value.proto_id === prototypeId); // Get only data for specific prototype
    const importantDataValueChild = prototypeImportantValues?.filter(value => value.id === prototypeId) // Get only important data for specific prototype

    setDataValues(dataValueChild[dataValueChild.length-1]);
    setImportantDataValues(importantDataValueChild[0]);
  }

  useEffect(() => {
    getDataValues();
    console.log(readingValues);
  },[readingValues])

  useEffect(() => {console.log(dataValues)},[dataValues]);
  
  return (
    <div className='w-full p-2 bg-gray-600 text-gray-300 rounded-xl'>
      <div className='w-full p-2 flex'>
        <div className='flex flex-col items-center w-full'>
          {dataValues && importantDataValues && (
            <>
              <h1 className='border-b py-1 border-black w-full mb-4'>{importantDataValues.proto_name}</h1>
              <div className='grid grid-cols-2 sm:grid-cols-4 w-full justify-items-center items-center gap-1'>
                <Gauges.TemperatureGauge
                allowed_temperature={importantDataValues.allowed_temperature} 
                temperature={dataValues.temperature}
                parentClassname={parentClassname}
                />
                <Gauges.HumidityGauge 
                allowed_humidity={importantDataValues.allowed_humidity} 
                humidity={dataValues.humidity}
                parentClassname={parentClassname}
                />
                <Gauges.SmokeGasGauge
                allowed_smoke_gas={importantDataValues.allowed_smoke_gas}
                smokeGas={dataValues.smoke_gas}
                parentClassname={parentClassname}
                />
                <Gauges.VibrationGauge
                allow_vibration={importantDataValues.allowed_vibration}
                vibration={dataValues.vibration}
                parentClassname={parentClassname}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
