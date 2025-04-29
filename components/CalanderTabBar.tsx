import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { TabView, Text } from "@rneui/themed";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { color } from "@rneui/base";
// const { width } = Dimensions.get("window");
const { width, height } = Dimensions.get("window");

// ✅ Custom weekday headers
LocaleConfig.locales["custom"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
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
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["S", "M", "T", "W", "T", "F", "S"],
  today: "Today",
};
LocaleConfig.defaultLocale = "custom";

interface CalendarTabBarProps {
  onTabChange: (tabIndex: number) => void;
}

const CalendarTabBar: React.FC<CalendarTabBarProps> = ({ onTabChange }) => {
  const [tabIndex, setTabIndex] = useState(1);
  const [selectedWeekday, setSelectedWeekday] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("2025-01-04");

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

  // ✅ Helper: Count number of weeks in month
  const getWeeksInMonth = (dateStr: string) => {
    const start = moment(dateStr).startOf("month").startOf("week");
    const end = moment(dateStr).endOf("month").endOf("week");
    const weeks = Math.ceil(end.diff(start, "days") / 7);
    return weeks;
  };

  const extraBottomMargin =
    tabIndex === 2 && getWeeksInMonth(selectedDate) >= 6;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.customTabWrapper,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        {["Daily", "Weekly", "Monthly"].map((title, index) => (
          <TouchableOpacity
            key={title}
            onPress={() => {
              setTabIndex(index);
              onTabChange(index);
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
        <TabView.Item style={styles.tabItem}>
          <View />
        </TabView.Item>

        <TabView.Item style={styles.tabItem}>
          <View style={styles.weekContainer}>
            {weekDays.map((day, i) => (
              <TouchableOpacity
                key={day + i}
                style={[
                  styles.weekDay,
                  selectedWeekday === i && styles.weekDayActive,
                ]}
                onPress={() => setSelectedWeekday(i)}
              >
                <Text
                  style={[
                    styles.weekText,
                    selectedWeekday === i && styles.weekTextActive,
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TabView.Item>

        <TabView.Item style={styles.tabItem}>
          <View
            style={[
              styles.monthlyWrapper,
              extraBottomMargin && { marginBottom: 24 }, // ✅ Only when 6-week month
            ]}
          >
            <View style={styles.monthlyContainer}>
              {/* <Calendar
                current={selectedDate}
                onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
                dayComponent={({
                  date,
                  state,
                }: {
                  date: DateData;
                  state: string;
                }) => {
                  const isSelected = selectedDate === date.dateString;
                  return (
                    <TouchableOpacity
                      onPress={() => setSelectedDate(date.dateString)}
                      style={[
                        styles.weekDay,
                        isSelected && styles.weekDayActive,
                        state === "disabled" && { opacity: 0.1 },
                      ]}
                    >
                      <Text
                        style={[
                          styles.weekText,
                          isSelected && styles.weekTextActive,
                        ]}
                      >
                        {date.day}
                      </Text>
                    </TouchableOpacity>
                  );
                }} */}
              <Calendar
                current={selectedDate}
                onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
                dayComponent={({
                  date,
                  state,
                }: {
                  date: DateData;
                  state: string;
                }) => {
                  const isSelected = selectedDate === date.dateString;
                  return (
                    <TouchableOpacity
                      onPress={() => setSelectedDate(date.dateString)}
                      style={[
                        styles.weekDay,
                        isSelected && styles.weekDayActive,
                        state === "disabled" && { opacity: 0.1 },
                      ]}
                    >
                      <Text
                        style={[
                          styles.weekText,
                          isSelected && styles.weekTextActive,
                        ]}
                      >
                        {date.day}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                renderArrow={(direction: string) => (
                  <View style={styles.arrowContainer}>
                    <Ionicons
                      name={
                        direction === "left"
                          ? "chevron-back"
                          : "chevron-forward"
                      }
                      size={18}
                      color="#A9A0F0"

                    />
                  </View>
                )}
                renderHeader={(date: moment.MomentInput) => (
                  <Text style={styles.monthHeader}>
                    {moment(date).format("MMMM")}
                  </Text>
                )}
                theme={{
                  backgroundColor: "#FFFFFF",
                  calendarBackground: "#FFFFFF",
                  textSectionTitleColor: "#5C5C5C",
                  textSectionTitleDisabledColor: "#D9E1E8",
                  arrowColor: "#A9A0F0",
                  monthTextColor: "#5C5C5C",
                  textMonthFontWeight: "600",
                  textMonthFontSize: 16,
                  textMonthFontFamily: "OpenSans-SemiBold",
                  textDayHeaderFontWeight: "500",
                  textDayHeaderFontSize: 13,
                }}
                style={[
                  styles.calendar,
                  { width: width * (316 / 360), alignSelf: "center" },
                ]}
              />
            </View>
          </View>
        </TabView.Item>
      </TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "center",
    // backgroundColor: "red",
    // top: height * (0.008),
  },
  customTabWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 30,
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    width: width * (320 / 360),
    alignSelf: "center",
  },
  customTabItem: {
    flex: 1,
    paddingVertical: width * (25 / 820),
    borderRadius: 30,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  customTabItemActive: {
    backgroundColor: "#A89EFF",
  },
  customTabText: {
    fontSize: 13,
    fontFamily: "OpenSans-SemiBold",
    color: "#5C5C5C",
  },
  customTabTextActive: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "OpenSans-SemiBold",
  },
  tabItem: {
    flex: 1,
    paddingHorizontal: 16,
  },
  weekContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    // paddingTop: 12,
    // paddingBottom: 12,
    marginBottom: 0,
    alignSelf: "center",
    // backgroundColor: "red",
    top: height * 0.007,
  },
  weekDay: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#CBC3FB",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#CBC3FB",
  },
  weekDayActive: {
    backgroundColor: "#A89EFF",
  },
  weekText: {
    color: "#5C5C5C",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  weekTextActive: {
    color: "#FFFFFF",
  },
  monthlyWrapper: {
    width: "100%",
    alignItems: "center",
    overflow: "visible",
    // backgroundColor:"red"
  },
  monthlyContainer: {
    width: width * (320 / 360),
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: "#CBC3FB",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginVertical: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "#CBC3FB",
    alignSelf: "center",
    overflow: "hidden",
  },

  calendar: {
    width: "100%",
    paddingHorizontal: 10, // ✅ key fix
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F5F3FF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: -10,
  },
  monthHeader: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 18,
    color: "#5C5C5C",
    textAlign: "center",
    marginBottom: 10, // (adjust if needed)
  },
});

export default CalendarTabBar;

// import React, { useState } from "react";
// import { View, StyleSheet, TouchableOpacity } from "react-native";
// import { Tab, Text, TabView, Icon } from "@rneui/themed";
// import { Calendar } from "react-native-calendars"; // install this package
// interface CalendarTabBarProps {
//   onTabChange: (tabIndex: number) => void;
// }

// const CalendarTabBar: React.FC<CalendarTabBarProps> = ({ onTabChange }) => {
//   const [tabIndex, setTabIndex] = useState(0);
//   const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
//   const [selectedWeekday, setSelectedWeekday] = useState<string | null>(null);

//   const dayOptions = [
//     { label: "Morning", icon: "weather-sunset-up" },
//     { label: "Afternoon", icon: "white-balance-sunny" },
//     { label: "Evening", icon: "weather-sunset-down" },
//     { label: "Night", icon: "weather-night" },
//   ];

//   const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

//   return (
//     <View style={styles.container}>
//       <View style={styles.customTabWrapper}>
//         {["Daily", "Weekly", "Monthly"].map((title, index) => (
//           <TouchableOpacity
//             key={title}
//             onPress={() => {
//               setTabIndex(index);
//               onTabChange(index); // update height
//             }}
//             style={[
//               styles.customTabItem,
//               tabIndex === index && styles.customTabItemActive,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.customTabText,
//                 tabIndex === index && styles.customTabTextActive,
//               ]}
//             >
//               {title}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <TabView value={tabIndex} onChange={setTabIndex} animationType="spring">
//         {/* Daily */}
//         <TabView.Item style={styles.tabItem}>
//           {/* <View style={styles.dailyContainer}>
//             {dayOptions.map((option, i) => (
//               <TouchableOpacity
//                 key={option.label}
//                 style={[
//                   styles.dayOption,
//                   selectedDayIndex === i && styles.dayOptionActive,
//                 ]}
//                 onPress={() => setSelectedDayIndex(i)}
//               >
//                 <Icon
//                   name={option.icon}
//                   type="material-community"
//                   color={selectedDayIndex === i ? "#FFFFFF" : "#1E3A8A"}
//                   size={24}
//                 />
//                 <Text
//                   style={[
//                     styles.dayOptionText,
//                     selectedDayIndex === i && styles.dayOptionTextActive,
//                   ]}
//                 >
//                   {option.label}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View> */}
//         </TabView.Item>

//         {/* Weekly */}
//         <TabView.Item style={styles.tabItem}>
//           <View style={styles.weekContainer}>
//             {weekDays.map((day, i) => (
//               <TouchableOpacity
//                 key={day + i}
//                 style={[
//                   styles.weekDay,
//                   selectedWeekday === day + i && styles.weekDayActive,
//                 ]}
//                 onPress={() => setSelectedWeekday(day)}
//               >
//                 <Text
//                   style={[
//                     styles.weekText,
//                     selectedWeekday === day + i && styles.weekTextActive,
//                   ]}
//                 >
//                   {day}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </TabView.Item>

//         {/* Monthly */}
//         <TabView.Item style={styles.tabItem}>
//           <Calendar
//             // Customize the appearance of the calendar
//             style={{
//               borderWidth: 1,
//               borderColor: "gray",
//               height: 350,
//             }}
//             // Specify the current date
//             current={"2012-03-01"}
//             // Callback that gets called when the user selects a day
//             onDayPress={(day: any) => {
//               console.log("selected day", day);
//             }}
//             // Mark specific dates as marked
//             markedDates={{
//               "2012-03-01": {
//                 selected: true,
//                 marked: true,
//                 selectedColor: "blue",
//               },
//               "2012-03-02": { marked: true },
//               "2012-03-03": {
//                 selected: true,
//                 marked: true,
//                 selectedColor: "blue",
//               },
//             }}
//           />
//         </TabView.Item>
//       </TabView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // backgroundColor:"red",
//     flex: 1,
//     paddingTop: 20,
//   },
//   customTabWrapper: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 20,
//     marginHorizontal: 16,
//     marginBottom: 16,
//     gap: 6,
//     borderWidth: 1,
//     borderColor: "#D8D8D8",
//   },

//   customTabItem: {
//     flex: 1,
//     paddingVertical: 12,
//     borderRadius: 20,
//     backgroundColor: "transparent",
//     alignItems: "center",
//   },

//   customTabItemActive: {
//     backgroundColor: "#1E3A8A",
//   },

//   customTabText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#1E3A8A",
//   },

//   customTabTextActive: {
//     color: "#FFFFFF",
//   },
//   tabItem: {
//     flex: 1,
//     // justifyContent: "center",
//     paddingHorizontal: 16,
//     // backgroundColor:"red"
//   },
//   dailyContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
//     // gap: 12,
//   },
//   dayOption: {
//     backgroundColor: "#E0E7FF",
//     flexDirection: "row",
//     justifyContent: "center",
//     padding: 12,
//     borderRadius: 12,
//     alignItems: "center",
//     width: "47%",
//     marginVertical: 8,
//   },
//   dayOptionActive: {
//     backgroundColor: "#1E3A8A",
//   },
//   dayOptionText: {
//     marginLeft: 6,
//     fontWeight: "600",
//     color: "#1E3A8A",
//   },
//   dayOptionTextActive: {
//     color: "#FFFFFF",
//   },
//   weekContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "center",
//     gap: 12,
//     paddingVertical: 10,
//     // backgroundColor:"red",
//   },

//   weekDay: {
//     width: 32,
//     height: 32,
//     borderRadius: 8,
//     backgroundColor: "#E5E5E5",
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#CBC3FB",
//     shadowOffset: { width: 1, height: 2 },
//     shadowOpacity: 1,
//     shadowRadius: 0,
//     elevation: 2, // Android fallback
//   },
//   weekDayActive: {
//     backgroundColor: "#1E3A8A",
//   },
//   weekText: {
//     color: "#1E3A8A",
//     fontWeight: "600",
//     fontSize: 12,
//     textAlign: "center",
//   },

//   weekTextActive: {
//     color: "#FFFFFF",
//   },

//   calendar: {
//     borderRadius: 16,
//     elevation: 3,
//   },
// });

// export default CalendarTabBar;
