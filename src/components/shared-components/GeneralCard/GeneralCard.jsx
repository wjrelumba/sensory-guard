import React, { useEffect, useState } from 'react'
import { supabase } from '../../../Essentials/Supabase';

export default function GeneralCard( {
  prototypeId, // Current prototype ID
  readingValues, // Values
  prototypeImportantValues, // Important values from prototype
  onClick
} ) {
  const [dataValues, setDataValues] = useState(null);
  const [importantDataValues, setImportantDataValues] = useState(null);

  const parentClassname = 'w-full bg-gray-700 rounded-xl p-2';

  const getValueFromDB = async() => {
    const {data} = await supabase.from('readings').select().order('created_at', {ascending: false}).eq('proto_id', prototypeId).limit(1);
    if(data){
      setDataValues(data[0]);
    };
  }

  const getDataValues = () => {
    const importantDataValueChild = prototypeImportantValues?.filter(value => value.id === prototypeId) // Get only important data for specific prototype

    if(importantDataValueChild){
        setImportantDataValues(importantDataValueChild[0]);
    }
  };

  const statusSetter = (data, allowed_data, type, classNameMode, normalColor, warningColor, dangerColor) => {
    if(type == 'temperature' || type == 'humidity'){
        if(data <= allowed_data.normal.high){
            if(classNameMode){
                return normalColor;
            }
            else{
                return 'Normal';
            }
        }
        else if(data < allowed_data.high.high){
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
    }else if(type == 'smoke_gas'){
        if(data - 0.5 < allowed_data.threshold){
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
    else if(type == 'vibration'){
      if(data - 0.5 < allowed_data.allowed){
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
    else if(type == 'flame'){
      if(data - 0.5 < allowed_data.allowed){
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

  const renderer = (dataName, type, variableName, normalColor, warningColor, dangerColor) => (
    <div className='w-full h-[1rem] grid grid-cols-2 items-center gap-1 sm:border-[2px] sm:h-full sm:p-2 border-gray-300 sm:rounded-md'>
        <div className='w-full px-1'>
            <h1 className='text-xs'>{dataName}</h1>
        </div>
        <div className={`w-full h-full flex rounded items-center justify-center px-1 ${statusSetter(dataValues[type], importantDataValues[variableName], type, true, normalColor, warningColor, dangerColor)}`}>
            <h1 className='text-xs text-center'>{statusSetter(dataValues[type], importantDataValues[variableName], type, false)}</h1>
        </div>
    </div>
  );


  useEffect(() => {
    getDataValues();
  },[])

  useEffect(() => {
    getValueFromDB();
  },[readingValues])

  useEffect(() => {},[dataValues]);
  
  return (
    <div onClick={() => onClick(importantDataValues.id)} className='w-full p-2 bg-white border-[2px] border-gray-300 shadow-xl text-gray-900 rounded-md'>
      <div className='w-full p-2 flex'>
        <div className='flex flex-col items-center w-full'>
          {dataValues && importantDataValues && (
            <>
              <h1 className='border-b py-1 border-black w-full mb-4'>{importantDataValues.proto_name}</h1>
              <div className='grid grid-flow-col w-full justify-items-center items-center'>
                <div className='col-span-1'>
                  <h1>Icon</h1>
                </div>
                <div className='col-span-2 grid grid-row-4 sm:grid-cols-4 w-full justify-items-center items-center gap-1'>
                  {renderer('Temperature', 'temperature', 'temperature_variables', 'bg-blue-600 text-white', 'bg-orange-600 text-white', 'bg-red-600 text-white')}
                  {renderer('Humidity', 'humidity', 'humidity_variables', 'bg-blue-600 text-white', 'bg-orange-600 text-white', 'bg-red-600 text-white')}
                  {renderer('Smoke/Gas', 'smoke_gas', 'smoke_gas_variables', 'bg-blue-600 text-white', 'bg-red-600 text-white')}
                  {renderer('Vibration', 'vibration', 'vibration_variables', 'bg-blue-600 text-white', 'bg-red-600 text-white')}
                  {renderer('Flame', 'flame', 'flame_variables', 'bg-blue-600 text-white', 'bg-red-600 text-white')}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
