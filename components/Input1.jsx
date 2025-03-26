import React from 'react';
import { StyleSheet, useColorScheme, Text, TextInput, View } from 'react-native';

const TextInput2 = ({
  label,
  placeholder,
  value,
  onFocus,
  onBlur,
  secureTextEntry = false,
  onChangeText,
  borderRadius = 13,
  bgColor = '#fff',
  fontsize = 13,
  style,
}) => {
  const colorScheme = useColorScheme();  // Correct placement of useColorScheme

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        onFocus={onFocus}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        style={[
          styles.input,
          {
            backgroundColor: bgColor,
            borderRadius: borderRadius,
            fontSize: fontsize,
            color: colorScheme === "dark" ? "#000" : "#000", // Corrected usage
          },
          style,
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
    width: "100%",
    // backgroundColor:"red",
    // marginBottom: 16,
  },
  label: {
    fontFamily: "OpenSans-Regular",
    fontSize: 12,
    marginBottom: 12,
    paddingLeft: 3,
    color: "#5C5C5C",
  },
  input: {
    height: 50,
    borderColor: "#DEDDE2",
    borderWidth: 1,
    paddingHorizontal: 20,
    fontFamily: "OpenSans-Light",
    fontSize: 11,
    lineHeight: 16.5,
  },
});
