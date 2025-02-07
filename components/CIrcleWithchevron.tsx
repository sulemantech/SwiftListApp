import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface CircleWithChevronProps {
  chevronColor?: string;
}

const CircleWithChevron: React.FC<CircleWithChevronProps> = ({
  chevronColor = "#61CBD6",
}) => {
  return (
    <LinearGradient
      colors={[chevronColor, chevronColor]}
      start={{ x: 0.25, y: 0.75 }}
      end={{ x: 0.75, y: 0.25 }}
      style={styles.circle}
    >
      <View style={styles.chevron} />
    </LinearGradient>
  );
};

export default CircleWithChevron;

const styles = StyleSheet.create({
  circle: {
    width: 32,
    height: 32,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#61CBD626",
    shadowOffset: { width: 3, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 5,
    borderColor: "#EFF9FF",
    borderWidth: 0.5,
  },
  chevron: {
    width: 11,
    height: 11,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderRadius: 2,
    marginRight: 4,
    borderColor: "#fff", // Chevron color
    transform: [{ rotate: "45deg" }], // Rotate to create a chevron
  },
});
