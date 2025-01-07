import React, { useEffect, useState } from 'react'
import { supabase } from '../../Essentials/Supabase';

export default function Settings() {
    const [wifiData, setWifiData] = useState(null);
    const [ssidInput, setSsidInput] = useState(null);
    const [passInput, setPassInput] = useState(null);

    // Fetch data from DB
    const getDataFromDB = async() => {
        const {data} = await supabase.from('wifi_settings').select();
        if(data){
            console.log(data);
            setWifiData(data);
        };
    };

    const sendToDB = async() => {
        const {data} = await supabase.from('wifi_settings').select();
        const {data:protoData} = await supabase.from('prototypes').select('id');

        if(data.length < 1){
            for(var i=0; i < protoData.length; i++){
                await supabase.from('wifi_settings').insert({
                    ssid: ssidInput,
                    password: passInput,
                    proto_id: protoData[i].id,
                });
            };
        }else {
            for(var i=0; i < protoData.length; i++){
                await supabase.from('wifi_settings').update({
                    ssid: ssidInput,
                    password: passInput,
                }).eq('proto_id', protoData[i].id);
            };
        };
        getDataFromDB();
    };

    const disconnectBtn = async() => {
        const {data:protoData} = await supabase.from('prototypes').select('id');

        for(var i=0; i < protoData.length; i++){
            await supabase.from('wifi_settings').delete().eq('proto_id', protoData[i].id);
        };
        getDataFromDB();
    }

    const inputHandler = (e) => {
        const {value, name} = e.target;
        switch(name){
            case 'ssid':
                setSsidInput(value);
                break;
            case 'password':
                setPassInput(value);
                break;
        }
    }

    useEffect(() => {
        getDataFromDB();
    },[])

  return (
    <div className='w-full h-full p-2'>
        <div className='w-full h-full flex flex-col'>
            <h1 className='text-2xl font-bold'>Settings</h1>
            <div className='w-full flex gap-1'>
                <h1>Connected to</h1>
                <h1 className='text-blue-600 font-bold'>{wifiData && (wifiData?.length > 0 ? wifiData[0].ssid : '')}</h1>
            </div>
            <div>
                <button onClick={disconnectBtn} className={`px-4 rounded-full ${wifiData && (wifiData.length > 0 ? 'bg-red-800 text-white' : 'bg-gray-400 text-gray-200')}`}>
                    Disconnect
                </button>
            </div>
            <div className='border-[2px] border-gray-300 mt-7 w-full flex flex-col gap-2 items-center justify-center p-2 rounded-lg shadow-lg'>
                <h1 className='text-sm'>Connect to Network</h1>
                <div className='w-full px-2 flex items-center gap-2'>
                    <label htmlFor="">SSID</label>
                    <input onChange={inputHandler} name='ssid' className='w-full px-3 py-1 border-gray-300 border-[1.5px] rounded-lg' type="text" />
                </div>
                <div className='w-full px-2 flex items-center gap-2'>
                    <label htmlFor="">Password</label>
                    <input onChange={inputHandler} name='password' className='w-full px-3 py-1 border-gray-300 border-[1.5px] rounded-lg' type="password" />
                </div>
                <div className='w-full px-2 flex justify-end'>
                    <button onClick={sendToDB} className='px-5 rounded-full bg-blue-600 text-white'>
                        Connect
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
