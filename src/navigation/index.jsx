import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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
import { ProductProvider } from '../Context/CardContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const StackNavigation = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  
  // useEffect(() => {
  //   const checkFirstLaunch = async () => {
  //     const hasCompletedOnboarding = await AsyncStorage.getItem('hasCompletedOnboarding');
  //     setIsFirstLaunch(!hasCompletedOnboarding);
  //   };
  //   checkFirstLaunch();
  // }, []);
  
  // const completeOnboarding = async () => {
  //   await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
  //   setIsFirstLaunch(false);
  // };
  return (
    <ProductProvider>
      <Stack.Navigator initialRouteName={ isFirstLaunch ? SCREENS.intro : SCREENS.Dashbored}>
        <Stack.Screen
          name={SCREENS.intro}
          component={Onboarding}
          options={{ headerShown: false }}
          // initialParams={{ onComplete: completeOnboarding }}
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
    </ProductProvider>
  );
};

export default StackNavigation;
