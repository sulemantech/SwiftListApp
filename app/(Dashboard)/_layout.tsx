import React from "react";
import {
  View,
  Image,
  Platform,
  Text,
  StyleSheet,
  ImageSourcePropType,
  Dimensions,
} from "react-native";
import { Tabs } from "expo-router";
import { COLORS, icons } from "../../constants";
import Home1 from "../../assets/images/SVG/bottomTabIcons/Home1.svg";
import Home2 from "../../assets/images/SVG/bottomTabIcons/Home2.svg";
import MyList1 from "../../assets/images/SVG/bottomTabIcons/MyList1.svg";
import MyList2 from "../../assets/images/SVG/bottomTabIcons/MyList2.svg";
import Reminder1 from "../../assets/images/SVG/bottomTabIcons/Reminder1.svg";
import Reminder2 from "../../assets/images/SVG/bottomTabIcons/Reminder2.svg";
import Profile1 from "../../assets/images/SVG/bottomTabIcons/Profile1.svg";
import Profile2 from "../../assets/images/SVG/bottomTabIcons/Profile2.svg";

const { width, height } = Dimensions.get("window");

export default function HomeLayout() {
  return (
    <Tabs
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconbackground : undefined}>
              {focused ? (
                <Home1 width={(20 / 360) * width} height={(20 / 360) * width} />
              ) : (
                <Home2 width={(20 / 360) * width} height={(20 / 360) * width} />
              )}
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabBarLabel,
                {
                  color: focused ? "#A9A0F0" : "#6C6C6C",
                  fontSize: focused ? (12 / 360) * width : (11 / 360) * width,
                  fontFamily: "OpenSans_Medium",
                  opacity: focused ? 1 : 0.8,
                },
              ]}
            >
              Home
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="My_List"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconbackground : undefined}>
              {focused ? (
                <MyList1
                  width={(20 / 360) * width}
                  height={(20 / 360) * width}
                />
              ) : (
                <MyList2
                  width={(20 / 360) * width}
                  height={(20 / 360) * width}
                />
              )}
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabBarLabel,
                {
                  color: focused ? "#A9A0F0" : "#6C6C6C",
                  fontSize: focused ? (12 / 360) * width : (11 / 360) * width,
                  fontFamily: "OpenSans_Medium",
                  opacity: focused ? 1 : 0.8,
                },
              ]}
            >
              My List
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Reminder"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconbackground : undefined}>
              {focused ? (
                <Reminder1
                  width={(20 / 360) * width}
                  height={(20 / 360) * width}
                />
              ) : (
                <Reminder2
                  width={(20 / 360) * width}
                  height={(20 / 360) * width}
                />
              )}
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabBarLabel,
                {
                  color: focused ? "#A9A0F0" : "#6C6C6C",
                  fontSize: focused ? (12 / 360) * width : (11 / 360) * width,
                  fontFamily: "OpenSans_Medium",
                  opacity: focused ? 1 : 0.8,
                },
              ]}
            >
              Reminder
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconbackground : undefined}>
              {focused ? (
                <Profile1
                  width={(20 / 360) * width}
                  height={(20 / 360) * width}
                />
              ) : (
                <Profile2
                  width={(20 / 360) * width}
                  height={(20 / 360) * width}
                />
              )}
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabBarLabel,
                {
                  color: focused ? "#A9A0F0" : "#6C6C6C",
                  fontSize: focused ? (12 / 360) * width : (11 / 360) * width,
                  fontFamily: "OpenSans_Medium",
                  opacity: focused ? 1 : 0.8,
                },
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
    backgroundColor: "#FFFFFF",
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === "ios" ? (110 / 800) * height : (78 / 800) * height,
    width: "100%",
    borderTopLeftRadius: (12 / 360) * width,
    borderTopRightRadius: (12 / 360) * width,
    elevation: 0,
    shadowOpacity: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
    shadowColor: "transparent",
    justifyContent: "center",
    paddingTop: (8 / 800) * height,
    paddingBottom: (8 / 800) * height,
  },
  icon: {
    width: (20 / 360) * width,
    height: (20 / 360) * width,
    marginTop: (5 / 820) * height,
  },
  tabBarLabel: {
    fontWeight: "600",
    // paddingTop: (10 / 820) * height,
    // backgroundColor:"red"
    marginTop: Platform.OS === "ios" ? (9 / 800) * height : 0, // 👈 iOS-specific top margin
  },
  gradientIcon: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: Platform.OS === "ios" ? (70 / 800) * height : (65 / 800) * height,
    width: Platform.OS === "ios" ? (70 / 360) * width : (65 / 360) * width,
    top: Platform.OS === "ios" ? -10 : -10,
    borderRadius:
      Platform.OS === "ios" ? (35 / 360) * width : (35 / 360) * width,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0,
  },
  mainIcon: {
    width: (20 / 360) * width,
    height: (20 / 360) * width,
    tintColor: COLORS.white,
  },
  icon2: {
    width: (30 / 360) * width,
    height: (30 / 360) * width,
    marginTop: (5 / 800) * height,
  },
  iconbackground: {
    backgroundColor: "#F3F3FD",
    borderRadius: 50,
    width: (60 / 360) * width,
    height: (34 / 820) * height,
    paddingVertical: (5.6 / 820) * height,
    paddingHorizontal: (20 / 360) * width,
    alignItems: "center",
    justifyContent: "center",
    marginTop: (5 / 800) * height,
    marginBottom: (5 / 800) * height,
    marginHorizontal: (5 / 360) * width,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
  },
});

// import React from "react";
// import {
//   View,
//   Image,
//   Platform,
//   Text,
//   StyleSheet,
//   ImageSourcePropType,
//   Dimensions,
// } from "react-native";
// import { Tabs } from "expo-router";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS, icons } from "../../constants";
// import Home from "../../assets/images/SVG/bottomTabIcons/Home.svg";
// import MyList from "../../assets/images/SVG/bottomTabIcons/MyList.svg";
// import Reminder from "../../assets/images/SVG/bottomTabIcons/Reminder.svg";
// import Profile from "../../assets/images/SVG/bottomTabIcons/Profile.svg";
// const { width, height } = Dimensions.get("window");
// export default function HomeLayout() {
//   return (
//     <Tabs
//       initialRouteName="Home"
//       screenOptions={{
//         tabBarShowLabel: true,
//         headerShown: false,
//         tabBarStyle: styles.tabBarStyle,
//       }}
//     >
//       <Tabs.Screen
//         name="Home"
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View style={focused ? styles.iconbackground : undefined}>
//               <Home
//                 width={(20.8 / 360) * width}
//                 height={(20.8 / 360) * width}
//                 color={focused ? "#A9A0F0" : "#6C6C6C"}
//               />
//             </View>
//           ),
//           tabBarLabel: ({ focused }) => (
//             <Text
//               style={[
//                 styles.tabBarLabel,
//                 { color: focused ? "#A9A0F0" : "#6C6C6C" },
//               ]}
//             >
//               Home
//             </Text>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="Notifications"
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <Image
//               source={icons.Home as ImageSourcePropType}
//               resizeMode="contain"
//               style={[
//                 // styles.icon,
//                 styles.icon2,
//                 { tintColor: focused ? COLORS.secondary : COLORS.gray },
//               ]}
//             />
//           ),
//           tabBarLabel: ({ focused }) => (
//             <Text
//               style={[
//                 styles.tabBarLabel,
//                 { color: focused ? COLORS.secondary : COLORS.gray },
//               ]}
//             >
//               Home
//             </Text>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="My_List"
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View style={focused ? styles.iconbackground : undefined}>
//               <MyList
//                 width={(20.8 / 360) * width}
//                 height={(20.8 / 360) * width}
//                 color={focused ? "#A9A0F0" : "#6C6C6C"}
//               />
//             </View>
//           ),
//           tabBarLabel: ({ focused }) => (
//             <Text
//               style={[
//                 styles.tabBarLabel,
//                 { color: focused ? "#A9A0F0" : "#6C6C6C" },
//               ]}
//             >
//               My List
//             </Text>
//           ),
//         }}
//       />
//       {/* <Tabs.Screen
//         name="Home"
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <LinearGradient
//               colors={["#00A4E4", "#1EB0E9"]}
//               start={{ x: 0.5, y: 0 }}
//               end={{ x: 0.5, y: 1 }}
//               style={styles.gradientIcon}
//             >
//               <Image
//                 source={icons.Home1 as ImageSourcePropType}
//                 resizeMode="contain"
//                 style={styles.mainIcon}
//               />
//             </LinearGradient>
//           ),
//           tabBarLabel: () => null,
//         }}
//       /> */}
//       <Tabs.Screen
//         name="Reminder"
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View style={focused ? styles.iconbackground : undefined}>
//               <Reminder
//                 width={(20.8 / 360) * width}
//                 height={(20.8 / 360) * width}
//                 color={focused ? "#A9A0F0" : "#6C6C6C"}
//               />
//             </View>
//           ),
//           tabBarLabel: ({ focused }) => (
//             <Text
//               style={[
//                 styles.tabBarLabel,
//                 { color: focused ? "#A9A0F0" : "#6C6C6C" },
//               ]}
//             >
//               Reminder
//             </Text>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="Profile"
//         options={{
//           tabBarIcon: ({ focused }) => (
//             <View style={focused ? styles.iconbackground : undefined}>
//               <Profile
//                 width={(20.8 / 360) * width}
//                 height={(20.8 / 360) * width}
//                 color={focused ? "#A9A0F0" : "#6C6C6C"}
//               />
//             </View>
//           ),
//           tabBarLabel: ({ focused }) => (
//             <Text
//               style={[
//                 styles.tabBarLabel,
//                 { color: focused ? "#A9A0F0" : "#6C6C6C" },
//               ]}
//             >
//               Profile
//             </Text>
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

// const styles = StyleSheet.create({
//   tabBarStyle: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: Platform.OS === "ios" ? 110 : 78,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//     elevation: 0,
//     shadowOpacity: 0,
//     shadowOffset: { width: 0, height: 0 },
//     shadowRadius: 0,
//     shadowColor: "transparent",
//     justifyContent: "center",
//     paddingTop: 8, // ✅ Equal spacing from top
//     paddingBottom: 8, // ✅ Equal spacing from bottom
//   },

//   icon: {
//     width: 20,
//     height: 20,
//     marginTop: 5,
//   },
//   tabBarLabel: {
//     fontSize: 10,
//     fontWeight: "600",
//     paddingTop: 4,
//   },
//   gradientIcon: {
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "transparent",
//     height: Platform.OS === "ios" ? 70 : 65,
//     width: Platform.OS === "ios" ? 70 : 65,
//     top: Platform.OS === "ios" ? -10 : -10,
//     borderRadius: Platform.OS === "ios" ? 35 : 35,
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 0,
//   },
//   mainIcon: {
//     width: 20,
//     height: 20,
//     tintColor: COLORS.white,
//   },
//   icon2: {
//     width: 30,
//     height: 30,
//     marginTop: 5,
//   },
//   iconbackground: {
//     backgroundColor: "#F2F2F2",
//     borderRadius: 50,
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//   },
// });
