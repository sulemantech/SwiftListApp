// components/BottomSheet/TimeSelector.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For clock icon
import TimePickerModal from "./TimePickerModal"; // We'll create this next

const { width, height } = Dimensions.get("window");

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
          <Ionicons name="time-outline" size={width * 0.05} color="#555" />
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

export default TimeSelector;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginTop:24,
    marginHorizontal: "auto",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    marginVertical: height * 0.015,
    width: "90%",
    height: height * (153 / 820),
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
    marginBottom: height * 0.015,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.02,
  },
  headerText: {
    fontSize: width * 0.045,
    fontWeight: "600",
    color: "#333",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.015,
  },
  timeBlock: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontSize: width * 0.035,
    color: "#555",
    marginBottom: height * 0.01,
  },
  timeButton: {
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 10,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.012,
    minWidth: width * 0.25,
    alignItems: "center",
  },
  timeText: {
    fontSize: width * 0.04,
    color: "#333",
    fontWeight: "500",
  },
});
