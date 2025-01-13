import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import GeneralSensorCard from '../components/shared-components/Gauges/GeneralSensorCard/GeneralSensorCard';
import { showErrorToast } from '../Essentials/ShowToast';
import { supabase } from '../Essentials/Supabase';

export default function IndividualPrototype() {
    const location = useLocation();
    const navigate = useNavigate();
    const {protoId} = location.state

    const [dataValues, setDataValues] = useState(null); // Values for readings
    const [impDataValues, setImpDataValues] = useState(null); // Important Values such as Prototype ID, allowable temps and humidity, etc.

    const getImportantData = async() => {
      console.log('run');
      const {data:readings} = await supabase.from('readings').select().order('created_at', {ascending: false}).eq('proto_id', protoId).limit(1);
      if(readings){
        console.log(readings[0]);
        setDataValues(readings[0]);
      }
      if(!impDataValues){
        const {data:importantValues} = await supabase.from('prototypes').select();
        if(importantValues){
          console.log(importantValues);
          setImpDataValues(importantValues);
        }
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
        getImportantData();

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
    <div>
      {impDataValues && dataValues && (
        <div className='w-full h-full flex flex-col gap-1'>
          <GeneralSensorCard 
          key={protoId}
          prototypeId={protoId} 
          readingValues={dataValues} 
          prototypeImportantValues={impDataValues}
          />
          <div className='w-full flex justify-between items-center px-5'>
            <h1 className='font-bold'>Smoke Sensor Value: </h1>
            <div className='bg-blue-600 flex justify-center items-center rounded px-10 py-1'>
              <h1 className='text-white font-bold'>{dataValues.smoke_gas}</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
