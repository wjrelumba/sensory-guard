import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Navbar({
  toggleSideBar,
  dpLink
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const [backMode, setBackMode] = useState(false);

  const backBtn = () => {
    navigate(-1);
  }

  useEffect(() => {
    if(location.pathname !== '/dashboard'){
      setBackMode(true);
    }else{
      setBackMode(false);
    };
  },[location])
  return (
    <div className='absolute w-full p-2 h-[5rem] grid grid-cols-3'>
        <div className='w-full h-full flex items-center'>
            <button onClick={backMode ? backBtn : toggleSideBar } className='p-[0.1rem] text-gray-600'>
                {/* <img src={dpLink ? dpLink: '/profileIcon.jpg'} className='w-[2.5rem] h-[2.5rem] rounded-full' alt="" /> */}
                {backMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                ):(
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                )}
            </button>
        </div>
        <div className='w-full h-full flex justify-center items-center'>
          <div className='w-full flex justify-center items-center'>
            <h1 className='text-gray-700 text-2xl'>Sensory</h1>
            <h1 className='text-blue-600 text-2xl'>Guard</h1>
          </div>
            {/* <img src="/BookKeep-img-noBg.png" className='w-[3.5rem] h-[3.5rem]' alt="" /> */}
        </div>
    </div>
  )
}
