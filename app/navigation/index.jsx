import React, { useState, useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import remoteConfig from '@react-native-firebase/remote-config';  // Firebase Remote Config
import SCREENS from '../screens';
import Onboarding from '../screens/intro/Onbording';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/Signup';
import ForgotPassword from '../screens/auth/ForgotPassword';
import EmailSuccess from '../screens/auth/EmailSuccess';
import ResetPassword from '../screens/auth/ResetPassword';
import Congratulation from '../screens/auth/Congratulation';
import DashboredIndex from '../screens/Dashbored/DashboredIndex';
import ProductsPage from '../screens/Dashbored/ProductsPage';
import Theme from '../screens/components/Theme';
import { ProductContext, ProductProvider } from '../Context/CardContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { initializeNotificationListeners } from '../screens/components/InAppNotification';

const Stack = createStackNavigator();

const StackNavigation = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const { addNotification } = useContext(ProductContext);
  useEffect(() => {
    initializeNotificationListeners(addNotification);
  }, [addNotification]);

  useEffect(() => {
    const fetchRemoteConfig = async () => {
      try {
        await remoteConfig().fetchAndActivate();
        const hasCompletedOnboarding = remoteConfig().getValue('hasCompletedOnboarding').asString();
        setIsFirstLaunch(hasCompletedOnboarding === 'false'); // If false, show onboarding
      } catch (error) {
        console.error("Error fetching Remote Config: ", error);
      }
    };

    fetchRemoteConfig();

    const subscriber = auth().onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
      if (initializing) setInitializing(false);
    });

    return subscriber;
  }, [initializing]);

  const completeOnboarding = async () => {
    try {
      await remoteConfig().setDefaults({
        hasCompletedOnboarding: 'true', // Update the flag in Remote Config
      });
      setIsFirstLaunch(false);
    } catch (error) {
      console.error("Error completing onboarding: ", error);
    }
  };


  if (initializing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#52C3FF" />
      </View>
    );
  }

  return (
      <Stack.Navigator
        initialRouteName={
          isAuthenticated
            ? SCREENS.Dashbored
            : isFirstLaunch
            ? SCREENS.intro
            : SCREENS.login
        }
      >
        <Stack.Screen
          name={SCREENS.intro}
          component={Onboarding}
          options={{ headerShown: false }}
          initialParams={{ onComplete: completeOnboarding }}
        />
        <Stack.Screen
          name={SCREENS.login}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.signup}
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.ForgotPassword}
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.EmailSuccess}
          component={EmailSuccess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.ResetPassword}
          component={ResetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.Congratulation}
          component={Congratulation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.Dashbored}
          component={DashboredIndex}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.ProductsPage}
          component={ProductsPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.Theme}
          component={Theme}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
};

export default StackNavigation;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // Centers the spinner vertically
    alignItems: 'center',      // Centers the spinner horizontally
    backgroundColor: '#fff',   // Optional: change the background color if needed
  },
});