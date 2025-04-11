import React, { useState } from "react";
import { Text, View } from "react-native"; // Import Text and View from 'react-native'
import WheelPickerExpo from "react-native-wheel-picker-expo";

// Array of numbers from 1 to 31
const NUMBERS = Array.from({ length: 31 }, (_, index) =>
  (index + 1).toString()
);

export const CardWithCounter = () => {
  // State to hold the selected number
  const [selectedNumber, setSelectedNumber] = useState(NUMBERS[0]); // Default to 1

  return (
    <View
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Displaying the current selected number */}
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Selected Number: {selectedNumber}
      </Text>

      {/* WheelPicker */}
      <WheelPickerExpo
        backgroundColor="#903fff"
        height={300}
        width={150}
        initialSelectedIndex={12} // Set to 0 for the first item (1 in this case)
        items={NUMBERS.map((number) => ({ label: number, value: number }))} // Pass numbers as both label and value
        onChange={({ item }) => setSelectedNumber(item.label)} // Update selected number on change
        haptics={true} // Optional: Add haptic feedback
      />
    </View>
  );
};
