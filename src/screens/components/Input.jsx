import React from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';

const { width } = Dimensions.get('window');
const TextInput2 = ({ label, placeholder, value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9" 
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default TextInput2;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: width,
  },
  label: {
    fontFamily: 'Poppins',
    fontSize: 12, // Adjusted for better visibility
    fontWeight: '500', 
    marginBottom: 5, 
    paddingLeft: 15,
    color:"#5C5C5C",
  },
  input: {
    height: 60, 
    marginHorizontal:10,
    borderColor: '#DEDDE2', 
    borderWidth: 1,
    borderRadius: 13, 
    paddingHorizontal: 10, 
    fontFamily: 'Poppins', 
    fontSize: 11,
    fontWeight: '275', 
    backgroundColor:"#FAFAFA",
    lineHeight: 16.5, 
  },
});
