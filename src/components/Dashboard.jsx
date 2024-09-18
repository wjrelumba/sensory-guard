import React, { useEffect, useState } from 'react'
import { showErrorToast } from '../Essentials/ShowToast';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { supabase } from '../Essentials/Supabase';
import GeneralSensorCard from './shared-components/GeneralSensorCard/GeneralSensorCard';

export default function Dashboard() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [dpLink, setDpLink] = useState(null);

    const [dataValues, setDataValues] = useState(null); // Values for readings
    const [impDataValues, setImpDataValues] = useState(null); // Important Values such as Prototype ID, allowable temps and humidity, etc.

    const navigate = useNavigate();

    const toggleSideBar = () => {
        setShowSidebar(!showSidebar);
    };

    const getImportantData = async() => {
      const {data:readings} = await supabase.from('readings').select();
      const {data:importantValues} = await supabase.from('prototypes').select();
      if(readings){
        setDataValues(readings);
      }
      if(importantValues){
        setImpDataValues(importantValues[0]);
      }
    }

    const getUserSession = async() => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if(session) {
                getImportantData();
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
        const subscription = supabase.channel('readings').on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'readings'
        }, (payload) => getImportantData()).subscribe();

        return () => {
          supabase.removeChannel(subscription);
        }
    },[]);

    useEffect(() => {
      console.log(dataValues);
      console.log(impDataValues);
    },[dataValues, impDataValues])
  return (
  <>
    <div className='w-full absolute top-[5rem]'>
        <div className='w-full h-full flex gap-1 p-2'>
          {dataValues && impDataValues && (
            <>
              <GeneralSensorCard 
              key={'4718a148-0f82-401a-af9e-79bb66b9fe4f'}
              prototypeId={'4718a148-0f82-401a-af9e-79bb66b9fe4f'} 
              readingValues={dataValues} 
              prototypeImportantValues={impDataValues}
              />

              <GeneralSensorCard
              key={'84af9f58-26c9-453a-8c16-d8358579c221'}
              prototypeId={'84af9f58-26c9-453a-8c16-d8358579c221'} 
              readingValues={dataValues} 
              prototypeImportantValues={impDataValues}
              />
            </>
          )}
        </div>
    </div>
    <Navbar toggleSideBar={toggleSideBar} dpLink={dpLink}/>
    <Sidebar shown={showSidebar} toggleSideBar={toggleSideBar}/>
  </>
  )
}
