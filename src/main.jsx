import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import router from './assets/Router.jsx';

import { LocalNotifications } from "@capacitor/local-notifications";
import { supabase } from './Essentials/Supabase.js';

// Ask for notification permissions first
const requestPermissions = async () => {
    const result = await LocalNotifications.requestPermissions();
    if (result.granted) {
        console.log("✅ Local notification permission granted.");
    } else {
        console.error("❌ Local notification permission denied.");
    }
};

requestPermissions();

// Create a channel on app start for Android notifications
  const createNotificationChannel = async () => {
    const channel = {
      id: 'default',
      name: 'Default Channel',
      description: `Channel for readings`,
      importance: 5,
      sound: 'notification_sound.mp3',
    }
    await LocalNotifications.createChannel(channel);
  };

createNotificationChannel();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ToastContainer />
        <RouterProvider router={router} />
    </StrictMode>
);
