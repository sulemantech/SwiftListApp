import React from 'react';
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
import { CardProvider } from '../Context/CardContext';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <CardProvider>
      <Stack.Navigator initialRouteName={SCREENS.intro}>
        <Stack.Screen
          name={SCREENS.intro}
          component={Onboarding}
          options={{ headerShown: false }}
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
    </CardProvider>
  );
};

export default StackNavigation;
