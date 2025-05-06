import { StyleSheet, View } from 'react-native';
import React from 'react';

const Divider = () => {
  return <View style={styles.divider} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    borderWidth: 1,
    borderColor: '#5C5C5C',
    width: '80%',
    opacity: 0.1,
    marginHorizontal:'auto',
    marginVertical:10
  },
});
