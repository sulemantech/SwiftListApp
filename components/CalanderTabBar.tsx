import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Tab, Text, TabView, Icon } from "@rneui/themed";
import { Calendar } from "react-native-calendars"; // install this package
interface CalendarTabBarProps {
  onTabChange: (tabIndex: number) => void;
}

const CalendarTabBar: React.FC<CalendarTabBarProps> = ({ onTabChange }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [selectedWeekday, setSelectedWeekday] = useState<string | null>(null);

  const dayOptions = [
    { label: "Morning", icon: "weather-sunset-up" },
    { label: "Afternoon", icon: "white-balance-sunny" },
    { label: "Evening", icon: "weather-sunset-down" },
    { label: "Night", icon: "weather-night" },
  ];

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <View style={styles.container}>
      <View style={styles.customTabWrapper}>
        {["Daily", "Weekly", "Monthly"].map((title, index) => (
          <TouchableOpacity
            key={title}
            onPress={() => {
              setTabIndex(index);
              onTabChange(index); // update height
            }}
            style={[
              styles.customTabItem,
              tabIndex === index && styles.customTabItemActive,
            ]}
          >
            <Text
              style={[
                styles.customTabText,
                tabIndex === index && styles.customTabTextActive,
              ]}
            >
              {title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TabView value={tabIndex} onChange={setTabIndex} animationType="spring">
        {/* Daily */}
        <TabView.Item style={styles.tabItem}>
          {/* <View style={styles.dailyContainer}>
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
                  color={selectedDayIndex === i ? "#FFFFFF" : "#1E3A8A"}
                  size={24}
                />
                <Text
                  style={[
                    styles.dayOptionText,
                    selectedDayIndex === i && styles.dayOptionTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View> */}
        </TabView.Item>

        {/* Weekly */}
        <TabView.Item style={styles.tabItem}>
          <View style={styles.weekContainer}>
            {weekDays.map((day, i) => (
              <TouchableOpacity
                key={day + i}
                style={[
                  styles.weekDay,
                  selectedWeekday === day + i && styles.weekDayActive,
                ]}
                onPress={() => setSelectedWeekday(day)}
              >
                <Text
                  style={[
                    styles.weekText,
                    selectedWeekday === day + i && styles.weekTextActive,
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
            onDayPress={(day: {
              dateString: string;
              day: number;
              month: number;
              year: number;
            }) => console.log("Selected day", day)}
            theme={{
              selectedDayBackgroundColor: "#1E3A8A",
              todayTextColor: "#1E3A8A",
              arrowColor: "#1E3A8A",
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
  customTabWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: "#D8D8D8",
  },

  customTabItem: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: "transparent",
    alignItems: "center",
  },

  customTabItemActive: {
    backgroundColor: "#1E3A8A",
  },

  customTabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E3A8A",
  },

  customTabTextActive: {
    color: "#FFFFFF",
  },
  tabItem: {
    flex: 1,
    // justifyContent: "center",
    paddingHorizontal: 16,
  },
  dailyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    // gap: 12,
  },
  dayOption: {
    backgroundColor: "#E0E7FF",
    flexDirection: "row",
    justifyContent: "center",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    width: "47%",
    marginVertical: 8,
  },
  dayOptionActive: {
    backgroundColor: "#1E3A8A",
  },
  dayOptionText: {
    marginLeft: 6,
    fontWeight: "600",
    color: "#1E3A8A",
  },
  dayOptionTextActive: {
    color: "#FFFFFF",
  },
  weekContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 10,
  },
  
  weekDay: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#CBC3FB",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2, // Android fallback
  },
  weekDayActive: {
    backgroundColor: "#1E3A8A",
  },
  weekText: {
    color: "#1E3A8A",
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
  },
  
  weekTextActive: {
    color: "#FFFFFF",
  },
  
  calendar: {
    borderRadius: 16,
    elevation: 3,
  },
});

export default CalendarTabBar;
