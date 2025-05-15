import React, { useEffect, useState } from 'react'
import { supabase } from '../../Essentials/Supabase';

export default function Settings() {
    const [wifiData, setWifiData] = useState(null);
    const [ssidInput, setSsidInput] = useState(null);
    const [passInput, setPassInput] = useState(null);

    const [showInst, setShowInst] = useState(false);

    // Function to toggle showing instructions
    const showInstFunc = () => {
        setShowInst(!showInst);
    }

    // Fetch data from DB
    const getDataFromDB = async() => {
        const {data} = await supabase.from('wifi_settings').select();
        if(data){
            const tempArray = [];
            for(var i = 0; i < data.length; i++){
                const {data:protoData} = await supabase.from('prototypes').select().eq('id', data[i].proto_id);
                if(protoData && protoData.length > 0){
                    const tempObject = {
                        ssid: data[i].ssid,
                        proto_number: protoData[0].proto_number,
                        proto_name: protoData[0].proto_name,
                    }
                    tempArray.push(tempObject);
                }
            }
            tempArray.sort((a,b) => a.proto_number - b.proto_number);
            setWifiData(tempArray);
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
            <div className='flex flex-col w-full mt-2'>
                {wifiData && wifiData.map((data) => (
                    <div className='w-full flex gap-1 items-center' key={data.proto_number}>
                        <h1>{data.proto_name} is/was connected to</h1>
                        <h1 className='font-bold text-blue-600'>{data.ssid}</h1>
                    </div>
                ))}
            </div>
            <div className='w-full border-[2px] border-gray-300 rounded-lg mt-9 px-3 py-2 shadow-lg'>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='font-bold'>WifiManager</h1>
                    <div onClick={showInstFunc}>
                        {showInst ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        )}
                    </div>
                </div>
                {showInst && (
                    <div className='w-full mt-5 flex flex-col'>
                        <h1 className='font-bold'>Prototype WifiManager:</h1>
                        <div className='flex flex-col w-full px-2 py-1'>
                            <p className='text-[0.60rem] leading-[0.75rem] text-gray-500 w-full'>Below are the prototypes' WiFi name incase of disconnection from the main network.</p>
                            <ul className="list-disc pl-5 text-gray-600">
                                <li className='text-xs'>SensoryGuard-P1</li>
                                <li className='text-xs'>SensoryGuard-P2</li>
                            </ul>
                        </div>
                        <h1 className='text-xs'>Follow these steps below when hardware disconnects:</h1>
                        <div className='flex flex-col w-full px-2 py-1'>
                            <ol className="list-decimal pl-5 text-gray-600">
                                <li className='text-xs italic'>
                                    On your device, open <span className='font-bold'>
                                    Settings
                                    </span> &gt; <span className='font-bold'>
                                        WiFi
                                    </span>, 
                                    and select "SensoryGuard-P1" and "SensoryGuard-P2"</li>
                                <li className='text-xs italic'>
                                    Wait for a tab to show and load you to the Wifi Manager.
                                </li>
                                <li className='text-xs italic'>
                                    Now, select "<span className='font-bold'>Configure WiFi.</span>"
                                </li>
                                <li className='text-xs italic'>
                                    Select the network or manually type in the SSID and then the password. <span className='font-bold'>
                                        Save
                                    </span> to connect and '<span className='font-bold'>Refresh</span>' if the network is not seen.
                                </li>
                                <li className='text-xs italic'>
                                    Once, hardware is connected, it will show "<span className='font-bold'>
                                        Wifi Connected
                                        </span>" and then show the Sensor Readings. Note: Do the same thing for the other prototype once disconnected.
                                </li>
                            </ol>
                        </div>
                    </div>
                )}
            </div>
            {/* <div className='w-full flex gap-1'>
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
            </div> */}
        </div>
    </div>
  )
}
