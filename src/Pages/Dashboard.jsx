import React, { useEffect, useState } from 'react'
import { showErrorToast } from '../Essentials/ShowToast';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/shared-components/Sidebar/Sidebar';
import Navbar from '../components/shared-components/Navbar/Navbar';
import { supabase } from '../Essentials/Supabase';
import GeneralSensorCard from '../components/shared-components/Gauges/GeneralSensorCard/GeneralSensorCard';

export default function Dashboard() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [dpLink, setDpLink] = useState(null);
    const [email, setEmail] = useState(null);

    const [dataValues, setDataValues] = useState(null); // Values for readings
    const [impDataValues, setImpDataValues] = useState(null); // Important Values such as Prototype ID, allowable temps and humidity, etc.

    const navigate = useNavigate();

    const toggleSideBar = () => {
        setShowSidebar(!showSidebar);
    };

    const getImportantData = async() => {
      console.log('run');

      const nicoId = 'asdf';
      const {data:nico} = await supabase.from('readings').select().eq('proto_id', '4718a148-0f82-401a-af9e-79bb66b9fe4f');

      if(nico){
        console.log('Nico data: ', nico);
        console.log('Nico zero index data: ', nico[0]);
        console.log('Nico zero index temperature data: ', nico[0].temperature);
      }
      const {data:readings} = await supabase.from('readings').select();
      const {data:importantValues} = await supabase.from('prototypes').select();
      if(readings){
        setDataValues(readings);
      }
      if(importantValues){
        setImpDataValues(importantValues);
      }
    }

    const getUserSession = async() => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if(session) {
                setEmail(session.user.email)
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
        }, (payload) => {
          getImportantData();
          console.log(payload);
        }).on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'readings',
        }, (payload) => {
          getImportantData();
          console.log(payload);
        }).subscribe();

        return () => {
          subscription.unsubscribe();
        }
    },[]);

    useEffect(() => {
      console.log(dataValues);
      console.log(impDataValues);
    },[dataValues, impDataValues])
  return (
  <>
    <div className='w-full max-w-full absolute top-0'>
      <Navbar toggleSideBar={toggleSideBar} dpLink={dpLink}/>
        <div className='w-full h-full flex flex-col gap-1 p-2'>
        <Outlet/>
          {/* {dataValues && impDataValues && (
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
          )} */}
        </div>
    </div>
    <Sidebar shown={showSidebar} toggleSideBar={toggleSideBar} email={email}/>
  </>
  )
}