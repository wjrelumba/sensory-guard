import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import router from './assets/Router.jsx';

import { LocalNotifications } from "@capacitor/local-notifications";

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
      id: 'default2',
      name: 'Default Channel',
      description: `Channel for readings`,
      importance: 5,
      sound: 'ringtone_calm.ogg',
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
