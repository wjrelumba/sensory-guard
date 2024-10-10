import React, { useEffect, useState } from 'react'

export default function GeneralCard( {
  prototypeId, // Current prototype ID
  readingValues, // Values
  prototypeImportantValues, // Important values from prototype
  onClick
} ) {
  const [dataValues, setDataValues] = useState(null);
  const [importantDataValues, setImportantDataValues] = useState(null);

  const parentClassname = 'w-full bg-gray-700 rounded-xl p-2';

  const getDataValues = () => {
    const dataValueChild = readingValues?.filter(value => value.proto_id === prototypeId); // Get only data for specific prototype
    const importantDataValueChild = prototypeImportantValues?.filter(value => value.id === prototypeId) // Get only important data for specific prototype

    if(dataValueChild && importantDataValueChild){
        setDataValues(dataValueChild[dataValueChild.length-1]);
        console.log(dataValueChild[dataValueChild.length-1]);
        console.log(importantDataValueChild[0]);
        setImportantDataValues(importantDataValueChild[0]);
    }
  };

  const statusSetter = (data, allowed_data, type, classNameMode, normalColor, warningColor, dangerColor) => {
    if(type == 'temperature' || type == 'humidity'){
        if(data <= allowed_data){
            if(classNameMode){
                return normalColor;
            }
            else{
                return 'Normal';
            }
        }
        else if(data < allowed_data + 5){
            if(classNameMode){
                return warningColor;
            }
            else{
                return 'Warning';
            }
        }
        else{
            if(classNameMode){
                return dangerColor;
            }
            else{
                return 'Danger';
            }
        }
    }else if(type == 'smoke_gas' || type == 'vibration'){
        if(data - 0.5 < allowed_data){
            if(classNameMode){
                return normalColor
            }
            else{
                return 'Undetected'
            }
        }
        else {
            if(classNameMode){
                return warningColor
            }
            else{
                return 'Detected'
            }
        }
    }
  };

  const renderer = (dataName, type, allowedType, normalColor, warningColor, dangerColor) => (
    <div className='w-full h-[1rem] grid grid-cols-2 items-center gap-1'>
        <div className='w-full px-1'>
            <h1 className='text-xs'>{dataName}</h1>
        </div>
        <div className={`w-full h-full flex rounded items-center justify-center px-1 ${statusSetter(dataValues[type], importantDataValues[allowedType], type, true, normalColor, warningColor, dangerColor)}`}>
            <h1 className='text-xs text-center'>{statusSetter(dataValues[type], importantDataValues[allowedType], type, false)}</h1>
        </div>
    </div>
  );

  useEffect(() => {
    getDataValues();
    console.log(readingValues);
  },[readingValues])

  useEffect(() => {console.log(dataValues)},[dataValues]);
  
  return (
    <div onClick={() => onClick(importantDataValues.id)} className='w-full p-2 bg-gray-600 text-gray-300 rounded-md'>
      <div className='w-full p-2 flex'>
        <div className='flex flex-col items-center w-full'>
          {dataValues && importantDataValues && (
            <>
              <h1 className='border-b py-1 border-black w-full mb-4'>{importantDataValues.proto_name}</h1>
              <div className='grid grid-row-4 sm:grid-cols-4 w-full justify-items-center items-center gap-1'>
                {renderer('Temperature', 'temperature', 'allowed_temperature', 'bg-blue-600', 'bg-yellow-600', 'bg-red-600')}
                {renderer('Humidity', 'humidity', 'allowed_humidity', 'bg-yellow-600', 'bg-orange-600', 'bg-red-600')}
                {renderer('Smoke/Gas', 'smoke_gas', 'allowed_smoke_gas', 'bg-yellow-600', 'bg-red-600')}
                {renderer('Vibration', 'vibration', 'allowed_vibration', 'bg-yellow-600', 'bg-red-600')}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
