import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "@/constants";

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Coming Soon!</Text>
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
