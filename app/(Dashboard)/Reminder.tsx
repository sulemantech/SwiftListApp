import { StyleSheet, View } from "react-native";
import React from "react";
import ReminderSection from "@/components/BottomSheet/ReminderSection";

const Reminder = () => {
  return (
    <View style={styles.container}>
      <ReminderSection />
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
});
