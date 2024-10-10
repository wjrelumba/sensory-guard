import React, { useEffect, useState } from 'react'
import GeneralCard from '../shared-components/GeneralCard/GeneralCard'
import { supabase } from '../../Essentials/Supabase';
import { useNavigate } from 'react-router-dom';

export default function DashboardSensors() {
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const [dpLink, setDpLink] = useState(null);

    const [dataValues, setDataValues] = useState(null); // Values for readings
    const [impDataValues, setImpDataValues] = useState(null); // Important Values such as Prototype ID, allowable temps and humidity, etc.

    const getImportantData = async() => {
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
                  getImportantData();
              }else{
                  navigate('/');
              }
            } catch (error) {
              showErrorToast(("Error fetching session:", error));
              // Optionally handle the error, e.g., show a message or navigate to an error page
            }
        };

    const navigator = (protoId) => {
        navigate('/dashboard/prototype', {state: {protoId} })
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
  return (
    <div className='grid grid-rows-2 gap-3 w-full'>
        <GeneralCard
        onClick={navigator}
        key={'4718a148-0f82-401a-af9e-79bb66b9fe4f'}
        prototypeId={'4718a148-0f82-401a-af9e-79bb66b9fe4f'}
        readingValues={dataValues}
        prototypeImportantValues={impDataValues}
        />
        <GeneralCard
        onClick={navigator}
        key={'84af9f58-26c9-453a-8c16-d8358579c221'}
        prototypeId={'84af9f58-26c9-453a-8c16-d8358579c221'}
        readingValues={dataValues}
        prototypeImportantValues={impDataValues}
        />
    </div>
  )
}
