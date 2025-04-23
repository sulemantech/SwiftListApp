
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Dimensions,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ReminderPickerModal from "@/components/BottomSheet/ReminderPickerModal";

const { width, height } = Dimensions.get("window");

const ReminderSection = () => {
  const [reminders, setReminders] = useState<string[]>(["DD MM - 00:00 AM"]);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleToggleSwitch = (value: boolean) => {
    setIsEnabled(value);
  };

  const handleDeleteReminder = (index: number) => {
    if (reminders.length === 1) {
      // Only one reminder left, reset to default
      setReminders(["DD MM - 00:00 AM"]);
      setIsEnabled(false);
    } else {
      const updatedReminders = [...reminders];
      updatedReminders.splice(index, 1);
      setReminders(updatedReminders);
    }
  };

  const handleAddReminder = () => {
    setEditingIndex(null); // Adding new
    setIsModalVisible(true);
  };

  const handlePressReminderField = (index: number) => {
    setEditingIndex(index); // Editing existing
    setIsModalVisible(true);
  };

  const handleModalSave = (selectedValue: string) => {
    if (reminders.length === 1 && reminders[0] === "DD MM - 00:00 AM") {
      // If default, replace it
      setReminders([selectedValue]);
    } else if (editingIndex !== null) {
      // If editing
      const updatedReminders = [...reminders];
      updatedReminders[editingIndex] = selectedValue;
      setReminders(updatedReminders);
    } else {
      // Adding new
      setReminders((prev) => [...prev, selectedValue]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title Row */}
      <View style={styles.titleAndActionsRow}>
        <View style={styles.titleWrapper}>
          <Ionicons
            name="alarm-outline"
            size={width * (20 / 360)}
            color="#6C6C6C"
          />
          <Text style={styles.title}>Reminder</Text>
        </View>
      </View>

      {/* Reminder Fields */}
      {reminders.map((reminder, index) => (
        <View key={index} style={styles.reminderFieldRow}>
          <TouchableOpacity
            onPress={() => handlePressReminderField(index)}
            style={styles.dateField}
          >
            <Text style={styles.dateText}>{reminder}</Text>
          </TouchableOpacity>

          <View style={styles.rightIcons}>
            <TouchableOpacity
              onPress={() => handleDeleteReminder(index)}
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
              onValueChange={handleToggleSwitch}
              trackColor={{ false: "#ccc", true: "#B5A9F8" }}
              thumbColor="#fff"
            />
          </View>
        </View>
      ))}

      {/* Add Reminder */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddReminder}>
        <View style={styles.addIconWrapper}>
          <Ionicons name="add" size={width * (12.5 / 360)} color="#6A5AE0" />
        </View>
        <Text style={styles.addButtonText}>Add Reminder</Text>
      </TouchableOpacity>

      {/* Reminder Picker Modal */}
      <ReminderPickerModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={(value) => {
          handleModalSave(value);
          setIsModalVisible(false);
        }}
      />
    </View>
  );
};

export default ReminderSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginHorizontal: "auto",
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
    marginVertical: height * 0.015,
    alignItems: "center",
    width: width * (320 / 360),
    shadowColor: "#000",
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
    fontSize: width * (16 / 360),
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
    marginBottom: height * 0.01,
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
    alignItems: "center",
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
    marginTop: height * 0.029,
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
});

