import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Tab, Text, TabView, Icon } from "@rneui/themed";
import { Calendar } from "react-native-calendars"; // install this package

const CalendarTabBar: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [selectedWeekday, setSelectedWeekday] = useState<string | null>(null);

  const dayOptions = [
    { label: "Morning", icon: "weather-sunset-up" },
    { label: "Afternoon", icon: "white-balance-sunny" },
    { label: "Evening", icon: "weather-sunset-down" },
    { label: "Night", icon: "weather-night" },
  ];

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <View style={styles.container}>
      <Tab
        value={tabIndex}
        onChange={setTabIndex}
        indicatorStyle={styles.indicator}
        variant="primary"
        containerStyle={styles.tabContainer}
      >
        <Tab.Item title="Daily" titleStyle={styles.tabText} />
        <Tab.Item title="Weekly" titleStyle={styles.tabText} />
        <Tab.Item title="Monthly" titleStyle={styles.tabText} />
      </Tab>

      <TabView value={tabIndex} onChange={setTabIndex} animationType="spring">
        {/* Daily */}
        <TabView.Item style={styles.tabItem}>
          <View style={styles.dailyContainer}>
            {dayOptions.map((option, i) => (
              <TouchableOpacity
                key={option.label}
                style={[
                  styles.dayOption,
                  selectedDayIndex === i && styles.dayOptionActive,
                ]}
                onPress={() => setSelectedDayIndex(i)}
              >
                <Icon
                  name={option.icon}
                  type="material-community"
                  color={selectedDayIndex === i ? "#ffffff" : "#1e3a8a"}
                  size={24}
                />
                <Text style={[
                  styles.dayOptionText,
                  selectedDayIndex === i && styles.dayOptionTextActive,
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TabView.Item>

        {/* Weekly */}
        <TabView.Item style={styles.tabItem}>
          <View style={styles.weekContainer}>
            {weekDays.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.weekDay,
                  selectedWeekday === day && styles.weekDayActive,
                ]}
                onPress={() => setSelectedWeekday(day)}
              >
                <Text
                  style={[
                    styles.weekText,
                    selectedWeekday === day && styles.weekTextActive,
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TabView.Item>

        {/* Monthly */}
        <TabView.Item style={styles.tabItem}>
          <Calendar
            onDayPress={(day: { dateString: string; day: number; month: number; year: number }) => 
              console.log("Selected day", day)
            }
            theme={{
              selectedDayBackgroundColor: "#1e3a8a",
              todayTextColor: "#1e3a8a",
              arrowColor: "#1e3a8a",
            }}
            style={styles.calendar}
          />
        </TabView.Item>
      </TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  tabContainer: {
    backgroundColor: "#1e3a8a",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  tabText: {
    fontSize: 14,
    color: "#e0e7ff",
    fontWeight: "600",
  },
  indicator: {
    backgroundColor: "#ffffff",
    height: 3,
    borderRadius: 2,
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  dailyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
  },
  dayOption: {
    backgroundColor: "#e0e7ff",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    width: "47%",
    marginVertical: 8,
  },
  dayOptionActive: {
    backgroundColor: "#1e3a8a",
  },
  dayOptionText: {
    marginTop: 6,
    fontWeight: "600",
    color: "#1e3a8a",
  },
  dayOptionTextActive: {
    color: "#ffffff",
  },
  weekContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
  },
  weekDay: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#e0e7ff",
    borderRadius: 20,
  },
  weekDayActive: {
    backgroundColor: "#1e3a8a",
  },
  weekText: {
    color: "#1e3a8a",
    fontWeight: "500",
  },
  weekTextActive: {
    color: "#ffffff",
  },
  calendar: {
    borderRadius: 16,
    elevation: 3,
  },
});

export default CalendarTabBar;
