// import { Tabs } from 'expo-router';
// import { EvilIcons, Ionicons } from '@expo/vector-icons';

// export default function DashboardLayout() {
//   return (
//     <Tabs screenOptions={{ headerShown: false }}>
//       <Tabs.Screen
//         name="Dashboard"
//         options={{
//           title: 'Dashboard',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="Notification"
//         options={{
//           title: 'Notification',
//           tabBarIcon: ({ color, size }) => (
//             <EvilIcons name="bell" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="Profile"
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="person" color={color} size={size} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

import React from "react";
import { View, Image, Platform, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import Home from "../(Dashboard)/Home";
import Dashboard from "../(Dashboard)/Dashboard";
import Explore from "../(Dashboard)/Explore";
import Categories from "../(Dashboard)/Categories";
import Notifications from "../(Dashboard)/Notification";
("");
import Profile from "../(Dashboard)/Profile";
import { COLORS, icons } from "../../constants";

const Tab = createBottomTabNavigator();

export default function DashboardLayout() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          // paddingVertical: 20,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: COLORS.white,
          height: Platform.OS === "ios" ? 110 : 64,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 0,
          shadowColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.Home_outline}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? COLORS.secondary : COLORS.gray,
                paddingTop: 5,
                marginTop: 5,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? COLORS.secondary : COLORS.gray,
                fontSize: 12,
                fontWeight: "600",
                paddingTop: 4,
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.Explore_outline}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? COLORS.secondary : COLORS.gray,
                paddingTop: 5,
                marginTop: 5,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? COLORS.secondary : COLORS.gray,
                fontSize: 12,
                fontWeight: "600",
                paddingTop: 4,
              }}
            >
              Explore
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <LinearGradient
              colors={["#00A4E4", "#1EB0E9"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                height: Platform.OS === "ios" ? 70 : 65,
                width: Platform.OS === "ios" ? 70 : 65,
                top: Platform.OS === "ios" ? -10 : -10,
                borderRadius: Platform.OS === "ios" ? 35 : 35,
                // borderWidth: 4,
                // borderColor: "white",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 0,
                
              }}
            >
              <Image
                source={icons.Main_icon}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.white,
                  // padding: 14,
                }}
              />
            </LinearGradient>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.Categories_outline}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? COLORS.secondary : COLORS.gray,
                paddingTop: 5,
                marginTop: 5,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? COLORS.secondary : COLORS.gray,
                fontSize: 12,
                fontWeight: "600",
                paddingTop: 4,
              }}
            >
              Categories
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.Profile_outline}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: focused ? COLORS.secondary : COLORS.gray,
                paddingTop: 5,
                marginTop: 5,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? COLORS.secondary : COLORS.gray,
                fontSize: 12,
                fontWeight: "600",
                paddingTop: 4,
              }}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
