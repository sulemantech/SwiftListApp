import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

const scheduleNotification = async (triggerTime, title, body) => {
  try {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    // Calculate trigger time
    const now = new Date();
    const target = new Date(triggerTime);

    if (target <= now) {
      console.error('Trigger time must be in the future');
      return;
    }

    const triggerTimestamp = target.getTime();

    // Create a scheduled notification
    await notifee.createTriggerNotification(
      {
        title: title || 'Reminder',
        body: body || `You have a task scheduled for ${new Date(triggerTimestamp).toLocaleString()}`,
        android: {
          channelId,
        },
      },
      {
        type: 0, // Trigger type
        timestamp: triggerTimestamp, // Time to trigger the notification
      }
    );

    console.log('Notification scheduled successfully!');
  } catch (error) {
    console.error('Error scheduling notification:', error.message);
  }
};

export const initializeNotificationListeners = (addNotification) => {
  let hasRegisteredListeners = false;

  if (!hasRegisteredListeners) {
    hasRegisteredListeners = true; // Ensure listeners are registered only once.

    // Foreground Notifications
    notifee.onForegroundEvent(async ({ type, detail }) => {
      if (type === EventType.DELIVERED || type === EventType.PRESS) {
        const notification = {
          title: detail.notification.title,
          body: detail.notification.body,
          time: new Date().getTime(),
        };

        // Only add notification if it's unique (avoid duplicates).
        addNotification(notification);
        console.log('Foreground Notification: ', notification);
      }
    });

    // Background Notifications
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === EventType.DELIVERED || type === EventType.PRESS) {
        const notification = {
          title: detail.notification.title,
          body: detail.notification.body,
          time: new Date().getTime(),
        };

        // Only add notification if it's unique (avoid duplicates).
        addNotification(notification);
        console.log('Background Notification: ', notification);
      }
    });
  }
};

export default scheduleNotification;
