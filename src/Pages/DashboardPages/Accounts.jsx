import React, { useEffect, useState } from 'react'
import ModalComponent from '../../components/shared-components/ModalComponent/ModalComponent';
import { supabase } from '../../Essentials/Supabase';
import { showErrorToast } from '../../Essentials/ShowToast';
import AccountsCard from '../../components/shared-components/AccountsCard/AccountsCard';
import { useNavigate } from 'react-router-dom';


export default function Accounts() {
  const navigate = useNavigate();
  const [sampleUser, setSampleUser] = useState();
  const [shownUser, setShownUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [lengthOfDisplay, setLengthOfDisplay] = useState(5);

  const [ascendingOrder, setAscendingOrder] = useState(true);

  const [showCreateAccModal, setShowCreateAccModal] = useState(false);

  // Variable states for account creation
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState('Admin');

  const getAccounts = async() => {
    const {data} = await supabase.from('accounts').select().order('created_at', {ascending: false});
    if(data){
      // data.sort((a, b) => a.date_created.month - b.date_created.month).sort((a, b) => a.date_created.day - b.date_created.day);
      setSampleUser(data);
    }
  }

  // Only show 5 users per page
  const shownUserFunc = () => {
    const startIndex = (currentPage - 1) * lengthOfDisplay;
    const endIndex = currentPage * lengthOfDisplay;
  
    const shownUserChild = sampleUser
      .filter((_, index) => index >= startIndex && index < endIndex)
      .map((data) => data);
  
    setShownUser(shownUserChild);
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

  const ascendOrderFunc = () => {
    setAscendingOrder(!ascendingOrder);
    const tempArray = [...sampleUser];
    tempArray.reverse();
    setSampleUser(tempArray);
  };

  const createAccModalFunc = () => {
    setShowCreateAccModal(!showCreateAccModal);
  };

  const inputHandler = (e) => {
    const {value, name} = e.target;
    switch(name){
      case 'length':
        setCurrentPage(1);
        setLengthOfDisplay(value);
        break;
    }
  }

  const addAccInputHandler = (e) => {
    const {value, name} = e.target;
    switch(name){
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'role':
        setRole(value);
        break;
    };
  };

  const createAccount = async() => {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    const currentSessionKey = localStorage.key(0);
    const currentSession = localStorage.getItem(currentSessionKey);

    const {data, error} = await supabase.auth.signUp({
      email,
      password: 'asdfasdf',
    });

    if(error){
      showErrorToast(error.message);
      return;
    }
    if(data){
      const {error} = await supabase.from('accounts').insert({
        name,
        email,
        date_created: {
          day,
          month: month + 1,
          year, 
        },
        role,
      });
      if(error){
        showErrorToast(error.message);
      }
      else{
        localStorage.setItem(currentSessionKey, currentSession);
        setEmail(null);
        setName(null);
        setRole('Admin');
        setShowCreateAccModal(false);
      };
    }
  };

  const addAccInputRenderer = () => (
    <div className='w-full flex flex-col gap-1 mt-5'>
      <div className='w-full flex items-center gap-1'>
        <label className='w-[20%]' htmlFor="">Name:</label>
        <input onChange={addAccInputHandler} name='name' className='w-[80%] px-1 py-1 rounded-lg border border-gray-300' type="text" />
      </div>
      <div className='w-full flex items-center gap-1'>
        <label className='w-[20%]' htmlFor="">Email:</label>
        <input onChange={addAccInputHandler} name='email' className='w-[80%] px-1 py-1 rounded-lg border border-gray-300' type="text" />
      </div>
      <div className='w-full flex items-center gap-1'>
        <label className='w-[20%]' htmlFor="">Role:</label>
        <select onChange={addAccInputHandler} name='role' className='w-[80%] px-1 py-1 rounded-lg border border-gray-300' type="text">
          <option value="Admin">Admin</option>
          <option value="Analyst">Analyst</option>
        </select>
      </div>
    </div>
  );

  const totalPageFunc = () => {
    const totalPageValue = Math.ceil(sampleUser.length / lengthOfDisplay)
    setTotalPages(totalPageValue);
  };

  const navigateToIndiv = (dataValue) => {
    if(!dataValue.activated){
      navigate('/dashboard/accountQR', {state: dataValue})
    }
    else{
      navigate('/dashboard/individualAcc', {state: dataValue})
    }
    // navigate('/dashboard/individualAcc', {state: dataValue})
  }

  // Run once on component load, get the number of pages
  useEffect(() => {
    getAccounts();
    const subscription = supabase.channel('accounts').on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'accounts'
      }, (payload) => {
        getAccounts();
      }).on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'accounts',
      }, (payload) => {
        getAccounts();
      }).subscribe();

      return () => {
        subscription.unsubscribe();
      };
  },[]);

  // Run function whenever current page is changed
  useEffect(() => {
    if(sampleUser){
      shownUserFunc();
      totalPageFunc();
    }
  },[currentPage, sampleUser, lengthOfDisplay]);

  return (
    <>
    <ModalComponent
    show={showCreateAccModal}
    title={{first: 'Create', second: 'Account'}}
    inputElement={addAccInputRenderer()}
    mode='input'
    onClose={createAccModalFunc}
    acceptMessage='Create'
    closeButtonMessage='Cancel'
    acceptFunction={createAccount}
    />
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
            <div onClick={ascendOrderFunc} className='w-[2.5rem] h-[2.5rem] bg-black flex items-center justify-center rounded-lg'>
              {ascendingOrder ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up text-white ascend-counter-clockwise"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-down text-white ascend-clockwise"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              )}
            </div>
            <div className='w-[2.5rem] h-[2.5rem] bg-blue-600 flex items-center justify-center rounded-lg'>
              <svg onClick={createAccModalFunc} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus text-white"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </div>
          </div>
        </div>
        <div className='w-full flex gap-1 items-center'>
          <input className='w-[70%] border-gray-400 text-gray-600 py-2 px-3 border rounded-lg' type="text" placeholder='Search...'/>
          <input onBlur={inputHandler} name='length' className='w-[2.5rem] h-[2.5rem] border-gray-400 text-gray-600 border rounded-lg text-center text-lg' type="number" defaultValue={lengthOfDisplay}/>
        </div>
        <div className='w-full flex flex-col gap-2 mt-7'>
          {shownUser && shownUser.map((data, index) => (
            <AccountsCard
            key={index}
            dataObject={data}
            index={index}
            clickFunction={navigateToIndiv}
            />
          ))}
        </div>
        {/* Pagination */}
        <div className='w-full flex justify-center'>
          {currentPage != 1 && <svg onClick={prevPage} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>}
          <h1>
            Page <span className='border border-gray-500 rounded-md px-2'>{currentPage}</span> of <span className='border border-gray-500 rounded-md px-2'>{totalPages}</span>
          </h1>
          {currentPage < totalPages && <svg onClick={nextPage} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>}
        </div>
      </div>
    </div>
    </>
  )
}
