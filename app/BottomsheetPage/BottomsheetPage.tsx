import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@rneui/themed";
import CalendarTabBar from "@/components/CalanderTabBar";
import TimeSelector from "@/components/BottomSheet/TimeSelector";

export default function BottomsheetPage() {
  const { theme } = useTheme();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.handleIndicator} />
      <Text style={styles.headerText}>Select Your Preferences</Text>
      <View style={styles.calendarContainer}>
        <CalendarTabBar />
        <TimeSelector />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "100%",
    backgroundColor: "#F3F3FD",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  handleIndicator: {
    alignSelf: "center",
    width: 60,
    height: 4,
    backgroundColor: "#aaa",
    borderRadius: 10,
    marginBottom: 16,
    opacity: 0.3,
  },
  headerText: {
    fontSize: 18,
    fontFamily: "OpenSans-SemiBold",
    textAlign: "center",
    color: "#4C4C4C",
    marginBottom: 20,
  },
  calendarContainer: {
    height: 'auto',
    minHeight: 430,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
  },
});
