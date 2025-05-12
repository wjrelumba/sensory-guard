import { LocalNotifications } from "@capacitor/local-notifications";

const protoTypeIdsMapper = {
    '4718a148-0f82-401a-af9e-79bb66b9fe4f' : 1,
    '84af9f58-26c9-453a-8c16-d8358579c221': 2,
}

const modeMapper = {
  'temperature': 1,
  'humidity': 2,
  'smoke_gas': 3,
  'vibration': 4,
  'flame': 5,
}

// Sample notification for testing
export const sampleNotificationTrigger = async(title, body) => {
    await LocalNotifications.schedule({
        notifications: [
        {
            title,
            body,
            id: 5,
            channelId: 'default',
            smallIcon: 'splash',
        }
        ]
    });
}

// Warning notifications
  export const normalWarningNotification = async (title, body, id, proto_name, mode) => {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: `${title} - ${proto_name}`,
            body,
            id: protoTypeIdsMapper[id] + modeMapper[mode],
            channelId: 'default2',
            smallIcon: 'splash',
          },
        ],
      });
      console.log('Notification scheduled');
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };
  
  export const highWarningNotification = async (title, body, id, proto_name, mode) => {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: `${title} - ${proto_name}`,
            body,
            id: protoTypeIdsMapper[id] + modeMapper[mode],
            channelId: 'default3',
            smallIcon: 'splash',
          },
        ],
      });
      console.log('Notification scheduled');
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  export const dangerWarningNotification = async (title, body, id, proto_name, mode) => {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: `${title} - ${proto_name}`,
            body,
            id: protoTypeIdsMapper[id] + modeMapper[mode],
            channelId: 'default4',
            smallIcon: 'splash',
          },
        ],
      });
      console.log('Notification scheduled');
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };