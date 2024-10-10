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
      const {data:readings} = await supabase.from('readings').select().eq('proto_id', protoId);
      const {data:importantValues} = await supabase.from('prototypes').select().eq('id', protoId);
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
    <div>
        <GeneralSensorCard 
        key={protoId}
        prototypeId={protoId} 
        readingValues={dataValues} 
        prototypeImportantValues={impDataValues}
        />
    </div>
  )
}
