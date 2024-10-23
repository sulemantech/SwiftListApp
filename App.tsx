import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation';
// import { appfirebase } from './src/firebaseConfig';

export default function App() {
  const mytheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
    },
  };
  return (
    <NavigationContainer theme={mytheme}>
      <StackNavigation />
    </NavigationContainer>
  );
}

