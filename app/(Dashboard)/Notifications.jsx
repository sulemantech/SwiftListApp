import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import Apple from "../../assets/images/apple.svg"; // Import as React component
import productsImages from "../../constants/productsImages"; // Import correctly

const Notifications = () => {
  const currentColor = "green";

  return (
    <View>
      <Text>Hello</Text>
      {/* Move SVG outside of <Text> */}
      <View>
        <productsImages.Bagels width={50} height={50}  />
      </View>
    </View>
  );
};

export default Notifications;
