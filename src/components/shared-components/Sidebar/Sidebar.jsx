import React, { useEffect, useState } from 'react'
import LogOutBtn from '../../buttons/LogOutBtn';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({shown,toggleSideBar}) {
    const [hasLoaded, setHasLoaded] = useState(false);
    const location = useLocation();

    const [dashboardActive, setDashboardActive] = useState(false);
    const [controlActive, setControlActive] = useState(false);
    const [historyActive, setHistoryActive] = useState(false);
    const [accountsActive, setAccountsActive] = useState(false);

    useEffect(() => {
        if(location.pathname == '/dashboard'){
            setDashboardActive(true);
            setControlActive(false);
            setHistoryActive(false);
            setAccountsActive(false);
        }
        if(location.pathname == '/dashboard/control'){
            setDashboardActive(false);
            setControlActive(true);
            setHistoryActive(false);
            setAccountsActive(false);
        }
        if(location.pathname == '/dashboard/history'){
            setDashboardActive(false);
            setControlActive(false);
            setHistoryActive(true);
            setAccountsActive(false);
        }
        if(location.pathname == '/dashboard/accounts'){
            setDashboardActive(false);
            setControlActive(false);
            setHistoryActive(false);
            setAccountsActive(true);
        }
    }, [location])

    useEffect(() => {
        if(shown){
            console.log(shown);
            setHasLoaded(true);
        };
    },[shown]);
  return (
    <div className={`w-[70%] h-full top-0 bottom-0 bg-white fixed border-r-[2px] ${shown === false ? (hasLoaded ? 'slide-left-out' : 'ml-[-100%]') : 'slide-right'} px-5 flex flex-col`}>
        <div className='w-full flex justify-end items-center px-2 border-b-[2px] border-gray-400 text-gray-600 h-[5rem]'>
            <svg onClick={toggleSideBar} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </div>
        {/* Dashboard Button */}
        <div className='flex border-b-[2px] border-gray-400 h-[3rem] py-1'>
            <Link onClick={toggleSideBar} to={'/dashboard'} className={`w-full h-full rounded-full ${dashboardActive ? 'bg-blue-600 text-white' : 'text-black'}`}>
                <div className='w-full h-full flex justify-start items-center px-3 gap-2'>
                    <svg className={dashboardActive ? 'stroke-white':'stroke-blue'} width="30px" height="30px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.918 10.0005H7.082C6.66587 9.99708 6.26541 10.1591 5.96873 10.4509C5.67204 10.7427 5.50343 11.1404 5.5 11.5565V17.4455C5.5077 18.3117 6.21584 19.0078 7.082 19.0005H9.918C10.3341 19.004 10.7346 18.842 11.0313 18.5502C11.328 18.2584 11.4966 17.8607 11.5 17.4445V11.5565C11.4966 11.1404 11.328 10.7427 11.0313 10.4509C10.7346 10.1591 10.3341 9.99708 9.918 10.0005Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.918 4.0006H7.082C6.23326 3.97706 5.52559 4.64492 5.5 5.4936V6.5076C5.52559 7.35629 6.23326 8.02415 7.082 8.0006H9.918C10.7667 8.02415 11.4744 7.35629 11.5 6.5076V5.4936C11.4744 4.64492 10.7667 3.97706 9.918 4.0006Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.082 13.0007H17.917C18.3333 13.0044 18.734 12.8425 19.0309 12.5507C19.3278 12.2588 19.4966 11.861 19.5 11.4447V5.55666C19.4966 5.14054 19.328 4.74282 19.0313 4.45101C18.7346 4.1592 18.3341 3.9972 17.918 4.00066H15.082C14.6659 3.9972 14.2654 4.1592 13.9687 4.45101C13.672 4.74282 13.5034 5.14054 13.5 5.55666V11.4447C13.5034 11.8608 13.672 12.2585 13.9687 12.5503C14.2654 12.8421 14.6659 13.0041 15.082 13.0007Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.082 19.0006H17.917C18.7661 19.0247 19.4744 18.3567 19.5 17.5076V16.4936C19.4744 15.6449 18.7667 14.9771 17.918 15.0006H15.082C14.2333 14.9771 13.5256 15.6449 13.5 16.4936V17.5066C13.525 18.3557 14.2329 19.0241 15.082 19.0006Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h1 className={dashboardActive ? 'text-white' : 'text-blue-600'}>Dashboard</h1>
                </div>
            </Link>
        </div>
        {/* Control Button */}
        <div className='flex border-b-[2px] border-gray-400 h-[3rem] py-1'>
            <Link onClick={toggleSideBar} to={'/dashboard/control'} className={`w-full h-full rounded-full ${controlActive ? 'bg-blue-600 text-white' : 'text-black'}`}>
                <div className='w-full h-full flex justify-start items-center px-3 gap-2'>
                <svg className={controlActive ? 'stroke-white' : 'stroke-blue'} fill="none" width="30px" height="30px" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4V7H13V4H11Z" />
                <path d="M19 15H22V13H19V15Z" />
                <path d="M12 19C14.7614 19 17 16.7614 17 14C17 12.9809 16.6951 12.033 16.1716 11.2426L12.7071 14.7071L11.2929 13.2929L14.7574 9.8284C13.967 9.30488 13.0191 9 12 9C9.23858 9 7 11.2386 7 14C7 16.7614 9.23858 19 12 19Z" />
                <path d="M5 15H2V13H5V15Z" />
                <path d="M18.2929 6.29289L16.2929 8.29289L17.7071 9.70711L19.7071 7.70711L18.2929 6.29289Z" />
                <path d="M6.29289 9.70711L4.29289 7.70711L5.70711 6.29289L7.70711 8.29289L6.29289 9.70711Z" />
                </svg>
                <h1 className={controlActive ? 'text-white' : 'text-blue-600'}>Control</h1>
                </div>
            </Link>
        </div>
        {/* History Button */}
        <div className='flex border-b-[2px] border-gray-400 h-[3rem] py-1'>
            <Link onClick={toggleSideBar} to={'/dashboard/history'} className={`w-full h-full rounded-full ${historyActive ? 'bg-blue-600 text-white' : 'text-black'}`}>
                <div className='w-full h-full flex justify-start items-center px-3 gap-2'>
                <svg className={historyActive ? 'fill-white' : 'fill-blue-600'} width="30px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5.67541V3C3 2.44772 2.55228 2 2 2C1.44772 2 1 2.44772 1 3V7C1 8.10457 1.89543 9 3 9H7C7.55229 9 8 8.55229 8 8C8 7.44772 7.55229 7 7 7H4.52186C4.54218 6.97505 4.56157 6.94914 4.57995 6.92229C5.621 5.40094 7.11009 4.22911 8.85191 3.57803C10.9074 2.80968 13.173 2.8196 15.2217 3.6059C17.2704 4.3922 18.9608 5.90061 19.9745 7.8469C20.9881 9.79319 21.2549 12.043 20.7247 14.1724C20.1945 16.3018 18.9039 18.1638 17.0959 19.4075C15.288 20.6513 13.0876 21.1909 10.9094 20.9247C8.73119 20.6586 6.72551 19.605 5.27028 17.9625C4.03713 16.5706 3.27139 14.8374 3.06527 13.0055C3.00352 12.4566 2.55674 12.0079 2.00446 12.0084C1.45217 12.0088 0.995668 12.4579 1.04626 13.0078C1.25994 15.3309 2.2082 17.5356 3.76666 19.2946C5.54703 21.3041 8.00084 22.5931 10.6657 22.9188C13.3306 23.2444 16.0226 22.5842 18.2345 21.0626C20.4464 19.541 22.0254 17.263 22.6741 14.6578C23.3228 12.0526 22.9963 9.30013 21.7562 6.91897C20.5161 4.53782 18.448 2.69239 15.9415 1.73041C13.4351 0.768419 10.6633 0.756291 8.14853 1.69631C6.06062 2.47676 4.26953 3.86881 3 5.67541Z"/>
                <path d="M12 5C11.4477 5 11 5.44771 11 6V12.4667C11 12.4667 11 12.7274 11.1267 12.9235C11.2115 13.0898 11.3437 13.2344 11.5174 13.3346L16.1372 16.0019C16.6155 16.278 17.2271 16.1141 17.5032 15.6358C17.7793 15.1575 17.6155 14.546 17.1372 14.2698L13 11.8812V6C13 5.44772 12.5523 5 12 5Z"/>
                </svg>
                <h1 className={historyActive ? 'text-white' : 'text-blue-600'}>History</h1>
                </div>
            </Link>
        </div>
        {/* Accounts Button */}
        <div className='flex border-b-[2px] border-gray-400 h-[3rem] py-1'>
            <Link onClick={toggleSideBar} to={'/dashboard/accounts'} className={`w-full h-full rounded-full ${accountsActive ? 'bg-blue-600 text-white' : 'text-black'}`}>
                <div className='w-full h-full flex justify-start items-center px-3 gap-2'>
                    <svg className={accountsActive ? 'fill-white':'fill-blue-600'} width="30px" height="30px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.5 8.25C6.05228 8.25 6.5 7.80228 6.5 7.25C6.5 6.69772 6.05228 6.25 5.5 6.25C4.94772 6.25 4.5 6.69772 4.5 7.25C4.5 7.80228 4.94772 8.25 5.5 8.25ZM5.5 10.25C7.15685 10.25 8.5 8.90685 8.5 7.25C8.5 5.59315 7.15685 4.25 5.5 4.25C3.84315 4.25 2.5 5.59315 2.5 7.25C2.5 8.90685 3.84315 10.25 5.5 10.25Z"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.5501 11C4.72165 11 4.05006 11.6716 4.05006 12.5L4.05005 14C4.05005 14.5523 3.60233 15 3.05004 15C2.49776 15 2.05005 14.5523 2.05005 14L2.05006 12.5C2.05007 10.567 3.61709 9 5.5501 9C7.48308 9 9.05007 10.567 9.05007 12.5V13C9.05007 13.5523 8.60236 14 8.05007 14C7.49779 14 7.05007 13.5523 7.05007 13V12.5C7.05007 11.6716 6.37851 11 5.5501 11Z"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.5001 8.25C13.9478 8.25 13.5001 7.80228 13.5001 7.25C13.5001 6.69772 13.9478 6.25 14.5001 6.25C15.0523 6.25 15.5001 6.69772 15.5001 7.25C15.5001 7.80228 15.0523 8.25 14.5001 8.25ZM14.5001 10.25C12.8432 10.25 11.5001 8.90685 11.5001 7.25C11.5001 5.59315 12.8432 4.25 14.5001 4.25C16.1569 4.25 17.5001 5.59315 17.5001 7.25C17.5001 8.90685 16.1569 10.25 14.5001 10.25Z"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.45 11C15.2784 11 15.95 11.6716 15.95 12.5L15.95 14C15.95 14.5523 16.3977 15 16.95 15C17.5023 15 17.95 14.5523 17.95 14L17.95 12.5C17.95 10.567 16.383 9 14.45 9C12.517 9 10.95 10.567 10.95 12.5V13C10.95 13.5523 11.3977 14 11.95 14C12.5023 14 12.95 13.5523 12.95 13V12.5C12.95 11.6716 13.6216 11 14.45 11Z"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.0501 13.75C9.22165 13.75 8.55006 14.4216 8.55006 15.25L8.55005 16.75C8.55005 17.3023 8.10233 17.75 7.55004 17.75C6.99776 17.75 6.55005 17.3023 6.55005 16.75L6.55006 15.25C6.55007 13.317 8.11709 11.75 10.0501 11.75C11.9831 11.75 13.5501 13.317 13.5501 15.25V16.75C13.5501 17.3023 13.1024 17.75 12.5501 17.75C11.9978 17.75 11.5501 17.3023 11.5501 16.75V15.25C11.5501 14.4216 10.8785 13.75 10.0501 13.75Z"/>
                    <path d="M13 10C13 11.6569 11.6569 13 10 13C8.34315 13 7 11.6569 7 10C7 8.34315 8.34315 7 10 7C11.6569 7 13 8.34315 13 10Z" fill='white'/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 11C10.5523 11 11 10.5523 11 10C11 9.44772 10.5523 9 10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"/>
                    </svg>
                <h1 className={accountsActive ? 'text-white' : 'text-blue-600'}>Accounts</h1>
                </div>
            </Link>
        </div>
        <div className='flex flex-col w-full items-start'>
            <LogOutBtn btnClass={'w-full flex justify-start mt-5 border-b border-gray-400 text-gray-600'}/>
        </div>
        <div className='fixed bottom-0 mb-2'>
            <h1 className='font-thin text-xs text-gray-600'>&copy; ACEM, SensoryGuard 2024</h1>
        </div>
    </div>
  )
}
