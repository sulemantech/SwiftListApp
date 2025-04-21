import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface ReminderSectionProps {
  reminderText: string;
  isEnabled: boolean;
  onToggleSwitch: (value: boolean) => void;
  onDeleteReminder: () => void;
  onPressReminderField: () => void;
  onAddReminder: () => void;
}

const ReminderSection: React.FC<ReminderSectionProps> = ({
  reminderText,
  isEnabled,
  onToggleSwitch,
  onDeleteReminder,
  onPressReminderField,
  onAddReminder,
}) => {
  return (
    <View style={styles.container}>
      {/* Full Reminder Card */}
      <View style={styles.reminderCard}>
        {/* Title and Actions Row */}
        <View style={styles.titleAndActionsRow}>
          {/* Title */}
          <View style={styles.titleWrapper}>
            <Ionicons
              name="alarm-outline"
              size={width * (20 / 360)}
              color="#6C6C6C"
            />
            <Text style={styles.title}>Reminder</Text>
          </View>
        </View>

        {/* Reminder Field Row */}
        <View style={styles.reminderFieldRow}>
          <TouchableOpacity
            onPress={onPressReminderField}
            style={styles.dateField}
          >
            <Text style={styles.dateText}>{reminderText}</Text>
          </TouchableOpacity>

          <View style={styles.rightIcons}>
            <TouchableOpacity
              onPress={onDeleteReminder}
              style={styles.trashButtonInside}
            >
              <Ionicons
                name="trash-outline"
                size={width * 0.05}
                color="#FF6B6B"
              />
            </TouchableOpacity>
            <Switch
              value={isEnabled}
              onValueChange={onToggleSwitch}
              trackColor={{ false: "#ccc", true: "#6A5AE0" }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Add Reminder */}
        <TouchableOpacity style={styles.addButton} onPress={onAddReminder}>
          <View style={styles.addIconWrapper}>
            <Ionicons name="add" size={width * 0.035} color="#6A5AE0" />
          </View>
          <Text style={styles.addButtonText}>Add Reminder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReminderSection;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.02,
  },
  //   reminderCard: {
  //     backgroundColor: "#F9F9F9",
  //     borderRadius: 12,
  //     paddingVertical: height * 0.02,
  //     paddingHorizontal: width * 0.04,
  //     borderColor: "#E0E0E0",
  //     borderWidth: 1,
  //     alignItems: "center",
  //   },
  reminderCard: {
    backgroundColor: "#F7F6FC", // ✨ Matched background color with TimeSelector
    borderRadius: 15, // ✨ Same rounded corners
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
    marginVertical: height * 0.015,
    alignSelf: "center",
    alignItems: "center",
    shadowColor: "#000", // ✨ Same shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  titleAndActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.012,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#5C5C5C",
    fontWeight: "600",
    marginLeft: width * 0.015,
    fontFamily: "OpenSans-SemiBold",
  },
  reminderFieldRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  dateField: {
    flex: 0.7,
    backgroundColor: "#fff",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.04,
    justifyContent: "center",
  },
  dateText: {
    fontSize: width * 0.035,
    color: "#999",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  trashButtonInside: {
    marginRight: width * 0.03,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.015,
  },
  addIconWrapper: {
    width: width * 0.05,
    height: width * 0.05,
    borderRadius: (width * 0.05) / 2,
    backgroundColor: "#F3F3FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: width * 0.015,
  },
  addButtonText: {
    color: "#A9A0F0",
    fontSize: width * 0.037,
    fontWeight: "500",
  },
  trashButton: {
    marginRight: width * 0.03,
  },
});
