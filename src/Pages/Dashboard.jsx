import React, { useEffect, useRef, useState } from 'react'
import { showErrorToast } from '../Essentials/ShowToast';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/shared-components/Sidebar/Sidebar';
import Navbar from '../components/shared-components/Navbar/Navbar';
import { supabase } from '../Essentials/Supabase';
import ModalComponent from '../components/shared-components/ModalComponent/ModalComponent';
import { App } from '@capacitor/app';
import { BackgroundMode } from '@anuradev/capacitor-background-mode';
import { flameVibrationNotifierLogic, notifierLogic, smokeGasNotifierLogic } from '../Functions/ThresholdLogicFunctions';

export default function Dashboard() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [dpLink, setDpLink] = useState(null);
    const [email, setEmail] = useState(null);

    const [showExitModal, setShowExitModal] = useState(false);

    const [backgroundActive, setBackgroundActive] = useState(false);

    const [dataValues, setDataValues] = useState(null); // Values for readings
    const [impDataValues, setImpDataValues] = useState(null); // Important Values such as Prototype ID, allowable temps and humidity, etc.

    const navigate = useNavigate();

    const [isReloaded, setIsReloaded] = useState(true);
    const [initialized, setInitialized] = useState(false);

    const backgroundActiveRef = useRef(backgroundActive);

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
                setEmail(session.user.email);
                // This checks if the user needs to change the password for the first time
                const {data} = await supabase.from('accounts').select().eq('user_id', session.user.id);
                if(data){
                  if(!data[0].activated){
                    navigate('/newlyActivated')
                  }
                }
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
      const background = backgroundActiveRef.current;

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

      if(!background) return; // End the code when background mode is not active

      for(var i = 0; i < matchingData.length; i++){   
        notifierLogic( // Temperature Logic
          matchingData[i].dataValue.temperature, 
          matchingData[i].impDataValue.temperature_variables,
          matchingData[i].impDataValue.id,
          matchingData[i].impDataValue.proto_name,
          'temperature',
        ); 
        
        notifierLogic( // Humidity Logic
          matchingData[i].dataValue.humidity, 
          matchingData[i].impDataValue.humidity_variables,
          matchingData[i].impDataValue.id,
          matchingData[i].impDataValue.proto_name,
          'humidity',
        ); 

        flameVibrationNotifierLogic( // Flame Logic
          matchingData[i].dataValue.flame, 
          matchingData[i].impDataValue.flame_variables,
          matchingData[i].impDataValue.id,
          matchingData[i].impDataValue.proto_name,
          'flame',
        );

        flameVibrationNotifierLogic( // Vibration Logic
          matchingData[i].dataValue.vibration, 
          matchingData[i].impDataValue.vibration_variables,
          matchingData[i].impDataValue.id,
          matchingData[i].impDataValue.proto_name,
          'vibration',
        );

        smokeGasNotifierLogic( // Smoke and Gas Logic
          matchingData[i].dataValue.smoke_gas, 
          matchingData[i].impDataValue.smoke_gas_variables,
          matchingData[i].impDataValue.id,
          matchingData[i].impDataValue.proto_name,
          'smoke_gas',
        );

        // // Temperature checks
        // if(matchingData[i].dataValue.temperature > matchingData[i].impDataValue.temperature_variables.danger.high){
        //   highWarningNotification('DANGER!', 'Temperature reached Danger Levels', matchingData[i].impDataValue.id, matchingData[i].impDataValue.proto_name, 'temperature');
        // }
        // else if(matchingData[i].dataValue.temperature > matchingData[i].impDataValue.temperature_variables.high.high){
        //   highWarningNotification('WARNING!', 'Temperature exceeded High threshold', matchingData[i].impDataValue.id, matchingData[i].impDataValue.proto_name, 'temperature');
        // }
        // else if(matchingData[i].dataValue.temperature > matchingData[i].impDataValue.temperature_variables.normal.high){
        //   normalWarningNotification('Temperature Risen', 'Temperature exceeded normal threshold', matchingData[i].impDataValue.id, matchingData[i].impDataValue.proto_name, 'temperature');
        // }
      }
    }

    useEffect(() => {
      let supabaseChannel;

      const exitBackListener = App.addListener('backButton', exitModalFunction);

      const startBackgroundMode = async () => {
        await BackgroundMode.enable();
        await BackgroundMode.setSettings({
          icon: 'splash',
          channelName: 'default',
          title: 'Running in Background',
          text: "Monitoring while you're away",
          color: '#ffffff',
        });
      };

      const subscribeToSupabase = () => {
        if (supabaseChannel) supabaseChannel.unsubscribe();

        supabaseChannel = supabase.channel('readings')
          .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'readings' }, (payload) => {
            getImportantData();
          })
          .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'readings' }, (payload) => {
            getImportantData();
          })
          .subscribe();
      };

      const handleAppStateChange = async (state) => {
        try {
          if (!state.isActive) {
            const isEnabled = await BackgroundMode.isEnabled();
            if (isEnabled) {
              await BackgroundMode.moveToBackground();
            }
          } else {
            const isActive = await BackgroundMode.isActive();
            if (isActive) {
              await BackgroundMode.moveToForeground();
            }
            if (!isActive) {
              getImportantData();
            }
          }
        } catch (err) {
          console.error('Error handling app state change:', err);
        }
      };

      const appStateListener = App.addListener('appStateChange', handleAppStateChange);

      BackgroundMode.addListener('appInBackground', () => {
        setIsReloaded(false);
        setBackgroundActive(true);
        subscribeToSupabase();
      });

      BackgroundMode.addListener('appInForeground', () => {
        setIsReloaded(true);
        setBackgroundActive(false);
        subscribeToSupabase();
      });

      const initialize = async () => {
        try {
          getUserSession();
          await startBackgroundMode();
          subscribeToSupabase();
          setInitialized(true);
        } catch (error) {
          getUserSession();
          subscribeToSupabase();
          setInitialized(true);
        }
      };

      initialize();

      return () => {
        if (supabaseChannel) supabaseChannel.unsubscribe();

        exitBackListener.remove();
        appStateListener.remove();

        BackgroundMode.removeAllListeners(); // Optional: replace with specific removal if needed
        BackgroundMode.disable();
      };
    }, []);

    useEffect(() => {
      backgroundActiveRef.current = backgroundActive;
    }, [backgroundActive]);

  if(initialized) return (
  <>
    <ModalComponent
    message={'Are you sure you want to leave the app?'}
    title={{first: 'Leaving Sensory', second: 'Guard'}}
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
