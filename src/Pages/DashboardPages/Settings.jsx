import React, { useEffect, useState } from 'react'
import { supabase } from '../../Essentials/Supabase';
import { Line } from 'rc-progress';
import Loader from '../../components/shared-components/Loader/Loader';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import DatePicker from '../../components/DatePicker/DatePicker';
import ModalComponent from '../../components/shared-components/ModalComponent/ModalComponent';
import { showErrorToast, showSuccessToast } from '../../Essentials/ShowToast';

export default function Settings() {
    const [wifiData, setWifiData] = useState(null);
    const [ssidInput, setSsidInput] = useState(null);
    const [passInput, setPassInput] = useState(null);

    const [storageData, setStorageData] = useState(null);

    const [showInst, setShowInst] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const [startDate, setStartDate] = useState(`${year}-${month >= 10 ? month : `0${month}`}-${day}`);
    const [endDate, setEndDate] = useState(`${year}-${month >= 10 ? month : `0${month}`}-${day}`);

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

    const getDBUsage = async() => {
        try {
            const res = await fetch(`https://sensory-guard.vercel.app/api/get-db-usage`, {method: 'GET'});

            const result = await res.json();

            console.log(result);

            if(result){
                setStorageData(result);
            }
        } catch (error) {
            
        }
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

    // const savePublicFileToDownloads = async(fileName) => {
    //     const fileUrl = `capacitor://localhost/${fileName}`;
    //     const cordovaFile = (window).cordova?.file;
    //     const FileTransfer = (window).FileTransfer;

    //     if (!cordovaFile || !FileTransfer) {
    //         alert('Cordova plugins are not available.');
    //         return;
    //     }

    //     const downloadPath = cordovaFile.externalRootDirectory + 'Download/' + fileName;

    //     const fileTransfer = new FileTransfer();
    //     fileTransfer.download(
    //         fileUrl,
    //         downloadPath,
    //         (entry) => {
    //         console.log('Download complete:', entry.toURL());
    //         alert(`File saved to Downloads: ${fileName}`);
    //         },
    //         (error) => {
    //         console.error('Download error:', JSON.stringify(error));
    //         alert('Download failed.');
    //         },
    //         false
    //     );
    //     }

    const formatDateToText = (dateString) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const [year, month, day] = dateString.split('-');
        const monthName = months[parseInt(month, 10) - 1];
        
        // Remove leading zeros from the day
        const dayNumber = parseInt(day, 10);

        return `${monthName} ${dayNumber}, ${year}`;
    }

    const startDateInputHandler = (e) => {
        const {value} = e.target;
        setStartDate(value);
    };

    const endDateInputHandler = (e) => {
        const {value} = e.target;
        setEndDate(value);
    };

    const deleteData = async () => {
        // Convert to full ISO strings
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const startISO = start.toISOString();

        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        const endISO = end.toISOString();

        const { error } = await supabase
            .from('readings')
            .delete()
            .gte('created_at', startISO)
            .lte('created_at', endISO);

        await supabase.from('history_notes').delete({count: 'exact'}).gte('created_at', start).lte('created_at', endISO);

        if (error) {
            showErrorToast('Something went wrong');
        }
        else{
            showSuccessToast('Data successfully deleted');
        }
        setShowDeleteModal(false);
    };


    const activateDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    };

    const requestStoragePermission = () => {
        const permissions = (window).cordova?.plugins?.permissions;

        if (!permissions) {
            console.warn('Android permissions plugin not available.');
            return false;
        };

        return new Promise((resolve, reject) => {
            permissions.checkPermission(
            permissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
            (result) => {
                if (result.hasPermission) {
                resolve(true);
                } else {
                permissions.requestPermission(
                    permissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
                    (result) => {
                    if (result.hasPermission) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                    },
                    () => reject('Permission request failed')
                );
                }
            },
            () => reject('Permission check failed')
            );
        });
        }

    const downloadAndOpenPDF = async() => {
        const pdfUrl = `${window.location.origin}/SensoryGuard-Manual.pdf`;

        if (Capacitor.isNativePlatform()) {
            // 1. Fetch the file as Blob
            const response = await fetch(pdfUrl);
            const blob = await response.blob();
            const base64Data = await convertBlobToBase64(blob);

            // 2. Write the file to the device
            const fileName = 'SensoryGuard-Manual.pdf';
            const result = await Filesystem.writeFile({
                path: fileName,
                data: base64Data,
                directory: Directory.Documents,
            });

            // 3. Use cordova-plugin-file-opener2 to open the file
            const path = result.uri;

            // Cordova plugin needs native path
            window.cordova.plugins.fileOpener2.open(
                path,
                'application/pdf',
                {
                error: function (e) {
                    console.error('Error opening file', e);
                },
                success: function () {
                    console.log('File opened successfully');
                },
                }
            );
        } else {
            window.open('/SensoryGuard-Manual.pdf', '_blank');
        }
    };

        // Helper: convert Blob to base64
        const convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
            resolve(reader.result.split(',')[1]); // Only base64 part
            };
            reader.readAsDataURL(blob);
        });
        };

    useEffect(() => {
        getDataFromDB();
        getDBUsage();
        requestStoragePermission();
    },[]);

  return (
    <>
        <ModalComponent
        show={showDeleteModal}
        title={{first: 'Delete', second: 'Data'}}
        deleteMode={true}
        message={startDate == endDate ?
            <h1>You are deleting data from <span className='font-bold'>{formatDateToText(startDate)},</span> do you want to continue?</h1>
            : 
            <h1>You are deleting data from <span className='font-bold'>{formatDateToText(startDate)}</span> to <span className='font-bold'>{formatDateToText(endDate)},</span> do you want to continue?</h1>}
        acceptClassname={"bg-red-600 hover:bg-blue-700 text-white px-4 rounded-full mr-1"}
        acceptMessage='Delete'
        acceptFunction={deleteData}
        onClose={activateDeleteModal}
        />
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
                {storageData ? (
                    <div className='mt-10'>
                        <div className='w-full flex flex-col border-[2px] border-gray-300 px-3 py-2 rounded-lg'>
                            <h1 className='text-gray-600 font-bold mb-5'>Database utilization:</h1>
                            <div className='w-full flex flex-col items-end'>
                                <Line percent={(((storageData.used/storageData.limit) * 100).toFixed(2))} strokeWidth={3} strokeColor={'#2563eb'}/>
                                <h1 className='text-gray-600 text-sm'>{(((storageData.used/storageData.limit) * 100).toFixed(2))}%</h1>
                            </div>
                            <div className='w-full flex'>
                                <h1 className='text-gray-600 text-xs w-[4rem]'>Limit:</h1>
                                <h1 className='text-gray-600 text-xs'>{(storageData.limit / 1024 / 1024).toFixed(2)} mb</h1>
                            </div>
                            <div className='w-full flex'>
                                <h1 className='text-gray-600 text-xs w-[4rem]'>Used:</h1>
                                <h1 className='text-gray-600 text-xs'>{parseFloat(storageData.usedMB).toFixed(2)} mb</h1>
                            </div>
                            <div className='w-full flex'>
                                <h1 className='text-gray-600 text-xs w-[4rem]'>Remaining:</h1>
                                <h1 className='text-gray-600 text-xs'>{parseFloat(storageData.remainingMB).toFixed(2)} mb</h1>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <div className='w-full flex flex-col border-[2px] border-gray-300 px-3 py-2 rounded-lg'>
                                <h1 className='text-gray-600 font-bold mb-2'>Data deletion</h1>
                                <div className='w-full grid grid-cols-2 sm:flex gap-1'>
                                    <DatePicker
                                    onChange={startDateInputHandler}
                                    labelValue='From:'
                                    selectedDate={startDate}
                                    />
                                    <DatePicker
                                    onChange={endDateInputHandler}
                                    labelValue='To:'
                                    selectedDate={endDate}
                                    />
                                </div>
                                <button onClick={activateDeleteModal} className='w-1/2 sm:w-1/4 mt-2 rounded-md bg-red-600 text-white py-1'>Delete data</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='mt-10'>
                        <Loader/>
                    </div>
                )}
                <div className='mt-5 flex gap-1 justify-end'>
                    <button onClick={downloadAndOpenPDF} className='bg-blue-600 px-2 py-1 text-white rounded-lg'>
                        User Manual
                    </button>
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
    </>
  )
}
