import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { ProductContext } from '../../Context/CardContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import scheduleNotification from '../components/InAppNotification';

export default function UserProfile({ navigation }) {
  const { userDetails, profilePicture } = useContext(ProductContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error: ', error.message);
    }
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false); // Close the date picker
    if (date) {
      setSelectedDate(date); // Update state with selected date
      setShowTimePicker(true); // Show the time picker after date selection
    }
  };

  const handleTimeChange = (event, time) => {
    setShowTimePicker(false); // Close the time picker
    if (time) {
      // Set selected time
      const dateTime = new Date(selectedDate);
      dateTime.setHours(time.getHours());
      dateTime.setMinutes(time.getMinutes());
      setSelectedTime(dateTime); // Set the selected time with the selected date
    }
  };

  const triggerNotification = () => {
    if (!selectedTime) {
      Alert.alert('No Notification Time', 'Please select a time to schedule the notification.');
      return;
    }

    // Check if the selected time is in the future
    if (selectedTime <= new Date()) {
      Alert.alert('Invalid Time', 'Please select a future date and time for the notification.');
      return;
    }

    Alert.alert(
      'Notification Scheduled',
      `Notification set for ${selectedTime.toLocaleString()}.`
    );

    // Call the notification service function
    scheduleNotification(selectedTime.toISOString(), 'Reminder', 'It’s time to do your work!');
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}></Text>
      </View>

      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: userDetails.UserProfilePicture }} // Placeholder image URL
          style={styles.profileImage}
        />
        <Text style={styles.name}>{userDetails.UserName}</Text>
        <Text style={styles.email}>{userDetails.UserEmail}</Text>
      </View>

      {/* Additional Information */}
      <View style={styles.infoSection}>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>+123 456 7890</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>Islamabad, Pakistan</Text>
        </View>
      </View>

      {/* Edit Button */}
      <TouchableOpacity activeOpacity={1} style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.editButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.datePickerButtonText}>Pick Notification Time</Text>
      </TouchableOpacity>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()} // Allow current date
          onChange={handleDateChange}
        />
      )}

      {/* Time Picker */}
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

      <TouchableOpacity style={styles.editButton} onPress={triggerNotification}>
        <Text style={styles.triggerButtonText}>Schedule Notification</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.editButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#52C2FE',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -50,
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  infoSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#52C2FE',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  datePickerButton: {
    backgroundColor: '#52C2FE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  datePickerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedDateText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  triggerButton: {
    backgroundColor: '#52C2FE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  triggerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
