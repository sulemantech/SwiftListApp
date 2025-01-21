import React from 'react';
import { Image, StyleSheet, View, Text, Platform } from 'react-native';
import { ProductProvider } from '../Context/CardContext'
import { useNavigation } from '@react-navigation/native';
import LoginScreen from '../components/Login';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (

    <ProductProvider>
      <LoginScreen navigation={navigation}/>
    </ProductProvider>
  );
}

const styles = StyleSheet.create({

});
