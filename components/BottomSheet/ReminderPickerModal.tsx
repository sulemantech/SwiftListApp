import React, { useState, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const dates = Array.from({ length: 31 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);
const hours = Array.from({ length: 12 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);
const minutes = Array.from({ length: 60 }, (_, i) =>
  i.toString().padStart(2, "0")
);
const periods = ["AM", "PM"];

interface ReminderPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
}

const ReminderPickerModal: React.FC<ReminderPickerModalProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<"Custom" | "ToTime">("Custom");
  const [selectedMonth, setSelectedMonth] = useState("Mar");
  const [selectedDate, setSelectedDate] = useState("25");
  const [selectedHour, setSelectedHour] = useState("03");
  const [selectedMinute, setSelectedMinute] = useState("32");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");
  const [selectedQuickOption, setSelectedQuickOption] =
    useState("In 30 minutes");

  const quickOptions = [
    "In 30 minutes",
    "In one hour",
    "Tomorrow",
    "In 2 days",
    "In 3 days",
  ];

  const handleSave = () => {
    if (activeTab === "Custom") {
      const selected = `${selectedMonth} ${selectedDate} - ${selectedHour}:${selectedMinute} ${selectedPeriod}`;
      onSave(selected);
    } else {
      onSave(selectedQuickOption);
    }
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              onPress={() => setActiveTab("Custom")}
              style={[styles.tab, activeTab === "Custom" && styles.activeTab]}
            >
              <Text
                style={
                  activeTab === "Custom" ? styles.activeTabText : styles.tabText
                }
              >
                Custom
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab("ToTime")}
              style={[styles.tab, activeTab === "ToTime" && styles.activeTab]}
            >
              <Text
                style={
                  activeTab === "ToTime" ? styles.activeTabText : styles.tabText
                }
              >
                To Time
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          {activeTab === "Custom" ? (
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerText}>
                {selectedMonth} {selectedDate} - {selectedHour}:{selectedMinute}{" "}
                {selectedPeriod}
              </Text>
            </View>
          ) : (
            <View style={styles.quickOptions}>
              {quickOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.option}
                  onPress={() => setSelectedQuickOption(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedQuickOption === option && styles.selectedOption,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Save Button */}
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ReminderPickerModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#F9F9FB",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: height * 0.5,
  },
  tabs: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: "#EAEAEA",
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: "#B5A9F8",
  },
  tabText: {
    color: "#333",
    fontSize: 16,
  },
  activeTabText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  pickerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  pickerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
  },
  quickOptions: {
    paddingHorizontal: 10,
  },
  option: {
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 16,
    color: "#555",
  },
  selectedOption: {
    color: "#6A5AE0",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#B5A9F8",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
