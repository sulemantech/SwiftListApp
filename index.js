/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './App';
import {name as appName} from './app.json';
import messaging  from '@react-native-firebase/messaging';
messaging().setBackgroundMessageHandler(async remoteMessage => {
  });
messaging().getInitialNotification(async remoteMessage => {
  });

AppRegistry.registerComponent(appName, () => App);
