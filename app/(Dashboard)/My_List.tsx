import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants'
import TimeSelector from "@/components/BottomSheet/TimeSelector";
import AddSubTask from '@/components/AddSubTask';
import { Calendar } from 'react-native-calendars';

const My_List = () => {
  return (
    <View style={styles.container}>
      <TimeSelector />
      {/* <AddSubTask/> */}
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
          <Text>Hello</Text>
    </View>
  );
}

export default My_List

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.secondary
  },
  calendar: {
    borderRadius: 16,
    elevation: 3,
  },
})