import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../../../Essentials/Supabase';
import monthExtractor from '../../../Essentials/MonthExtractor';

export default function ViewReport() {
    const location = useLocation();
    const dataValue = location.state;

    const [historyData, setHistoryData] = useState(dataValue.data);

    const [editNoteMode, setEditNoteMode] = useState(false);

    const [noteValue, setNoteValue] = useState(null);

    const getData = async() => {
        const {data} = await supabase.from('history_notes').select().eq('month', dataValue.data.month).eq('date', dataValue.data.date).eq('chosenYear', dataValue.chosenYear);
        if(data && data.length > 0){
            setHistoryData(data[0]);
        }
    };

    const uploadNote = async() => {
        
        const {data:reportData} = await supabase.from('history_notes').select().eq('month', dataValue.data.month).eq('date', dataValue.data.date).eq('chosenYear', dataValue.chosenYear);

        if(reportData && reportData.length > 0){
            const {data} = await supabase.from('history_notes').update({...historyData, note: noteValue}).select().eq('month', dataValue.data.month).eq('date', dataValue.data.date).eq('chosenYear', dataValue.chosenYear);
            if(data){
                setHistoryData(data[0]);
            }
            setEditNoteMode(false);
        }
        else{
            const {data} = await supabase.from('history_notes').insert({...historyData, note: noteValue, chosenYear: dataValue.chosenYear}).select();
            if(data){
                setHistoryData(data[0]);
            }
            setEditNoteMode(false);
        };
    };

    const editModeFunc = () => {
        setEditNoteMode(!editNoteMode);
    };

    const inputHandler = (e) => {
        const {value} = e.target;

        setNoteValue(value);
    }

    useEffect(() => {
        getData();
    },[]);

    if (dataValue.monthlyMode) return (
    <div className='w-full h-full p-2'>
        {historyData && (
            <div className='flex flex-col px-6 py-3 border border-gray-400 rounded-lg w-full'>
                <h1 className='text-2xl text-gray-800 font-bold'>{monthExtractor(historyData.month)} {dataValue.chosenYear}</h1>
                {/* Temperature */}
                <div className='flex flex-col mt-5 text-gray-500'>
                    <h1 className='font-bold'>Temperature</h1>
                    <div className='w-full flex flex-col pl-4'>
                        <div className='w-full flex'>
                            <h1 className='w-[4rem]'>Lowest : </h1>
                            <h1>{(historyData.lowTemp)}ºC</h1>
                        </div>
                        <div className='w-full flex'>
                            <h1 className='w-[4rem]'>Highest : </h1>
                            <h1>{historyData.highTemp}ºC</h1>
                        </div>
                    </div>
                </div>
                {/* Humidity */}
                <div className='flex flex-col mt-1 text-gray-500'>
                    <h1 className='font-bold'>Humidity</h1>
                    <div className='w-full flex flex-col pl-4'>
                        <div className='w-full flex'>
                            <h1 className='w-[4rem]'>Lowest : </h1>
                            <h1>{historyData.lowHumidity}%</h1>
                        </div>
                        <div className='w-full flex'>
                            <h1 className='w-[4rem]'>Highest : </h1>
                            <h1>{historyData.highHumidity}%</h1>
                        </div>
                    </div>
                </div>
                {/* Smoke & Flame */}
                <div className='flex flex-col mt-1 text-gray-500'>
                    <h1 className='font-bold'>Smoke & Flame</h1>
                    <div className='w-full flex flex-col pl-4'>
                        {historyData.flameDetected && historyData.smokeDetected ? (
                            <h1>Detected smoke or flame this month.</h1>
                        ) : !historyData.flameDetected && historyData.smokeDetected ? (
                            <h1>Detected smoke but no flame this month.</h1>
                        ) : historyData.flameDetected && !historyData.smokeDetected ? (
                            <h1>Detected flame but no smoke this month.</h1>
                        ) : (
                            <h1>Detected no smoke nor flame this month.</h1>
                        )}
                    </div>
                </div>
                {/* Vibration */}
                <div className='flex flex-col mt-1 text-gray-500'>
                    <h1 className='font-bold'>Vibration</h1>
                    <div className='w-full flex flex-col pl-4'>
                        {historyData.vibrationDetected ? (
                            <h1>Detected vibration this month.</h1>
                        ) : (
                            <h1>Detected no vibration this month.</h1>
                        )}
                    </div>
                </div>
                {/* Notes */}
                <div className='flex flex-col mt-6 text-gray-500'>
                    <h1 className='text-blue-600 font-bold'>Notes</h1>
                    <div className='w-full flex flex-col pl-4'>
                        {historyData.notes ? (
                            <h1>{historyData.notes}</h1>
                        ) : (
                            <h1>None.</h1>
                        )}
                    </div>
                </div>
            </div>
        )}
    </div>
  );
  if (dataValue.weeklyMode) return (
    <div className='w-full h-full p-2'>
        {historyData && (
            <div className='flex flex-col px-6 py-3 border border-gray-400 rounded-lg w-full'>
                <h1 className='text-2xl text-gray-800 font-bold'>{monthExtractor(historyData.month)} {dataValue.chosenYear}</h1>
                {/* Temperature */}
                <div className='flex flex-col mt-5 text-gray-500'>
                    <h1 className='font-bold'>Temperature</h1>
                    <div className='w-full flex flex-col pl-4'>
                        <div className='w-full flex'>
                            <h1 className='w-[4rem]'>Lowest : </h1>
                            <h1>{(historyData.lowTemp)}ºC</h1>
                        </div>
                        <div className='w-full flex'>
                            <h1 className='w-[4rem]'>Highest : </h1>
                            <h1>{historyData.highTemp}ºC</h1>
                        </div>
                    </div>
                </div>
                {/* Humidity */}
                <div className='flex flex-col mt-1 text-gray-500'>
                    <h1 className='font-bold'>Humidity</h1>
                    <div className='w-full flex flex-col pl-4'>
                        <div className='w-full flex'>
                            <h1 className='w-[4rem]'>Lowest : </h1>
                            <h1>{historyData.lowHumidity}%</h1>
                        </div>
                        <div className='w-full flex'>
                            <h1 className='w-[4rem]'>Highest : </h1>
                            <h1>{historyData.highHumidity}%</h1>
                        </div>
                    </div>
                </div>
                {/* Smoke & Flame */}
                <div className='flex flex-col mt-1 text-gray-500'>
                    <h1 className='font-bold'>Smoke & Flame</h1>
                    <div className='w-full flex flex-col pl-4'>
                        {historyData.flameDetected && historyData.smokeDetected ? (
                            <h1>Detected smoke or flame this month.</h1>
                        ) : !historyData.flameDetected && historyData.smokeDetected ? (
                            <h1>Detected smoke but no flame this month.</h1>
                        ) : historyData.flameDetected && !historyData.smokeDetected ? (
                            <h1>Detected flame but no smoke this month.</h1>
                        ) : (
                            <h1>Detected no smoke nor flame this month.</h1>
                        )}
                    </div>
                </div>
                {/* Vibration */}
                <div className='flex flex-col mt-1 text-gray-500'>
                    <h1 className='font-bold'>Vibration</h1>
                    <div className='w-full flex flex-col pl-4'>
                        {historyData.vibrationDetected ? (
                            <h1>Detected vibration this month.</h1>
                        ) : (
                            <h1>Detected no vibration this month.</h1>
                        )}
                    </div>
                </div>
                {/* Notes */}
                <div className='flex flex-col mt-6 text-gray-500'>
                    <h1 className='text-blue-600 font-bold'>Notes</h1>
                    <div className='w-full flex flex-col pl-4'>
                        {historyData.notes ? (
                            <h1>{historyData.notes}</h1>
                        ) : (
                            <h1>None.</h1>
                        )}
                    </div>
                </div>
            </div>
        )}
    </div>
  );
  if (dataValue.dailyMode) return (
    <div className='w-full h-full p-2'>
        {historyData && (
            <div className='flex flex-col px-6 py-3 border border-gray-400 rounded-lg w-full'>
                <h1 className='text-2xl text-gray-800 font-bold'>{monthExtractor(historyData.month)} {historyData.date}, {dataValue.chosenYear}</h1>
                {/* Temperature */}
                <div className='flex flex-col mt-5 text-gray-500'>
                    <h1 className='font-bold'>Temperature</h1>
                    <div className='w-full flex flex-col pl-4'>
                        <div className='w-full flex'>
                            <h1 className='w-[4rem]'>Lowest : </h1>
                            <h1>{(historyData.lowTemp)}ºC</h1>
                        </div>
                        <div className='w-full flex'>
                            <h1 className='w-[4rem]'>Highest : </h1>
                            <h1>{historyData.highTemp}ºC</h1>
                        </div>
                    </div>
                </div>
                {/* Humidity */}
                <div className='flex flex-col mt-1 text-gray-500'>
                    <h1 className='font-bold'>Humidity</h1>
                    <div className='w-full flex flex-col pl-4'>
                        <div className='w-full flex'>
                            <h1 className='w-[4rem]'>Lowest : </h1>
                            <h1>{historyData.lowHumidity}%</h1>
                        </div>
                        <div className='w-full flex'>
                            <h1 className='w-[4rem]'>Highest : </h1>
                            <h1>{historyData.highHumidity}%</h1>
                        </div>
                    </div>
                </div>
                {/* Smoke & Flame */}
                <div className='flex flex-col mt-1 text-gray-500'>
                    <h1 className='font-bold'>Smoke & Flame</h1>
                    <div className='w-full flex flex-col pl-4'>
                        {historyData.flameDetected && historyData.smokeDetected ? (
                            <h1>Detected smoke or flame today.</h1>
                        ) : !historyData.flameDetected && historyData.smokeDetected ? (
                            <h1>Detected smoke but no flame today.</h1>
                        ) : historyData.flameDetected && !historyData.smokeDetected ? (
                            <h1>Detected flame but no smoke today.</h1>
                        ) : (
                            <h1>Detected no smoke nor flame today.</h1>
                        )}
                    </div>
                </div>
                {/* Vibration */}
                <div className='flex flex-col mt-1 text-gray-500'>
                    <h1 className='font-bold'>Vibration</h1>
                    <div className='w-full flex flex-col pl-4'>
                        {historyData.vibrationDetected ? (
                            <h1>Detected vibration today.</h1>
                        ) : (
                            <h1>Detected no vibration today.</h1>
                        )}
                    </div>
                </div>
                {/* Notes */}
                <div className='flex flex-col mt-6 text-gray-500'>
                    <h1 className='text-blue-600 font-bold'>Notes</h1>
                    <div className='w-full flex flex-col'>
                        {editNoteMode ? (
                            <textarea 
                            onChange={inputHandler} 
                            className='w-full h-[10rem] border border-gray-400 rounded-md px-2 py-1' 
                            name="" 
                            id=""
                            placeholder={'Place your note here...'}
                            defaultValue={historyData?.note}
                            />
                        ) : historyData.note ? (
                            <h1 className='pl-4'>{historyData.note}</h1>
                        ) : (
                            <h1 className='pl-4'>None.</h1>
                        )}
                    </div>
                    <div className='w-full flex justify-end mt-2'>
                        {editNoteMode ? (
                            <div className='flex gap-1'>
                                <button onClick={uploadNote} className='text-white font-bold bg-blue-600 w-[5rem] rounded-xl'>Save</button>
                                <button onClick={editModeFunc} className='text-gray-600 font-bold bg-gray-300 w-[5rem] rounded-xl'>Cancel</button>
                            </div>
                        ) : (
                            <button onClick={editModeFunc} className='text-white font-bold bg-blue-600 w-[7rem] rounded-xl'>Edit Note</button>
                        )}
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}
