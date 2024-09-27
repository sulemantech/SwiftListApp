import React from 'react';
import {View, StyleSheet} from 'react-native';
import Onbording from './src/screens/intro/Onbording';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigation';

export default function App() {
  const mytheme = {
    ...DefaultTheme,
    colors:{
      ...DefaultTheme.colors,
      background:"#fff"
    }
  }
  return (
    <NavigationContainer theme={mytheme}>
      <StackNavigation />
    </NavigationContainer>
  );
}

