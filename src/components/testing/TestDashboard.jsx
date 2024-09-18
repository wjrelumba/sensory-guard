import React, { useEffect, useState } from 'react'
import { showErrorToast } from '../../Essentials/ShowToast';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { supabase } from '../../Essentials/Supabase';
import LogOutBtn from '../buttons/LogOutBtn';

export default function TestDashboard() {
  const [tempFirst, setTempFirst] = useState(null);
  const [tempSecond, setTempSecond] = useState(null);

  const sendData = async(e) => {
    e.preventDefault();
    await supabase.from('readings').insert({
      proto_id: '4718a148-0f82-401a-af9e-79bb66b9fe4f',
      temperature: tempFirst,
      humidity: 20,
      vibration: 1,
      smoke_gas: 2,
    });
    await supabase.from('readings').insert({
      proto_id: '84af9f58-26c9-453a-8c16-d8358579c221',
      temperature: tempSecond,
      humidity: 20,
      vibration: 1,
      smoke_gas: 2,
    });
    window.location.reload();
  };

  const inputHandler = (e) => {
    const {name,value} = e.target;
    switch(name){
      case 'sensor1':
        setTempFirst(value);
        break;
      case 'sensor2':
        setTempSecond(value);
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
      <form className='w-full flex flex-col' onSubmit={sendData}>
        <h1>Thermal Sensor 1</h1>
        <input onChange={inputHandler} className='py-2 px-1 rounded-md' type="text" name='sensor1'/>
        <h1>Thermal Sensor 2</h1>
        <input onChange={inputHandler} className='py-2 px-1 rounded-md' type="text" name='sensor2'/>
        <button>Send data</button>
      </form>
    </div>
  </>
  )
}
