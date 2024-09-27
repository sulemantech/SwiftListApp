import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SCREENS from '..';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title='Go Back' onPress={() => navigation.goBack()} />
      <Text>LoginScreen</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
