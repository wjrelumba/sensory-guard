import { LocalNotifications } from "@capacitor/local-notifications";

const protoTypeIdsMapper = {
    '4718a148-0f82-401a-af9e-79bb66b9fe4f' : 1,
    '84af9f58-26c9-453a-8c16-d8358579c221': 2,
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
export const warningNotification = async (title, body, id, proto_name) => {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: `${title} - ${proto_name}`,
            body,
            id: protoTypeIdsMapper[id],
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
  