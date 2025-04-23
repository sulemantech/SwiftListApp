import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
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

const ITEM_HEIGHT = 40;
// 
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

  const monthRef = useRef<FlatList>(null);
  const dateRef = useRef<FlatList>(null);
  const hourRef = useRef<FlatList>(null);
  const minuteRef = useRef<FlatList>(null);
  const periodRef = useRef<FlatList>(null);

  useEffect(() => {
    if (visible) {
      monthRef.current?.scrollToIndex({ index: 0, animated: false });
      dateRef.current?.scrollToIndex({ index: 0, animated: false });
      hourRef.current?.scrollToIndex({ index: 0, animated: false });
      minuteRef.current?.scrollToIndex({ index: 0, animated: false });
      periodRef.current?.scrollToIndex({ index: 0, animated: false });

      setSelectedMonth(months[0]);
      setSelectedDate(dates[0]);
      setSelectedHour(hours[0]);
      setSelectedMinute(minutes[0]);
      setSelectedPeriod(periods[0]);
    }
  }, [visible]);

  const quickOptions = [
    "In 30 minutes",
    "In one hour",
    "Tomorrow",
    "In 2 days",
    "In 3 days",
    "In month",
    "In week",
    "In Year",
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

  const renderPickerItem = (item: string, selected: string) => (
    <View style={styles.pickerItem}>
      <Text
        style={[
          styles.pickerItemText,
          item === selected && styles.selectedPickerItemText,
        ]}
      >
        {item}
      </Text>
    </View>
  );

  const handleScroll = (e: any, listType: string) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    if (listType === "month") setSelectedMonth(months[index]);
    if (listType === "date") setSelectedDate(dates[index]);
    if (listType === "hour") setSelectedHour(hours[index]);
    if (listType === "minute") setSelectedMinute(minutes[index]);
    if (listType === "period") setSelectedPeriod(periods[index]);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Reminder</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={28} color="#6C6C6C" />
            </TouchableOpacity>
          </View>
          {/* Divider */}
          <View style={styles.divider} />
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
            <View style={styles.customContainer}>
              <View style={styles.selectionOverlay} pointerEvents="none" />
              <View style={styles.scrollPickerRow}>
                {[
                  {
                    label: "Month",
                    data: months,
                    selected: selectedMonth,
                    ref: monthRef,
                    type: "month",
                  },
                  {
                    label: "Date",
                    data: dates,
                    selected: selectedDate,
                    ref: dateRef,
                    type: "date",
                  },
                  {
                    label: "Hours",
                    data: hours,
                    selected: selectedHour,
                    ref: hourRef,
                    type: "hour",
                  },
                  {
                    label: "Minutes",
                    data: minutes,
                    selected: selectedMinute,
                    ref: minuteRef,
                    type: "minute",
                  },
                  {
                    label: " ",
                    data: periods,
                    selected: selectedPeriod,
                    ref: periodRef,
                    type: "period",
                  },
                ].map((col) => (
                  <View style={styles.pickerColumn} key={col.type}>
                    {col.label ? (
                      <Text style={styles.titleText}>{col.label}</Text>
                    ) : null}
                    <FlatList
                      ref={col.ref}
                      data={col.data}
                      keyExtractor={(item) => item}
                      showsVerticalScrollIndicator={false}
                      snapToInterval={ITEM_HEIGHT}
                      decelerationRate="fast"
                      contentContainerStyle={{
                        paddingVertical: ITEM_HEIGHT * 2,
                      }}
                      onScroll={(e) => handleScroll(e, col.type)}
                      scrollEventThrottle={16}
                      renderItem={({ item }) =>
                        renderPickerItem(item, col.selected)
                      }
                      style={styles.pickerList}
                    />
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.quickOptionsWrapper}>
              <FlatList
                data={quickOptions}
                keyExtractor={(item) => item}
                style={styles.quickOptions}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: option }) => (
                  <TouchableOpacity
                    style={styles.quickOptionRow}
                    onPress={() => setSelectedQuickOption(option)}
                  >
                    <View style={styles.quickOptionContent}>
                      <Ionicons
                        name="calendar-outline"
                        size={20}
                        color={
                          selectedQuickOption === option ? "#B5A9F8" : "#555"
                        }
                        style={styles.optionIcon}
                      />
                      <Text
                        style={[
                          styles.optionText,
                          selectedQuickOption === option &&
                            styles.selectedOption,
                        ]}
                      >
                        {option}
                      </Text>
                    </View>
                    {selectedQuickOption === option && (
                      <Ionicons name="checkmark" size={24} color="#B5A9F8" />
                    )}
                  </TouchableOpacity>
                )}
              />
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
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#F3F3FD",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    padding: 8,
  },
  divider: {
    width: "110%",
    height: 1,
    backgroundColor: "#E0E0E0",
    marginTop: 8,
    marginBottom: 14,
    left: -20,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 25,
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
  customContainer: {
    alignItems: "center",
  },
  scrollPickerRow: {
    flexDirection: "row",
    marginBottom: 10,
    position: "relative",
  },
  pickerColumn: {
    alignItems: "center",
    width: 60,
  },
  titleText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#5C5C5C",
    marginBottom: 8,
  },
  pickerList: {
    height: ITEM_HEIGHT * 5,
  },
  pickerItem: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerItemText: {
    fontSize: 16,
    color: "#888",
  },
  selectedPickerItemText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  selectionOverlay: {
    position: "absolute",
    top: ITEM_HEIGHT * 2 + 24,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    backgroundColor: "#E0D9FA",
    borderRadius: 20,
  },
  quickOptions: {
    paddingHorizontal: 10,
  },
  quickOptionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  quickOptionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    marginRight: 10,
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
  quickOptionsWrapper: {
    maxHeight: height * 0.25, // 👈 Add this new style
  },
});
