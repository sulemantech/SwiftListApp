import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={mytheme}>
        <StackNavigation />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

