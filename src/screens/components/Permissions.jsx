import notifee, { AuthorizationStatus } from '@notifee/react-native';

// Function to request notification permission
export const requestNotificationPermission = async () => {
  try {
    // Request permission
    const settings = await notifee.requestPermission();

    // Check the authorization status
    if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
      console.log('User denied permissions request');
    } else if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
      console.log('User granted permissions request');
    } else if (settings.authorizationStatus === AuthorizationStatus.PROVISIONAL) {
      console.log('User provisionally granted permissions request');
    }
  } catch (error) {
    console.error('Error requesting permission:', error);
  }
};

// Call the function when needed
requestNotificationPermission();
