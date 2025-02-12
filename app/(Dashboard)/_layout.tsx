import React from "react";
import {
  View,
  Image,
  Platform,
  Text,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { Tabs } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, icons } from "../../constants";

export default function DashboardLayout() {
  return (
    <Tabs
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tabs.Screen
        name="Notifications"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.Notification1 as ImageSourcePropType}
              resizeMode="contain"
              style={[
                // styles.icon,
                styles.icon2,
                { tintColor: focused ? COLORS.secondary : COLORS.gray },
              ]}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabBarLabel,
                { color: focused ? COLORS.secondary : COLORS.gray },
              ]}
            >
              Notifications
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.Explore_outline as ImageSourcePropType}
              resizeMode="contain"
              style={[
                styles.icon,
                { tintColor: focused ? COLORS.secondary : COLORS.gray },
              ]}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabBarLabel,
                { color: focused ? COLORS.secondary : COLORS.gray },
              ]}
            >
              Explore
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Dashboard"
        options={{
          tabBarIcon: ({ focused }) => (
            <LinearGradient
              colors={["#00A4E4", "#1EB0E9"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.gradientIcon}
            >
              <Image
                source={icons.Home1 as ImageSourcePropType}
                resizeMode="contain"
                style={styles.mainIcon}
              />
            </LinearGradient>
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="Categories"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.Categories_outline as ImageSourcePropType}
              resizeMode="contain"
              style={[
                styles.icon,
                { tintColor: focused ? COLORS.secondary : COLORS.gray },
              ]}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabBarLabel,
                { color: focused ? COLORS.secondary : COLORS.gray },
              ]}
            >
              Categories
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.Profile_outline as ImageSourcePropType}
              resizeMode="contain"
              style={[
                styles.icon,
                { tintColor: focused ? COLORS.secondary : COLORS.gray },
              ]}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabBarLabel,
                { color: focused ? COLORS.secondary : COLORS.gray },
              ]}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
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
  icon: {
    width: 20,
    height: 20,
    marginTop: 5,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: "600",
    paddingTop: 4,
  },
  gradientIcon: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: Platform.OS === "ios" ? 70 : 65,
    width: Platform.OS === "ios" ? 70 : 65,
    top: Platform.OS === "ios" ? -10 : -10,
    borderRadius: Platform.OS === "ios" ? 35 : 35,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0,
  },
  mainIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.white,
  },
  icon2: {
    width: 30,
    height: 30,
    marginTop: 5,
  },
});
