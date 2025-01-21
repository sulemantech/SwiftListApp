import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { AndroidColor } from '@notifee/react-native';
import { Alert } from 'react-native';

const useFirebaseMessaging = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const getDeviceToken = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (!enabled) {
        return;
      }
      const token = await messaging().getToken();
    } catch (error) {
      console.error('Error fetching device token:', error);
    }
  };

  return { getDeviceToken };
};

export default useFirebaseMessaging;
