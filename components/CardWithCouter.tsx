import React, { useState } from "react";
import { Text, View } from "react-native"; // Import Text and View from 'react-native'
import WheelPickerExpo from "./picker";


interface CardWithCounterProps {
  Element: any; // Define the type of Element as an array of numbers
}

export const CardWithCounter = ({ Element }: CardWithCounterProps) => {
  // State to hold the selected number
  const [selectedNumber, setSelectedNumber] = useState(Element[1]); // Default to 1

  return (
    <View
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Displaying the current selected number */}
      {/* <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Selected Number: {selectedNumber}</Text> */}

      {/* WheelPicker */}
      <WheelPickerExpo
        backgroundColor="#FFFFFF"
        height={150}
        width={70}
        initialSelectedIndex={1} // Set to 0 for the first item (1 in this case)
        items={Element.map((number:any) => ({ label: number, value: number }))} // Pass numbers as both label and value
        onChange={({ item }) => setSelectedNumber(item.label)} // Update selected number on change
        haptics={true} // Optional: Add haptic feedback
      />
    </View>
  );
};
