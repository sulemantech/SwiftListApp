import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@rneui/themed";
import CalendarTabBar from "@/components/CalanderTabBar";
import TimeSelector from "@/components/BottomSheet/TimeSelector";
import Header from "@/components/Header";
import { useRouter } from "expo-router";
import AddSubTask from "@/components/AddSubTask";

export default function BottomsheetPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
        <Header     onBack={() => router.back()}
          title={"Select Your Preferences"}/>
      <View style={styles.calendarContainer}>
        {/* <CalendarTabBar /> */}
      </View>
      <TimeSelector />
      <AddSubTask/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: "100%",
    backgroundColor: "#f4f4f4",
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
    height: "auto",
    backgroundColor: "#000",
    minHeight: 430,
    overflow: "hidden",
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
  },
});
