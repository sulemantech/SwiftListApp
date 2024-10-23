import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = ({ color = '#000', thickness = 1, marginVertical = 10 }) => {
  return (
    <View
      style={[
        styles.divider,
        { backgroundColor: color, height: thickness, marginVertical: marginVertical },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
  },
});

export default Divider;
