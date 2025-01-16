import { StyleSheet, Text, View } from 'react-native'
import scheduleNotification from '../components/InAppNotification';
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react'

const NotificationHandler = () => {

      const [showDatePicker, setShowDatePicker] = useState(false);
      const [showTimePicker, setShowTimePicker] = useState(false);
      const [selectedDate, setSelectedDate] = useState(null);
      const [selectedTime, setSelectedTime] = useState(null);

    const handleDateChange = (event, date) => {
        setShowDatePicker(false);
        if (date) {
          setSelectedDate(date);
          setShowTimePicker(true);
        }
      };
    
      const handleTimeChange = (event, time) => {
        setShowTimePicker(false);
        if (time) {
          const dateTime = new Date(selectedDate);
          dateTime.setHours(time.getHours());
          dateTime.setMinutes(time.getMinutes());
          setSelectedTime(dateTime);
        }
      };
    
      const triggerNotification = () => {
        if (!selectedTime) {
          Alert.alert('No Notification Time', 'Please select a time to schedule the notification.');
          return;
        }
    
        if (selectedTime <= new Date()) {
          Alert.alert('Invalid Time', 'Please select a future date and time for the notification.');
          return;
        }
    
        Alert.alert(
          'Notification Scheduled',
          `Notification set for ${selectedTime.toLocaleString()}.`
        );
    
        scheduleNotification(selectedTime.toISOString(), 'Reminder', 'It’s time to do your work!');
      };
  return (
    <View>
       <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.datePickerButtonText}>Pick Notification Time</Text>
            </TouchableOpacity>
      
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate || new Date()}
                mode="date"
                display="default"
                minimumDate={new Date()}
                onChange={handleDateChange}
              />
            )}
      
            {showTimePicker && (
              <DateTimePicker
                value={selectedDate || new Date()}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
      
            <Text style={styles.selectedDateText}>
              Notification set for: {selectedTime ? selectedTime.toLocaleString() : 'None'}
            </Text>
      
            <TouchableOpacity style={styles.triggerButton} onPress={triggerNotification}>
              <Text style={styles.triggerButtonText}>Schedule Notification</Text>
            </TouchableOpacity>
      
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
    </View>
  )
}

export default NotificationHandler

const styles = StyleSheet.create({})