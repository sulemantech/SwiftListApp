import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
  TextInputProps,
  Dimensions,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

interface TextInput2Props extends TextInputProps {
  label?: string;
  borderRadius?: number;
  bgColor?: string;
  fontsize?: number;
  error?: string;
}

const TextInput2: React.FC<TextInput2Props> = ({
  label,
  placeholder,
  value,
  onFocus,
  onBlur,
  secureTextEntry = false,
  onChangeText,
  borderRadius = 13,
  bgColor = "#fff",
  fontsize = 13,
  error,
  style,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const showError = Boolean(error);

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
            color: colorScheme === "dark" ? "#000" : "#000",
            borderColor: showError ? "red" : "#DEDDE2",
          },
          style as object, // Explicit cast to avoid style type conflicts
        ]}
        placeholder={showError ? error : placeholder}
        placeholderTextColor={"#A9A9A9"}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

export default TextInput2;

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.8889,
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
