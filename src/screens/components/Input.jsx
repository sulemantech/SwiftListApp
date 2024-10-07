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
  borderRadius = 20,
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
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 3,
    paddingLeft: 3,
    color: '#5C5C5C',
  },
  input: {
    height: 60,
    borderColor: '#DEDDE2',
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Regular',
    // fontSize: 11,
    fontWeight: '275',
    lineHeight: 16.5,
  },
});
