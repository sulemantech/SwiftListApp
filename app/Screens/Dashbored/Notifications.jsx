import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ProductContext } from '../../Context/CardContext';

export default function Notifications() {
  const { notifications } = useContext(ProductContext);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      <ScrollView contentContainerStyle={styles.notificationsContainer} keyboardShouldPersistTaps="handled">
        {notifications.length === 0 ? (
          <Text style={styles.noNotifications}>No Notifications Yet</Text>
        ) : (
          notifications.map((notif, index) => (
            <View key={index} style={styles.notificationCard}>
              <Text style={styles.notificationText}>
                <Text style={styles.notificationTitle}>{notif.title}</Text>: {notif.body}
              </Text>
              <Text style={styles.notificationTime}>{new Date(notif.time).toLocaleString()}</Text>
            </View>
          ))
        )}
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
    paddingBottom: 70,
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
  noNotifications: {
    textAlign: 'center',
    fontSize: 16,
    color: '#aaa',
    marginTop: 20,
  },
});
