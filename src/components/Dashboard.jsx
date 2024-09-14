import React, { useEffect, useState } from 'react'
import { showErrorToast } from '../Essentials/ShowToast';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { supabase } from '../Essentials/Supabase';

export default function Dashboard() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [username, setUsername] = useState(null);
    const [dpLink, setDpLink] = useState(null);
    const [books, setBooks] = useState(null);
    
    const [toReadMode, setToReadMode] = useState(true);
    const [currentMode, setCurrentMode] = useState(false);
    const [doneMode, setDoneMode] = useState(false);

    const navigate = useNavigate();

    const toggleSideBar = () => {
        setShowSidebar(!showSidebar);
    };

    const getUserSession = async() => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if(session) {
                const {data:bookData} = await supabase.from('books').select().eq('user_id',session.user.id);
                setBooks(bookData);
                const {data:usernameData} = await supabase.from('profile').select().eq('id',session.user.id);
                if(usernameData){
                    console.log(usernameData);
                    setUsername(usernameData[0].username);
                    setDpLink(usernameData[0].profileDP);
                }
            }else{
                navigate('/');
            }
          } catch (error) {
            showErrorToast(("Error fetching session:", error));
            // Optionally handle the error, e.g., show a message or navigate to an error page
          }
      };

    useEffect(() => {
        getUserSession();
    },[]);

  return (
  <>
    <div className='w-full h-[5rem] absolute top-[5rem]'>
        <h1>Put your Dashboard Component here</h1>
    </div>
    <Navbar toggleSideBar={toggleSideBar} dpLink={dpLink}/>
    <Sidebar shown={showSidebar} toggleSideBar={toggleSideBar}/>
  </>
  )
}
