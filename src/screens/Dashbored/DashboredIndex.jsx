// /* eslint-disable react-native/no-inline-styles */
// import React, {useState} from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import { useIsFocused } from '@react-navigation/native';
// import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
// import Dashbored from './Dashbored';
// import UserProfile from './UserProfile';
// import Notifications from './Notifications';


// import notificationIcon from '../../assets/images/bellicon.png';
// import homeIcon from '../../assets/images/homeicon.png';
// import profileIcon from '../../assets/images/profileicon.png';

// const TabIcon = ({route, focused, size}) => {
//   const IsFocused = useIsFocused();
//   const iconSource = {
//     Notification: notificationIcon,
//     Home: homeIcon,
//     Profile: profileIcon,
//   }[route.name];

//   const tintColor = focused ? '#FFF' : 'gray';

//   return (
//     <View style={focused ? styles.containertop : {alignItems: 'center'}}>
//       <View style={focused ? styles.container : {alignItems: 'center'}}>
//         <Image
//           source={iconSource}
//           style={{width: size, height: size, tintColor}}
//           resizeMode="contain"
//         />
//         {!IsFocused && <Text style={{color: tintColor, fontSize: 12}}>{route.name}</Text>}
//       </View>
//     </View>
//   );
// };

// const getTabOrder = focusedTab => {
//   const orderMap = {
//     Home: ['Notification', 'Home', 'Profile'],
//     Notification: ['Home', 'Notification', 'Profile'],
//     Profile: ['Home', 'Profile', 'Notification'],
//   };
//   return orderMap[focusedTab] || ['Notification', 'Home', 'Profile'];
// };

// const renderTabBarButton = (tabName, setFocusedTab) => props =>
//   (
//     <TouchableOpacity
//       {...props}
//       onPress={() => {
//         setFocusedTab(tabName);
//         props.onPress();
//       }}
//       style={{flex: 1}}
//     />
//   );

// const renderTabBarIcon =
//   tabName =>
//   ({focused, size}) =>
//     <TabIcon route={{name: tabName}} focused={focused} size={size} />;

// const screenOptions = {
//   tabBarActiveTintColor: '#52C2FE',
//   tabBarInactiveTintColor: 'gray',
//   tabBarLabel: () => null,
//   tabBarStyle: {
//     paddingBottom: 5,
//     height: 70,
//     borderTopLeftRadius: 40,
//     borderTopRightRadius: 40,
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'white',
//     borderTopWidth: 0,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 1,
//     shadowRadius: 3.84,
//   },
// };

// const DashboredIndex = () => {
//   const [focusedTab, setFocusedTab] = useState('Home');
//   const Tab = createBottomTabNavigator();

//   const tabOrder = getTabOrder(focusedTab);

//   return (
//     <Tab.Navigator initialRouteName={focusedTab} screenOptions={screenOptions}>
//       {tabOrder.map(tabName => {
//         const component =
//           tabName === 'Notification'
//             ? Notifications
//             : tabName === 'Home'
//             ? Dashbored
//             : UserProfile;

//         return (
//           <Tab.Screen
//             key={tabName}
//             name={tabName}
//             component={component}
//             options={{
//               headerShown: false,
//               tabBarButton: renderTabBarButton(tabName, setFocusedTab),
//               tabBarIcon: renderTabBarIcon(tabName),
//             }}
//           />
//         );
//       })}
//     </Tab.Navigator>
//   );
// };

// export default DashboredIndex;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#52C2FE',
//     width: 65,
//     height: 65,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 1000,
//     transform: [{translateY: -10}],
//     shadowColor: '#1383bf',
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//     shadowOpacity: 0.9,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   containertop: {
//     width: 90,
//     height: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 1000,
//   },
// });

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Text, View, StyleSheet} from 'react-native';
import Dashbored from './Dashbored';
import UserProfile from './UserProfile';
import Notifications from './Notifications';

import notificationIcon from '../../assets/images/bellicon.png';
import homeIcon from '../../assets/images/homeicon.png';
import profileIcon from '../../assets/images/profileicon.png';

const Tab = createBottomTabNavigator();

const TabIcon = ({source, focused}) => (
  <View style={focused ? styles.activeIconContainer : styles.inactiveIconContainer}>
    <Image source={source} style={[styles.icon, {tintColor: focused ? '#FFF' : 'gray'}]} />
  </View>
);

const DashboredIndex = () => (
  <Tab.Navigator
  backBehavior='history'
    initialRouteName="Home"
    screenOptions={({route}) => ({
      tabBarIcon: ({focused}) => {
        const icons = {
          Home: homeIcon,
          Notification: notificationIcon,
          Profile: profileIcon,
        };
        return <TabIcon source={icons[route.name]} focused={focused} />;
      },
      tabBarLabel: ({focused}) => (
        <Text style={{color: focused ? 'gray' : 'gray', fontSize: 12}}>{route.name}</Text>
      ),
      headerShown: false,
      tabBarStyle: styles.tabBarStyle,
    })}
  >
    <Tab.Screen name="Home" component={Dashbored} />
    <Tab.Screen name="Notification" component={Notifications} />
    <Tab.Screen name="Profile" component={UserProfile} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 70,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  icon: {
    width: 24,
    height: 24,
  },
  activeIconContainer: {
    backgroundColor: '#52C2FE',
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboredIndex;
