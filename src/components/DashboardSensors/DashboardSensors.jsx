import React, { useEffect, useState } from 'react'
import GeneralCard from '../shared-components/GeneralCard/GeneralCard'
import { supabase } from '../../Essentials/Supabase';
import { useNavigate } from 'react-router-dom';
import Loader from '../shared-components/Loader/Loader';
import Chart from '../shared-components/Chart/Chart';

export default function DashboardSensors() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const [dataValues, setDataValues] = useState(null); // Values for readings
    const [impDataValues, setImpDataValues] = useState(null); // Important Values such as Prototype ID, allowable temps and humidity, etc.

    const getImportantData = async() => {
        const {data:readings} = await supabase.from('readings').select();
        if(readings){
          setDataValues(readings);
        }
        if(impDataValues === null){
          const {data:importantValues} = await supabase.from('prototypes').select();
          if(importantValues){
            importantValues.sort((a,b) => a.proto_number - b.proto_number);
            setImpDataValues(importantValues);
          }
        }
        setIsLoading(false);
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
        }).on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'readings',
        }, (payload) => {
          getImportantData();
        }).subscribe();

        return () => {
          subscription.unsubscribe();
        }
    },[]);
  return (
    <div className='grid grid-rows-2 gap-2 w-full'>
        {isLoading ? (
          <Loader/>
        ) : (
          <div className='flex flex-col gap-2'>
            <h1 className='text-xl text-gray-800'>Prototypes</h1>
            {impDataValues && impDataValues.map((data) => (
              <GeneralCard
              onClick={navigator}
              key={data.id}
              prototypeId={data.id}
              readingValues={dataValues}
              prototypeImportantValues={impDataValues}
              />
            ))}
            <Chart/>
          </div>
        )}
    </div>
  )
}
