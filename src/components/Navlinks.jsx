import React, { useState } from 'react'

export default function Navlinks({setToReadMode,setCurrentMode,setDoneMode}) {
    const [toReadActive, setToReadActive] = useState(true);
    const [currentlyActive, setCurrentlyActive] = useState(false);
    const [doneActive, setDoneActive] = useState(false);

    const toggleNavigation = (e) => {
        const {name} = e.target;
        switch(name){
            case 'toRead':
                setToReadMode(true);
                setCurrentMode(false);
                setDoneMode(false);
                setToReadActive(true);
                setCurrentlyActive(false);
                setDoneActive(false);
                break;
            case 'currentlyRead':
                setToReadMode(false);
                setCurrentMode(true);
                setDoneMode(false);
                setToReadActive(false);
                setCurrentlyActive(true);
                setDoneActive(false);
                break;
            case 'doneRead':
                setToReadMode(false);
                setCurrentMode(false);
                setDoneMode(true);
                setToReadActive(false);
                setCurrentlyActive(false);
                setDoneActive(true);
                break;
        }
    };
  return (
    <div className='w-full h-[3rem] grid grid-cols-3 gap-1 rounded-2xl p-1'>
        <div className={`flex justify-center items-center w-full ${toReadActive ? 'border-[2px] bg-white rounded-full':'text-white border border-white rounded-full'}`}>
            <button onClick={toggleNavigation} name='toRead' className='text-center font-mono'>To Read</button>
        </div>
        <div className={`flex justify-center items-center w-full ${currentlyActive ? 'border-[2px] bg-white rounded-full':'text-white border border-white rounded-full'}`}>
            <button onClick={toggleNavigation} name='currentlyRead' className='text-center font-mono'>Ongoing</button>
        </div>
        <div className={`flex justify-center items-center w-full ${doneActive ? 'border-[2px] bg-white rounded-full':'text-white border border-white rounded-full' }`}>
            <button onClick={toggleNavigation} name='doneRead' className='text-center font-mono'>Done</button>
        </div>
    </div>
  )
}
