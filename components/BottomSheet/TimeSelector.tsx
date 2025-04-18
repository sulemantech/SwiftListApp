// components/BottomSheet/TimeSelector.tsx

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For clock icon
import TimePickerModal from "./TimePickerModal"; // We'll create this next

interface TimeSelectorProps {
  initialStartTime?: string;
  initialEndTime?: string;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  initialStartTime = "05:00 AM",
  initialEndTime = "06:30 AM",
}) => {
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="time-outline" size={20} color="#555" />
          <Text style={styles.headerText}>Time</Text>
        </View>
        <Switch
          value={isEnabled}
          onValueChange={toggleSwitch}
          thumbColor="#FFFFFF"
          trackColor={{ true: "#B5A9F8", false: "#ccc" }}
        />
      </View>

      {/* Start and End Time */}
      <View style={styles.timeContainer}>
        {/* Start Time */}
        <View style={styles.timeBlock}>
          <Text style={styles.label}>Start Time</Text>
          <TouchableOpacity
            onPress={() => setStartPickerVisible(true)}
            style={styles.timeButton}
          >
            <Text style={styles.timeText}>{startTime}</Text>
          </TouchableOpacity>
        </View>

        {/* End Time */}
        <View style={styles.timeBlock}>
          <Text style={styles.label}>End Time</Text>
          <TouchableOpacity
            onPress={() => setEndPickerVisible(true)}
            style={styles.timeButton}
          >
            <Text style={styles.timeText}>{endTime}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Start Time Picker Modal */}
      <TimePickerModal
        visible={isStartPickerVisible}
        onClose={() => setStartPickerVisible(false)}
        onConfirm={(time) => {
          setStartTime(time);
          setStartPickerVisible(false);
        }}
      />

      {/* End Time Picker Modal */}
      <TimePickerModal
        visible={isEndPickerVisible}
        onClose={() => setEndPickerVisible(false)}
        onConfirm={(time) => {
          setEndTime(time);
          setEndPickerVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F6FC",
    borderRadius: 15,
    marginHorizontal: "auto",
    padding: 16,
    marginVertical: 10,
    width: "90%",
    height: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  timeBlock: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  timeButton: {
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 110,
    alignItems: "center",
  },
  timeText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});

export default TimeSelector;
