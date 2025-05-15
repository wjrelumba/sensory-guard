import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../Essentials/Supabase';
import { showErrorToast } from '../Essentials/ShowToast';
import { Camera } from '@capacitor/camera';
import { LocalNotifications } from '@capacitor/local-notifications';
import { sampleNotificationTrigger } from '../Functions/NotificationFunctions';

export default function Homepage() {
  const navigate = useNavigate();

  const getUserSession = async() => {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          navigate('/dashboard');
        }
      } catch (error) {
        showErrorToast(("Error fetching session:", error));
        // Optionally handle the error, e.g., show a message or navigate to an error page
      }
  };

  const requestCameraPermission = async() => {
    await Camera.requestPermissions();
  };

  // Ask for notification permissions first
  const requestNotificationPermissions = async () => {
    await LocalNotifications.requestPermissions();
  };

  // Create a channel on app start for Android notifications
  const createNotificationChannels = async () => {
    const normalThresholdChannel = {
      id: 'default2',
      name: 'Normal Threshold Channel',
      description: `Channel for readings`,
      importance: 5,
      sound: 'system_notification_4_206493.ogg',
    };

    const highThresholdChannel = {
      id: 'default3',
      name: 'High Threshold Channel',
      description: `Channel for readings`,
      importance: 5,
      sound: 'alert_33762.ogg',
    };

    const dangerThresholdChannel = {
      id: 'default4',
      name: 'Danger Threshold Channel',
      description: `Channel for readings`,
      importance: 5,
      sound: 'siren_alert_96052.ogg',
    };

    await LocalNotifications.createChannel(normalThresholdChannel);
    await LocalNotifications.createChannel(highThresholdChannel);
    await LocalNotifications.createChannel(dangerThresholdChannel);
  };
  
  useEffect(() => {
    getUserSession();
    requestCameraPermission();
    createNotificationChannels();
    requestNotificationPermissions();
  },[]);

  return (
    <div className='w-screen h-screen p-2'>
        <div className='w-full h-full flex flex-col items-center justify-start'>
          <div className='w-[20rem] h-[20rem] mt-5'>
            <img className='object-contain w-full h-full' src="./channels4_profile-removebg-preview.png" alt="" />
          </div>
          <div className='w-full flex justify-center items-center gap-0'>
             <h1 className='text-gray-800 text-3xl font-bold'>Sensory</h1>
             <h1 className='text-blue-600 text-3xl font-bold'>Guard</h1>
             <h1 className='text-gray-800 text-3xl font-bold'>:</h1>
          </div>
          <div className='w-full flex flex-col items-center mb-5'>
            <h1 className='text-gray-600 font-bold'>Server Room</h1>
            <h1 className='text-gray-600 font-bold'>Monitoring System</h1>
          </div>
            <div className='flex flex-col items-center justify-center w-full'>
              <Link className='reddit-sans-condensed flex justify-center px-3 py-2 font-bold bg-blue-600 rounded-md text-white w-[50%] mb-1' to={'/login'}>Login</Link>
              {/* <Link className='flex justify-center border-[2px] border-blue-400 px-3 py-2 bg-gray-900 rounded-md text-white w-[75%] mt-1' to={'/signup'}>Signup</Link> */}
            </div>
        </div>
    </div>
  );
};
