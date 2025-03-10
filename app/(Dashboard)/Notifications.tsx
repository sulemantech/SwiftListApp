import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import Apple from "../../assets/images/SwiftlistApp/Grocery/Fruits/Apple.svg"


interface  svgProps {
  width: number;
  height: number;
  src: number
}
const Notifications = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Coming Soon!</Text>
      <Apple width={100} height={100}/>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
});
