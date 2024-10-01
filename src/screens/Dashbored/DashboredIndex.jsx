import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View, StyleSheet } from 'react-native';
import Dashbored from './Dashbored';
import UserProfile from './UserProfile';
import Notifications from './Notifications';

// Import your PNG icons
import notificationIcon from '../../assets/images/bellicon.png';
import homeIcon from '../../assets/images/homeicon.png';
import profileIcon from '../../assets/images/profileicon.png';

const DashboredIndex = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconSource;

          if (route.name === 'Notification') {
            iconSource = notificationIcon;
          } else if (route.name === 'Home') {
            iconSource = homeIcon;
          } else if (route.name === 'Profile') {
            iconSource = profileIcon;
          }

          return (
            <View style={{ alignItems: 'center' }}>
              {focused ? (
                <View style={styles.containertop}>
                  <View style={styles.container}>
                    <Image
                      source={iconSource}
                      style={{
                        width: size,
                        height: size,
                        tintColor: '#FFF',
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        color: '#FFF',
                        fontSize: 12,
                      }}
                    >
                      {route.name}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={iconSource}
                    style={{
                      width: size,
                      height: size,
                      tintColor: 'gray',
                    }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: 'gray',
                      fontSize: 12,
                    }}
                  >
                    {route.name}
                  </Text>
                </View>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: '#52C2FE',
        tabBarInactiveTintColor: 'gray',
        tabBarLabel: () => null,
        tabBarStyle: {
          paddingBottom: 5,
          height: 70,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 3.84,
        },
      })}
    >
      <Tab.Screen
        name="Notification"
        component={Notifications}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Home"
        component={Dashbored}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default DashboredIndex;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#52C2FE",
    width: 70,
    height: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1000,
    transform: [{ translateY: -10 }],
    shadowColor: '#1383bf',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  containertop: {
    width: 90,
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 1000,
  }
});
