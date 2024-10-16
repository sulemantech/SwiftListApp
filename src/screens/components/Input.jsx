import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

// const {width} = Dimensions.get('window');
const TextInput2 = ({
  label,
  placeholder,
  value,
  onFocus,
  onBlur,
  onChangeText,
  borderRadius = 13,
  bgColor = '#fff',
  fontsize = 11,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        onFocus={onFocus}
        onBlur={onBlur}
        style={[
          styles.input,
          {
            backgroundColor: bgColor,
            borderRadius: borderRadius,
            fontSize: fontsize,
          },
        ]}
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
    flex: 1,
    width: '100%',
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginBottom: 3,
    paddingLeft: 3,
    color: '#6c6c6c',
  },
  input: {
    height: 50,
    borderColor: '#DEDDE2',
    borderWidth: 1,
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Light',
    fontSize: 11,
    lineHeight: 16.5,
  },
});
