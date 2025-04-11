import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import { CardWithCounter } from "@/components/CardWithCouter";

const Reminder = () => {
  return (
    <View style={styles.container}>
      <CardWithCounter/>
    </View>
  );
};

export default Reminder;

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
