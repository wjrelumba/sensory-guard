import React, { useEffect, useState } from 'react'
import { showErrorToast } from '../Essentials/ShowToast';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/shared-components/Sidebar/Sidebar';
import Navbar from '../components/shared-components/Navbar/Navbar';
import { supabase } from '../Essentials/Supabase';
import ModalComponent from '../components/shared-components/ModalComponent/ModalComponent';
import { App } from '@capacitor/app';
import { sampleNotificationTrigger, warningNotification } from '../Functions/NotificationFunctions';
import { BackgroundMode } from '@anuradev/capacitor-background-mode';

export default function Dashboard() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [dpLink, setDpLink] = useState(null);
    const [email, setEmail] = useState(null);

    const [showExitModal, setShowExitModal] = useState(false);

    const [dataValues, setDataValues] = useState(null); // Values for readings
    const [impDataValues, setImpDataValues] = useState(null); // Important Values such as Prototype ID, allowable temps and humidity, etc.

    const navigate = useNavigate();

    const [isReloaded, setIsReloaded] = useState(true);
    const [initialized, setInitialized] = useState(false);

    // To control modal
    const exitModalFunction = () => {
      setShowExitModal(!showExitModal);
    };

    // Exit app function
    const exitApp = () => {
      App.exitApp();
    }

    const toggleSideBar = () => {
        setShowSidebar(!showSidebar);
    };

    const getImportantData = async() => {
      const {data:importantValues} = await supabase.from('prototypes').select();
      if(importantValues){
        setImpDataValues(importantValues);

        // Just get the latest reading for both prototypes
        const tempArray = [];

        // Traverse through the proto ids to get readings for each prototype exclusively
        for(var i = 0; i < importantValues.length; i++){
          const {data:readings} = await supabase.from('readings').select().order('created_at', {ascending: false}).eq('proto_id', importantValues[i].id).limit(1);
          tempArray.push(readings[0]);
        };

        setDataValues(tempArray);

        calculationLogic(tempArray, importantValues);
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

    const calculationLogic = (dataValue, impDataValue) => {
      console.log(dataValue);
      console.log(impDataValue);

      const matchingData = impDataValue.map((value) => {
        // Find the matching data in the dataValue array where proto_id matches value.id
        const match = dataValue.find(data => data.proto_id === value.id);
      
        // If a match is found, return an object containing both matching elements
        if (match) {
          return { impDataValue: value, dataValue: match };
        } else {
          return null;  // No match found, return null (or you can return undefined or any other value)
        }
      }).filter(item => item !== null);  // Filter out the null values to keep only matches
      
      console.log(matchingData);      

      for(var i = 0; i < matchingData.length; i++){
        console.log(`${matchingData[i].dataValue.temperature} : ${matchingData[i].impDataValue.temperature_variables.normal.high}`)
        if(matchingData[i].dataValue.temperature > matchingData[i].impDataValue.temperature_variables.normal.high){
          console.log('Warning! Temperature exceeded normal threshold');
          warningNotification('Warning!', 'Temperature exceeded normal threshold', matchingData[i].impDataValue.id, matchingData[i].impDataValue.proto_name);
        }
      }
    }

    let backgroundInterval = null; // Declare the interval globally

    useEffect(() => {
      App.addListener('backButton', exitModalFunction);
      getUserSession();

      const startBackgroundMode = async() => {
        await BackgroundMode.enable();
        await BackgroundMode.setSettings({
          icon: 'splash',
          channelName: 'default',
          title: 'Running in Background',
          text: "Monitoring while you're away",
          color: '#ffffff',
        })
      }

      startBackgroundMode();

      // Handle the state of app whether in background or foreground
      const handleAppStateChange = async (state) => {
        console.log(`${state} - ${new Date()}`);
        try {
          if (!state.isActive) {
            // App is in the background
            const isEnabled = await BackgroundMode.isEnabled();
            if (isEnabled) {
              await BackgroundMode.moveToBackground();
            }
            console.log('>>> App is in background');
          } else {
            // App is in the foreground
            const isActive = await BackgroundMode.isActive();
            
            if (isActive) {
              await BackgroundMode.moveToForeground();
            }

            if (!isActive) {
              getImportantData();  // Your custom function to handle foreground tasks
              console.log('>>> App is active');
            }
          }
        } catch (err) {
        }
      };

      // Add the listener
      App.addListener('appStateChange', handleAppStateChange);

      BackgroundMode.addListener('appInBackground', () => {
        setIsReloaded(false);

        supabaseChannel.unsubscribe();
        supabaseChannel = supabase.channel('readings')
          .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'readings' }, (payload) => {
            getImportantData();
            console.log(payload);
          })
          .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'readings' }, (payload) => {
            getImportantData();
            console.log(payload);
          })
          .subscribe();
      });

      BackgroundMode.addListener('appInForeground', () => {
        setIsReloaded(true);

        supabaseChannel.unsubscribe();
        supabaseChannel = supabase.channel('readings')
          .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'readings' }, (payload) => {
            getImportantData();
            console.log(payload);
          })
          .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'readings' }, (payload) => {
            getImportantData();
            console.log(payload);
          })
          .subscribe();
      });

      // Initialize the real-time channel when the component mounts
      let supabaseChannel = supabase.channel('readings')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'readings' }, (payload) => {
          getImportantData();
          console.log(payload);
        })
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'readings' }, (payload) => {
          getImportantData();
          console.log(payload);
        })
        .subscribe();

      setInitialized(true);

      // Clean up when the component unmounts
      return () => {
        supabaseChannel.unsubscribe();
        App.removeAllListeners();
        BackgroundMode.removeAllListeners();
        BackgroundMode.disable();
      }
    }, []);  // Empty dependency array to run this effect only once



  if(initialized) return (
  <>
    <ModalComponent
    message={'Are you sure you want to leave the app?'}
    title={<h2 className="text-xl font-bold w-full">Leaving Sensory<span className='text-blue-600'>Guard</span>?</h2>}
    show={showExitModal}
    onClose={exitModalFunction}
    acceptFunction={exitApp}
    acceptMessage='Exit'
    closeButtonMessage='Cancel'
    />
    <div className='w-full max-w-full absolute top-0'>
      <Navbar toggleSideBar={toggleSideBar} dpLink={dpLink}/>
        <div className='w-full h-full flex flex-col gap-1 p-2'>
        {isReloaded && <Outlet/>}
        </div>
    </div>
    <Sidebar shown={showSidebar} toggleSideBar={toggleSideBar} email={email}/>
  </>
  )
}
