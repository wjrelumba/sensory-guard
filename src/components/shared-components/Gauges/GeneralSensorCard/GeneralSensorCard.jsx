import React, { useEffect, useState } from 'react'
import { Gauges } from '../Gauge';
import Loader from '../../Loader/Loader';
import { supabase } from '../../../../Essentials/Supabase';

export default function GeneralSensorCard( {
  prototypeId, // Current prototype ID
  readingValues, // Values
  prototypeImportantValues // Important values from prototype
} ) {
  const [importantDataValues, setImportantDataValues] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const parentClassname = 'w-full bg-white rounded-xl p-2 border-[2px] border-gray-300 shadow-lg';

    const getDataValues = () => {
      const importantDataValueChild = prototypeImportantValues?.filter(value => value.id === prototypeId) // Get only important data for specific prototype
      console.log(prototypeImportantValues);
      console.log(readingValues);
      console.log(importantDataValueChild);
      if(importantDataValueChild){
          console.log(importantDataValueChild[0]);
          setImportantDataValues(importantDataValueChild[0]);
          setIsLoading(false);
      }
    };

  useEffect(() => {
      getDataValues();
    },[])

    useEffect(() => {
      console.log(isLoading);
    },[isLoading])
  
  return (
    <div className='w-full p-2 bg-white text-gray-900 rounded-xl'>
      <div className='w-full p-2 flex'>
        <div className='flex flex-col items-center w-full'>
          {isLoading ? (
            <Loader/>
          ):(
            <>
              {importantDataValues && (
              <>
                <h1 className='border-b py-1 border-black w-full mb-4'>{importantDataValues.proto_name}</h1>
                  <div className='grid grid-cols-2 sm:grid-cols-4 w-full justify-items-center items-center gap-1'>
                    <Gauges.TemperatureGauge
                    allowed_temperature={importantDataValues.temperature_variables} 
                    temperature={readingValues.temperature}
                    parentClassname={parentClassname}
                    firstLimitText='Allowed Temperature'
                    secondLimitText='Too High Temperature!'
                    thirdLimitText='Danger Zone!'
                    gaugeType='radial'
                    />
                    <Gauges.HumidityGauge 
                    allowed_humidity={importantDataValues.humidity_variables} 
                    humidity={readingValues.humidity}
                    parentClassname={parentClassname}
                    firstLimitText='Allowed Humidity'
                    secondLimitText='Too High Humidity!'
                    thirdLimitText='Danger Zone!'
                    gaugeType='radial'
                    />
                    <Gauges.SmokeGasGauge
                    allowed_smoke_gas={importantDataValues.smoke_gas_variables}
                    smokeGas={readingValues.smoke_gas}
                    parentClassname={parentClassname}
                    firstLimitText='No Smoke and Gas'
                    secondLimitText='Smoke and Gas Detected'
                    gaugeType='radial'
                    maximumValue={37}
                    minimunValue={10}
                    />
                    <Gauges.VibrationGauge
                    allow_vibration={importantDataValues.vibration_variables}
                    vibration={readingValues.vibration}
                    parentClassname={parentClassname}
                    firstLimitText='No Vibration'
                    secondLimitText='Vibration Detected'
                    gaugeType='radial'
                    maximumValue={37}
                    minimunValue={10}
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
