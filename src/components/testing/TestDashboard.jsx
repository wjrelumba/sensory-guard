import React, { useEffect, useState } from 'react'
import { supabase } from '../../Essentials/Supabase';
import LogOutBtn from '../buttons/LogOutBtn';

export default function TestDashboard() {
  const [tempFirst, setTempFirst] = useState(null);
  const [tempSecond, setTempSecond] = useState(null);

  const [humidFirst, setHumidFirst] = useState(null);
  const [humidSecond, setHumidSecond] = useState(null);

  const [smokeGasFirst, setSmokeGasFirst] = useState(null);
  const [smokeGasSecond, setSmokeGasSecond] = useState(null);

  const [vibrationFirst, setVibrationFirst] = useState(null);
  const [vibrationSecond, setVibrationSecond] = useState(null);

  const sendData = async(e) => {
    e.preventDefault();
    await supabase.from('readings').insert({
      proto_id: '4718a148-0f82-401a-af9e-79bb66b9fe4f',
      temperature: tempFirst,
      humidity: humidFirst,
      vibration: vibrationFirst,
      smoke_gas: smokeGasFirst,
    });
    await supabase.from('readings').insert({
      proto_id: '84af9f58-26c9-453a-8c16-d8358579c221',
      temperature: tempSecond,
      humidity: humidSecond,
      vibration: vibrationSecond,
      smoke_gas: smokeGasSecond,
    });
    window.location.reload();
  };

  const inputHandler = (e) => {
    const {name,value} = e.target;
    switch(name){
      case 'sensor1temp':
        setTempFirst(value);
        break;
      case 'sensor1humid':
        setHumidFirst(value);
        break;
      case 'sensor1smokeGas':
        setSmokeGasFirst(value);
        break;
      case 'sensor1vibration':
        setVibrationFirst(value);
        break;
      case 'sensor2humid':
        setHumidSecond(value);
        break;
      case 'sensor2temp':
        setTempSecond(value);
        break;
      case 'sensor2smokeGas':
        setSmokeGasSecond(value);
        break;
      case 'sensor2vibration':
        setVibrationSecond(value);
        break;
    }
  }

  useEffect(() => {
  },[]);

  return (
  <>
    <LogOutBtn/>
    <div className='flex w-full flex-col p-2'>
      <h1>
        Send sample data to database
      </h1>
      <form className='w-full flex flex-col gap-2' onSubmit={sendData}>
        <div className='w-full p-2 border border-black rounded-md'>
          <h1 className='text-xl mb-2 w-full text-center border-b-[2px] border-gray-600 py-2'>Prototype 1 Data Sender</h1>
          <h1>Thermal Sensor 1</h1>
          <input onChange={inputHandler} className='py-2 px-1 rounded-md w-full' type="text" name='sensor1temp' required/>
          <h1>Humidity Sensor 1</h1>
          <input onChange={inputHandler} className='py-2 px-1 rounded-md w-full' type="text" name='sensor1humid' required/>
          <h1>Smoke/Gas Sensor 1</h1>
          <input onChange={inputHandler} className='py-2 px-1 rounded-md w-full' type="text" name='sensor1smokeGas' required/>
          <h1>Vibration Sensor 1</h1>
          <input onChange={inputHandler} className='py-2 px-1 rounded-md w-full' type="text" name='sensor1vibration' required/>
        </div>
        <div className='w-full p-2 border border-black rounded-md'>
          <h1 className='text-xl mb-2 w-full text-center border-b-[2px] border-gray-600 py-2'>Prototype 2 Data Sender</h1>
          <h1>Thermal Sensor 2</h1>
          <input onChange={inputHandler} className='py-2 px-1 rounded-md w-full' type="text" name='sensor2temp' required/>
          <h1>Humidity Sensor 2</h1>
          <input onChange={inputHandler} className='py-2 px-1 rounded-md w-full' type="text" name='sensor2humid' required/>
          <h1>Smoke/Gas Sensor 2</h1>
          <input onChange={inputHandler} className='py-2 px-1 rounded-md w-full' type="text" name='sensor2smokeGas' required/>
          <h1>Vibration Sensor 2</h1>
          <input onChange={inputHandler} className='py-2 px-1 rounded-md w-full' type="text" name='sensor2vibration' required/>
        </div>
        <button className='bg-green-600 mt-10 py-2 rounded-md'>Send data</button>
      </form>
    </div>
  </>
  )
}
