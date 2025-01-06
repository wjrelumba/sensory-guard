import React, { useEffect, useState } from 'react'

export default function Accounts() {
  const [shownUser, setShownUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);


  // Sample users
  const sampleUser = [{
      name: 'Kyle Kryzel Carandang',
      email: 'kyy@gmail.com',
      role: 'Admin',
      date: 'December 3, 2024',
    },{
      name: 'William James Elumba',
      email: 'wils@gmail.com',
      role: 'Admin',
      date: 'December 3, 2024',
    },{
      name: 'Nico Royce Aniag',
      email: 'nico@gmail.com',
      role: 'Analyst',
      date: 'December 2, 2024',
    },{
      name: 'Alyssa Mae Macatula',
      email: 'aly@gmail.com',
      role: 'Analyst',
      date: 'December 2, 2024',
    },{
      name: 'Admin',
      email: 'admin@gmail.com',
      role: 'Admin',
      date: 'December 1, 2024',
    },{
      name: 'Admin 2',
      email: 'admin2@gmail.com',
      role: 'Admin',
      date: 'December 1, 2024',
    },{
      name: 'Monique Enciso',
      email: 'nik@gmail.com',
      role: 'Admin',
      date: 'November 30, 2024',
    },
  ];

  // Only show 5 users per page
  const shownUserFunc = () => {
    const shownUserChild = sampleUser.filter((_, index) => index < currentPage*5 && index > (currentPage*5 - 6)).map((data) => data);
    setShownUser(shownUserChild);
    console.log(shownUserChild);
  };

  const nextPage = () => {
    if(currentPage < totalPages){
      setCurrentPage(currentPage + 1);
    };
  };

  const prevPage = () => {
    if(currentPage > 0){
      setCurrentPage(currentPage - 1);
    };
  };

  // Run once on component load, get the number of pages
  useEffect(() => {
    const totalPageValue = Math.ceil(sampleUser.length / 5)
    console.log(totalPageValue);
    setTotalPages(totalPageValue);
  },[]);

  // Run function whenever current page is changed
  useEffect(() => {
    shownUserFunc();
  },[currentPage]);

  return (
    <div className='w-full h-full py-1 px-2'>
      <div className='w-full h-full flex flex-col gap-1'>
        <h1 className='text-2xl font-bold'>Accounts</h1>
        <div className='w-full flex items-center gap-2'>
          <div className='w-[50%]'>
            <select className='bg-white py-2 px-3 rounded-lg border border-gray-400 text-gray-600' name="" id="">
              <option value="">Creation Date</option>
            </select>
          </div>
          <div className='w-[70%] flex justify-between items-center'>
            <div className='w-[2.5rem] h-[2.5rem] bg-black flex items-center justify-center rounded-lg'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up text-white"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
            </div>
            <div className='w-[2.5rem] h-[2.5rem] bg-blue-600 flex items-center justify-center rounded-lg'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus text-white"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <input className='w-[70%] border-gray-400 text-gray-600 py-2 px-3 border rounded-lg' type="text" placeholder='Search...'/>
        </div>
        <div className='w-full flex flex-col gap-2 mt-7'>
          {shownUser && shownUser.map((data, index) => (
            <div className='w-full flex p-2 h-[5.2rem] bg-gray-100 rounded-md border border-gray-400 hover:border-blue-500 hover:bg-blue-100' key={index}>
              <div className='w-[75%] flex flex-col justify-between'>
                <div className='w-full flex flex-col'>
                  <h1 className='font-bold'>{data.name}</h1>
                  <h1 className='text-sm'>{data.email}</h1>
                </div>
                <div className='w-full'>
                  <h1 className='font-thin italic text-xs'>Created on: {data.date}</h1>
                </div>
              </div>
              <div className='w-[25%] flex justify-start items-center'>
                <h1>{data.role}</h1>
              </div>
            </div>
          ))}
        </div>
        <div className='w-full flex justify-center'>
          {currentPage != 1 && <svg onClick={prevPage} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>}
          <h1>
            page {currentPage} of {totalPages}
          </h1>
          {currentPage < totalPages && <svg onClick={nextPage} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>}
        </div>
      </div>
    </div>
  )
}
