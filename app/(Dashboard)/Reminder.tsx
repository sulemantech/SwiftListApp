import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { COLORS } from "@/constants";
import ReminderSection from "@/components/BottomSheet/ReminderSection"; // <-- import ReminderSection
import ReminderModal from "@/components/BottomSheet/ReminderModal"; // <-- import ReminderModal

const Reminder = () => {
  const [reminderText, setReminderText] = useState("DD MM - 00:00 AM");
  const [isEnabled, setIsEnabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleToggleSwitch = (value: boolean) => {
    setIsEnabled(value);
  };

  const handleDeleteReminder = () => {
    console.log("Reminder Deleted");
  };

  const handleAddReminder = () => {
    console.log("Add Reminder");
  };

  const handlePressReminderField = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ReminderSection
          reminderText={reminderText}
          isEnabled={isEnabled}
          onToggleSwitch={handleToggleSwitch}
          onDeleteReminder={handleDeleteReminder}
          onAddReminder={handleAddReminder}
          onPressReminderField={handlePressReminderField}
        />

        {/* Modal for selecting reminder */}
        <ReminderModal visible={isModalVisible} onClose={handleCloseModal} />
      </View>
    </SafeAreaProvider>
  );
};

export default Reminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
});
