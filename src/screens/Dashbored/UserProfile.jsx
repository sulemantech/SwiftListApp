import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import auth from '@react-native-firebase/auth'; // Firebase authentication import
import { ProductContext } from '../../Context/CardContext';

export default function UserProfile({ navigation }) {
  const { userName } = useContext(ProductContext);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await auth().signOut(); // Sign out the user
      // Navigate to login screen after logout
      navigation.navigate('Login'); // Replace 'Login' with the actual name of your login screen
    } catch (error) {
      console.error("Logout error: ", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      {/* Profile Picture */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder image URL
          style={styles.profileImage}
        />
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.email}>MetaFront@example.com</Text>
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

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
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
  logoutButton: {
    backgroundColor: '#52C2FE',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
