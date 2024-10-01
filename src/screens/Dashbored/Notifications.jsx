import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

export default function Notifications() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      <ScrollView contentContainerStyle={styles.notificationsContainer}>
        {/* Dummy notifications */}
        <View style={styles.notificationCard}>
          <Text style={styles.notificationText}>
            <Text style={styles.notificationTitle}>MetaFront</Text> well come .
          </Text>
          <Text style={styles.notificationTime}>5 minutes ago</Text>
        </View>

        <View style={styles.notificationCard}>
          <Text style={styles.notificationText}>
            Your order has been shipped to <Text style={styles.notificationTitle}>Pakistan</Text>.
          </Text>
          <Text style={styles.notificationTime}>30 minutes ago</Text>
        </View>

        <View style={styles.notificationCard}>
          <Text style={styles.notificationText}>
            <Text style={styles.notificationTitle}>MetaFront</Text> changed phone number.
          </Text>
          <Text style={styles.notificationTime}>1 hour ago</Text>
        </View>

        <View style={styles.notificationCard}>
          <Text style={styles.notificationText}>
            You have new contacts from <Text style={styles.notificationTitle}>Pakistan</Text>.
          </Text>
          <Text style={styles.notificationTime}>3 hours ago</Text>
        </View>

        <View style={styles.notificationCard}>
          <Text style={styles.notificationText}>
            <Text style={styles.notificationTitle}>MetaFront</Text> Your Profile name has changed.
          </Text>
          <Text style={styles.notificationTime}>1 day ago</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#52C2FE',
    textAlign: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  notificationsContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  notificationCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  notificationTitle: {
    fontWeight: 'bold',
    color: '#52C2FE',
  },
  notificationTime: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 5,
  },
});
