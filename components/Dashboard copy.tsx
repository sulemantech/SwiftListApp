// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   ScrollView,
//   Dimensions,
// } from "react-native";
// import { useContext, useState } from "react";
// import { Image } from "expo-image";
// // import Filtericon from '../../assets/images/filtericon.png';
// import first from "../../assets/images/SVG/dashboardgrocery.svg";
// import seconed from "../../assets/images/SVG/dashboardspiritualgoals.svg";
// import third from "../../assets/images/SVG/dashboardpersonalgromming.svg";
// import fourth from "../../assets/images/SVG/thingstodo.svg";
// import fifth from "../../assets/images/SVG/recipe.svg";
// import bell from "../../assets/images/SVG/dashboard/bell.svg";
// import { ProductContext } from "../../Context/CardContext";
// import CardComponent from "../../components/Card";
// import UserProfile from "../../assets/images/UserProfile.png";
// import TasksStatistics from "@/components/TasksStatistics";
// import { StatusBar } from "expo-status-bar";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS, icons } from "../../constants";
// import { FontFamily } from "@/constants/theme";
// import ProgressCircle from "../../components/progress";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// // import CircularProgress from "react-native-progress";
// import { Svg, Circle } from "react-native-svg";
// import { router } from "expo-router";
// import React from "react";

// const Dashboard2 = () => {
//   const { userDetails } = useContext(ProductContext);
//   const cardDataArray = [
//     {
//       title: "Grocery List",
//       description: "Add needed items.",
//       items: "200 Items",
//       percentagetext: "Bought 70%",
//       progress: 0.8,
//       color: "#008B94",
//       Picture: first,
//       bgColor: "#9DF4F4",
//       badgeColor: "#61CBD6",
//     },
//     {
//       title: "Spiritual Goals",
//       description: "Add your spiritual goals.",
//       items: "10 Goals",
//       percentagetext: "Achieved 30%",
//       progress: 0.67,
//       Picture: seconed,
//       bgColor: "#98FBCB",
//       badgeColor: "#4AA688",
//     },
//     {
//       title: "Personal Grooming",
//       description: "Add your grooming tasks in list.",
//       items: "10 Tasks",
//       percentagetext: "Completed 80%",
//       progress: 0.72,
//       Picture: third,
//       bgColor: "#FEE5D7",
//       badgeColor: "#C54B6C",
//     },
//     {
//       title: "Things To Do",
//       description: "Add tasks in your to do list.",
//       items: "0 Items",
//       percentagetext: "Completed 50%",
//       progress: 0.5,
//       Picture: fourth,
//       bgColor: "#FFCBA1",
//       badgeColor: "#E36A4A",
//     },
//     {
//       title: "Kitchen Menu",
//       description: "Add items to your list.",
//       items: "500 Recipes",
//       percentagetext: "Cooked 0%",
//       progress: 0.78,
//       Picture: fifth,
//       bgColor: "#FDDC8A",
//       badgeColor: "#D88D1B",
//     },
//   ];

//   const [cardDataFilterArray, setCardDataFilterArray] = useState(cardDataArray);
//   const [value, setValue] = useState(0);
//   const handleNavigate = (name: any) => {
//     console.log("name::::", name);
//     // router.push({
//     //   pathname: "/(Dashboard)/Categories",
//     //   params: { name: name },
//     // });
//   };

//   return (
//     <>
//       <LinearGradient
//         colors={["#FFC41F10", "#FFFFFF10", "#FFC41F20"]}
//         style={styles.LinearGradient}
//       />
//       <StatusBar style="dark" backgroundColor="#FFFFFF" />
//       <View style={styles.container}>
//         <View style={styles.userHeaderContainer}>
//           <View style={styles.userHeaderLeft}>
//             <Image
//               source={{ uri: userDetails.UserProfilePicture || UserProfile }}
//               style={styles.userProfileImage}
//             />
//             {/* <Image
//                   source={{ uri: userDetails.UserProfilePicture }}
//                   style={styles.userProfileImage}
//                 /> */}
//             <View style={styles.userTextContainer}>
//               <Text style={styles.userGreetingText}>Hello,</Text>
//               <Text style={styles.userNameText}>
//                 {userDetails.UserName || "UserName"}!
//               </Text>
//               {/* <Text style={styles.userNameText}>MetaFront! LLP.</Text> */}
//             </View>
//           </View>
//           <View style={styles.bgbill}>
//             <Image source={icons.Notification1} style={styles.bellIcon} />
//           </View>
//         </View>
//         {/* <View style={styles.SearchANDFilter}>
//               <TextInput onChangeText={(text) => { FilterCatagories(text) }} style={[styles.input , {color: colorScheme === 'dark' ? '#000' : '#000'} ]} />
//               <Image style={styles.filterimg} source={Filtericon} />
//             </View> */}
//         <TasksStatistics cardDataArray={cardDataArray} />
//         <ScrollView
//           style={styles.cardContainer}
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//         >
//           {/* <View style={styles.editcontainer}>
//                 <Text style={styles.heading}>Your Lists</Text>
//                 <TouchableOpacity
//                   activeOpacity={0.4}
//                   style={styles.skip}
//                 // onPress={() => navigation.navigate(SCREENS.Theme)}
//                 >
//                   <Text style={styles.heading}>Edit</Text>
//                 </TouchableOpacity>
//               </View> */}
//           {cardDataFilterArray.map((item, index) => (
//             <CardComponent
//               key={index}
//               data={item}
//               onPress={handleNavigate.bind(null, item.title)}
//             />
//           ))}

//           <TouchableOpacity
//             //  onPress={() => navigation.navigate(SCREENS.Theme)}
//             style={styles.card}
//           >
//             <View style={styles.iconContainer}>
//               <Text style={styles.icon}> + </Text>
//             </View>
//             <Text style={styles.iconText}>Create List</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>
//       {/* )} */}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   LinearGradient: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     top: 0,
//     height: 300,
//     borderTopLeftRadius: 14, // Set your desired border radius
//     borderTopRightRadius: 14, // Set your desired border radius
//     overflow: "hidden", // Ensures content doesn't overflow
//   },

//   container: {
//     flex: 1,
//     paddingTop: 30,
//     paddingHorizontal: "5%",
//     backgroundColor: "#FFFFFF",
//   },
//   userHeaderContainer: {
//     marginTop: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginHorizontal: "auto",
//     width: "100%",
//     marginVertical: 10,
//     // backgroundColor:"red"
//   },
//   userHeaderLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   userProfileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   userTextContainer: {
//     flexDirection: "column",
//   },
//   userGreetingText: {
//     fontSize: 13,
//     color: "#344054",
//     lineHeight: 19.5,
//     fontFamily: "OpenSans-Medium",
//   },
//   userNameText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "black",
//     lineHeight: 16,
//     fontFamily: FontFamily.heading,
//     marginTop: 5,
//   },
//   notificationIcon: {
//     width: 30,
//     height: 30,
//   },
//   caption: {
//     fontFamily: "Poppins-Regular",
//     fontSize: 12,
//     paddingVertical: "0.2%",
//     color: "#6c6c6c",
//     fontWeight: "300",
//     lineHeight: 13,
//     textAlign: "left",
//   },
//   caption2: {
//     fontFamily: "Poppins-Regular",
//     fontSize: 13,
//     paddingVertical: "0.4%",
//     color: "#6c6c6c",
//     fontWeight: "300",
//     lineHeight: 23,
//     textAlign: "left",
//   },
//   heading: {
//     fontFamily: "OpenSans-SemiBold",
//     fontSize: 16,
//     color: "#000",
//     paddingVertical: "1%",
//     fontWeight: "600",
//     lineHeight: 16,
//     textAlign: "left",
//   },
//   editcontainer: {
//     width: "100%",
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//     justifyContent: "space-between",
//   },
//   SearchANDFilter: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     marginBottom: 6,
//   },
//   filterimg: {
//     width: 40,
//     aspectRatio: 1,
//   },
//   cardContainer: {
//     backgroundColor: "#FFFFFF",
//     flexGrow: 1,
//     // marginBottom: 80,
//     zIndex: 999,
//   },
//   scrollContent: {
//     alignItems: "flex-start",
//   },
//   input: {
//     flex: 1,
//     height: 40.5,
//     borderColor: "#52C2FE",
//     borderWidth: 1,
//     borderRadius: 8,
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: 20,
//     paddingVertical: 0,
//     fontFamily: "Poppins-Light",
//     fontSize: 14,
//     lineHeight: 40,
//     textAlignVertical: "center",
//   },
//   iconContainer: {
//     backgroundColor: "grey",
//     borderRadius: 50,
//     width: 40,
//     aspectRatio: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   icon: {
//     fontFamily: "OpenSans-SemiBold",
//     fontSize: 28,
//     marginBottom: 10,
//     marginLeft: 1,
//     color: "white",
//   },
//   iconText: {
//     fontFamily: "OpenSans-SemiBold",
//     fontSize: 16,
//     marginBottom: 6,
//     marginLeft: 3,
//     color: "grey",
//     marginTop: 5,
//     textAlign: "center",
//   },
//   bgbill: {
//     backgroundColor: "#FF3837",
//     height: 30,
//     width: 30,
//     borderRadius: 17,
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: "#E24140",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 4,
//     elevation: 6,
//   },
//   card: {
//     width: "98%",
//     height: 60,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     gap: 4,
//     borderRadius: 14,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//     marginVertical: 10,
//     marginHorizontal: "auto",
//   },
//   bellIcon: {
//     width: 20,
//     height: 20,
//     color: "#fff",
//   },
//   todayProgress_card: {
//     marginTop: 10,
//     height: hp("20%"),
//     width: "100%",
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     gap: 4,
//     borderRadius: 14,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//     marginVertical: 10,
//     marginHorizontal: "auto",
//   },
//   innerView: {
//     // flexDirection: "row",
//     margin: 10,
//     alignItems: "flex-start",
//     justifyContent: "space-between",
//     width: "100%",
//     gap: 10,
//   },
//   innerText: {
//     fontFamily: "Poppins-Regular",
//     fontSize: 10,
//     color: "#000",
//     paddingVertical: "0.5%",
//     fontWeight: "400",
//     lineHeight: 12,
//     textAlign: "left",
//   },
//   progressCircles_view: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     // backgroundColor:"black",
//   },
//   motivational_msg_view: {
//     flexDirection: "row",
//     alignItems: "center",
//     // gap: 0,
//     // backgroundColor:"black",
//     marginTop: 5,
//   },
// });

// export default Dashboard2;


//************************************************************************************* */

// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   ScrollView,
//   Dimensions,
// } from "react-native";
// import { useContext, useState } from "react";
// import { Image } from "expo-image";
// // import Filtericon from '../../assets/images/filtericon.png';
// import first from "../../assets/images/SVG/dashboardgrocery.svg";
// import seconed from "../../assets/images/SVG/dashboardspiritualgoals.svg";
// import third from "../../assets/images/SVG/dashboardpersonalgromming.svg";
// import fourth from "../../assets/images/SVG/thingstodo.svg";
// import fifth from "../../assets/images/SVG/recipe.svg";
// import bell from "../../assets/images/SVG/dashboard/bell.svg";
// import { ProductContext } from "../../Context/CardContext";
// import CardComponent from "../../components/Card";
// import UserProfile from "../../assets/images/UserProfile.png";
// import TasksStatistics from "@/components/TasksStatistics";
// import { StatusBar } from "expo-status-bar";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS, icons } from "../../constants";
// import { FontFamily } from "@/constants/theme";
// import ProgressCircle from "../../components/progress";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// // import CircularProgress from "react-native-progress";
// import { Svg, Circle } from "react-native-svg";
// import { router } from "expo-router";
// import React from "react";

// const Dashboard = () => {
//   const { userDetails } = useContext(ProductContext);
//   const cardDataArray = [
//     {
//       title: "Grocery List",
//       description: "Add needed items.",
//       items: "200 Items",
//       percentagetext: "Bought 70%",
//       progress: 0.8,
//       color: "#008B94",
//       Picture: first,
//       bgColor: "#9DF4F4",
//       badgeColor: "#61CBD6",
//     },
//     {
//       title: "Spiritual Goals",
//       description: "Add your spiritual goals.",
//       items: "10 Goals",
//       percentagetext: "Achieved 30%",
//       progress: 0.67,
//       Picture: seconed,
//       bgColor: "#98FBCB",
//       badgeColor: "#4AA688",
//     },
//     {
//       title: "Personal Grooming",
//       description: "Add your grooming tasks in list.",
//       items: "10 Tasks",
//       percentagetext: "Completed 80%",
//       progress: 0.72,
//       Picture: third,
//       bgColor: "#FEE5D7",
//       badgeColor: "#C54B6C",
//     },
//     {
//       title: "Things To Do",
//       description: "Add tasks in your to do list.",
//       items: "0 Items",
//       percentagetext: "Completed 50%",
//       progress: 0.5,
//       Picture: fourth,
//       bgColor: "#FFCBA1",
//       badgeColor: "#E36A4A",
//     },
//     {
//       title: "Kitchen Menu",
//       description: "Add items to your list.",
//       items: "500 Recipes",
//       percentagetext: "Cooked 0%",
//       progress: 0.78,
//       Picture: fifth,
//       bgColor: "#FDDC8A",
//       badgeColor: "#D88D1B",
//     },
//   ];

//   const [cardDataFilterArray, setCardDataFilterArray] = useState(cardDataArray);
//   const [value, setValue] = useState(0);
//   const handleNavigate = (name: any) => {
//     console.log("name::::", name);
//     // router.push({
//     //   pathname: "/(Dashboard)/Categories",
//     //   params: { name: name },
//     // });
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar style="dark" backgroundColor="#FFFFFF" />
//       <View style={styles.userHeaderContainer}>
//         <View style={styles.userHeaderLeft}>
//           <Image
//             source={{ uri: userDetails.UserProfilePicture || UserProfile }}
//             style={styles.userProfileImage}
//           />
//           <View style={styles.userTextContainer}>
//             <Text style={styles.userGreetingText}>Hello,</Text>
//             <Text style={styles.userNameText}>
//               {userDetails.UserName || "UserName"}!
//             </Text>
//             {/* <Text style={styles.userNameText}>MetaFront! LLP.</Text> */}
//           </View>
//         </View>
//         <View style={styles.bgbill}>
//           <Image source={icons.Notification1} style={styles.bellIcon} />
//         </View>
//       </View>
//       <TasksStatistics cardDataArray={cardDataArray} />
//       <ScrollView
//         style={styles.cardContainer}
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         {/* <View style={styles.editcontainer}>
//                 <Text style={styles.heading}>Your Lists</Text>
//                 <TouchableOpacity
//                   activeOpacity={0.4}
//                   style={styles.skip}
//                 // onPress={() => navigation.navigate(SCREENS.Theme)}
//                 >
//                   <Text style={styles.heading}>Edit</Text>
//                 </TouchableOpacity>
//               </View> */}
//         {cardDataFilterArray.map((item, index) => (
//           <CardComponent
//             key={index}
//             data={item}
//             onPress={handleNavigate.bind(null, item.title)}
//           />
//         ))}

//         <TouchableOpacity
//           //  onPress={() => navigation.navigate(SCREENS.Theme)}
//           style={styles.card}
//         >
//           <View style={styles.iconContainer}>
//             <Text style={styles.icon}> + </Text>
//           </View>
//           <Text style={styles.iconText}>Create List</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container2: {
//     flex: 1,
//     backgroundColor: "red",
//   },
//   LinearGradient: {
//     // position: "absolute",
//     left: 0,
//     right: 0,
//     top: 0,
//     height: 300,
//     borderTopLeftRadius: 14, // Set your desired border radius
//     borderTopRightRadius: 14, // Set your desired border radius
//     overflow: "hidden", // Ensures content doesn't overflow
//   },

//   container: {
//     flex: 1,
//     paddingTop: 30,
//     paddingHorizontal: "5%",
//     backgroundColor: "#FFFFFF",
//   },
//   userHeaderContainer: {
//     marginTop: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginHorizontal: "auto",
//     width: "100%",
//     marginVertical: 10,
//     // backgroundColor:"red"
//   },
//   userHeaderLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   userProfileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   userTextContainer: {
//     flexDirection: "column",
//   },
//   userGreetingText: {
//     fontSize: 13,
//     color: "#344054",
//     lineHeight: 19.5,
//     fontFamily: "OpenSans-Medium",
//   },
//   userNameText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "black",
//     lineHeight: 16,
//     fontFamily: FontFamily.heading,
//     marginTop: 5,
//   },
//   notificationIcon: {
//     width: 30,
//     height: 30,
//   },
//   caption: {
//     fontFamily: "Poppins-Regular",
//     fontSize: 12,
//     paddingVertical: "0.2%",
//     color: "#6c6c6c",
//     fontWeight: "300",
//     lineHeight: 13,
//     textAlign: "left",
//   },
//   caption2: {
//     fontFamily: "Poppins-Regular",
//     fontSize: 13,
//     paddingVertical: "0.4%",
//     color: "#6c6c6c",
//     fontWeight: "300",
//     lineHeight: 23,
//     textAlign: "left",
//   },
//   heading: {
//     fontFamily: "OpenSans-SemiBold",
//     fontSize: 16,
//     color: "#000",
//     paddingVertical: "1%",
//     fontWeight: "600",
//     lineHeight: 16,
//     textAlign: "left",
//   },
//   editcontainer: {
//     width: "100%",
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//     justifyContent: "space-between",
//   },
//   SearchANDFilter: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     marginBottom: 6,
//   },
//   filterimg: {
//     width: 40,
//     aspectRatio: 1,
//   },
//   cardContainer: {
//     backgroundColor: "#FFFFFF",
//     flexGrow: 1,
//     // marginBottom: 80,
//     zIndex: 999,
//   },
//   scrollContent: {
//     alignItems: "flex-start",
//   },
//   input: {
//     flex: 1,
//     height: 40.5,
//     borderColor: "#52C2FE",
//     borderWidth: 1,
//     borderRadius: 8,
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: 20,
//     paddingVertical: 0,
//     fontFamily: "Poppins-Light",
//     fontSize: 14,
//     lineHeight: 40,
//     textAlignVertical: "center",
//   },
//   iconContainer: {
//     backgroundColor: "grey",
//     borderRadius: 50,
//     width: 40,
//     aspectRatio: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   icon: {
//     fontFamily: "OpenSans-SemiBold",
//     fontSize: 28,
//     marginBottom: 10,
//     marginLeft: 1,
//     color: "white",
//   },
//   iconText: {
//     fontFamily: "OpenSans-SemiBold",
//     fontSize: 16,
//     marginBottom: 6,
//     marginLeft: 3,
//     color: "grey",
//     marginTop: 5,
//     textAlign: "center",
//   },
//   bgbill: {
//     backgroundColor: "#FF3837",
//     height: 30,
//     width: 30,
//     borderRadius: 17,
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: "#E24140",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 4,
//     elevation: 6,
//   },
//   card: {
//     width: "98%",
//     height: 60,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     gap: 4,
//     borderRadius: 14,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//     marginVertical: 10,
//     marginHorizontal: "auto",
//   },
//   bellIcon: {
//     width: 20,
//     height: 20,
//     color: "#fff",
//   },
//   todayProgress_card: {
//     marginTop: 10,
//     height: hp("20%"),
//     width: "100%",
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     gap: 4,
//     borderRadius: 14,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//     marginVertical: 10,
//     marginHorizontal: "auto",
//   },
//   innerView: {
//     // flexDirection: "row",
//     margin: 10,
//     alignItems: "flex-start",
//     justifyContent: "space-between",
//     width: "100%",
//     gap: 10,
//   },
//   innerText: {
//     fontFamily: "Poppins-Regular",
//     fontSize: 10,
//     color: "#000",
//     paddingVertical: "0.5%",
//     fontWeight: "400",
//     lineHeight: 12,
//     textAlign: "left",
//   },
//   progressCircles_view: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     // backgroundColor:"black",
//   },
//   motivational_msg_view: {
//     flexDirection: "row",
//     alignItems: "center",
//     // gap: 0,
//     // backgroundColor:"black",
//     marginTop: 5,
//   },
// });

// export default Dashboard;

// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   FlatList,
// } from "react-native";
// import { useContext, useState } from "react";
// import { Image } from "expo-image";
// import { ProductContext } from "@/Context/CardContext";
// import CardComponent from "@/components/Card";
// import UserProfile from "@/assets/images/UserProfile.png";
// import TasksStatistics from "@/components/TasksStatistics";
// import { StatusBar } from "expo-status-bar";
// import { COLORS, icons } from "@/constants";
// import { FontFamily } from "@/constants/theme";
// import { router } from "expo-router";

// import first from "@/assets/images/SVG/dashboardgrocery.svg";
// import seconed from "@/assets/images/SVG/dashboardspiritualgoals.svg";
// import third from "@/assets/images/SVG/dashboardpersonalgromming.svg";
// import fourth from "@/assets/images/SVG/thingstodo.svg";
// import fifth from "@/assets/images/SVG/recipe.svg";

// const Dashboard = () => {
//   const { userDetails } = useContext(ProductContext);

//   const cardDataArray = [
//     {
//       title: "Grocery List",
//       description: "Add needed items.",
//       items: "200 Items",
//       percentagetext: "Bought 70%",
//       progress: 0.8,
//       Picture: first,
//       bgColor: "#9DF4F4",
//       badgeColor: "#61CBD6",
//     },
//     {
//       title: "Spiritual Goals",
//       description: "Add your spiritual goals.",
//       items: "10 Goals",
//       percentagetext: "Achieved 30%",
//       progress: 0.67,
//       Picture: seconed,
//       bgColor: "#98FBCB",
//       badgeColor: "#4AA688",
//     },
//     {
//       title: "Personal Grooming",
//       description: "Add your grooming tasks in list.",
//       items: "10 Tasks",
//       percentagetext: "Completed 80%",
//       progress: 0.72,
//       Picture: third,
//       bgColor: "#FEE5D7",
//       badgeColor: "#C54B6C",
//     },
//     {
//       title: "Things To Do",
//       description: "Add tasks in your to-do list.",
//       items: "0 Items",
//       percentagetext: "Completed 50%",
//       progress: 0.5,
//       Picture: fourth,
//       bgColor: "#FFCBA1",
//       badgeColor: "#E36A4A",
//     },
//     {
//       title: "Kitchen Menu",
//       description: "Add items to your list.",
//       items: "500 Recipes",
//       percentagetext: "Cooked 0%",
//       progress: 0.78,
//       Picture: fifth,
//       bgColor: "#FDDC8A",
//       badgeColor: "#D88D1B",
//     },
//   ];

//   const [cardDataFilterArray, setCardDataFilterArray] = useState(cardDataArray);

//   const handleNavigate = (name: string) => {
//     // router.push(`/details/${name}`);
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar style="dark" backgroundColor="#FFFFFF" />

//       {/* User Header */}
//       <View style={styles.userHeaderContainer}>
//         <View style={styles.userHeaderLeft}>
//           <Image
//             source={{ uri: userDetails.UserProfilePicture || UserProfile }}
//             style={styles.userProfileImage}
//           />
//           <View style={styles.userTextContainer}>
//             <Text style={styles.userGreetingText}>Hello,</Text>
//             <Text style={styles.userNameText}>
//               {userDetails.UserName || "UserName"}!
//             </Text>
//           </View>
//         </View>

//         {/* Notification Icon */}
//         <TouchableOpacity style={styles.bgbill}>
//           <Image source={icons.Notification1} style={styles.bellIcon} />
//         </TouchableOpacity>
//       </View>

//       {/* Tasks Statistics Component */}
//       <TasksStatistics cardDataArray={cardDataArray} />
//       <View style={styles.flatListContainer}>
//         {/* Card List */}
//         <FlatList
//           data={cardDataFilterArray}
//           keyExtractor={(item, index) => index.toString()}
//           contentContainerStyle={styles.cardContainer}
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//           renderItem={({ item }) => (
//             <CardComponent
//               data={item}
//               onPress={() =>
//                 router.push({
//                   pathname: "/(Dashboard)/Categories",
//                   params: { name: item.title },
//                 })
//               }
//             />
//           )}
//           ListFooterComponent={
//             <TouchableOpacity style={styles.card}>
//               <View style={styles.iconContainer}>
//                 <Text style={styles.icon}> + </Text>
//               </View>
//               <Text style={styles.iconText}>Create List</Text>
//             </TouchableOpacity>
//           }
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 30,
//     paddingHorizontal: "5%",
//     backgroundColor: "#FFFFFF",
//   },
//   flatListContainer: {
//     backgroundColor: "red",
//     marginBottom: 350,
//   },
//   userHeaderContainer: {
//     marginTop: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "100%",
//     marginVertical: 10,
//   },
//   userHeaderLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   userProfileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   userTextContainer: {
//     flexDirection: "column",
//   },
//   userGreetingText: {
//     fontSize: 13,
//     color: "#344054",
//     fontFamily: "OpenSans-Medium",
//   },
//   userNameText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "black",
//     fontFamily: FontFamily.heading,
//     marginTop: 5,
//   },
//   bgbill: {
//     backgroundColor: "#FF3837",
//     height: 30,
//     width: 30,
//     borderRadius: 17,
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: "#E24140",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.4,
//     shadowRadius: 4,
//     elevation: 6,
//   },
//   cardContainer: {
//     paddingBottom: 20,
//     backgroundColor: "black",
//   },
//   card: {
//     width: "98%",
//     height: 60,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "column",
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   iconContainer: {
//     backgroundColor: "grey",
//     borderRadius: 50,
//     width: 40,
//     aspectRatio: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   icon: {
//     fontSize: 28,
//     color: "white",
//   },
//   iconText: {
//     fontSize: 16,
//     color: "grey",
//     marginTop: 5,
//     textAlign: "center",
//   },
//   bellIcon: {
//     width: 25,
//     height: 25,
//   },
// });

// export default Dashboard;

// ***************************************************************Card
// import * as Progress from "react-native-progress";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import circle from "../assets/images/circle.png";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { Image } from "expo-image";
// import { COLORS, FontFamily, FontSize } from "../constants/theme";

// interface CardData {
//   title?: string;
//   description?: string;
//   items?: string;
//   percentagetext?: string;
//   progress?: number;
//   Picture?: any;
//   bgColor?: string;
//   badgeColor?: string;
//   textcolor?: string;
// }

// interface CardComponentProps {
//   onPress?: () => void;
//   data?: CardData;
// }

// const CardComponent: React.FC<CardComponentProps> = ({
//   onPress = () => {
//     console.log("clicked");
//   },
//   data = {},
// }) => {
//   const {
//     title,
//     description,
//     items,
//     percentagetext,
//     progress = 0,
//     Picture,
//     bgColor,
//     badgeColor,
//     textcolor = "#626262",
//   } = data;

//   // Ensure progress is within the range [0, 1]
//   const clampedProgress = Math.max(0, Math.min(progress, 1));

//   return (
//     // <TouchableOpacity
//     //   activeOpacity={1}
//     //   style={[styles.cardContainer, { backgroundColor: bgColor }]}
//     //   onPress={() => onPress()}
//     // >
//     <TouchableOpacity
//       activeOpacity={0.8}
//       style={[styles.cardContainer, { backgroundColor: bgColor }]}
//       onPress={() => {
//         console.log("Card Pressed:", title);
//         onPress();
//       }}
//     >
//       <View style={styles.contentContainer}>
//         <Text style={[styles.title, { color: textcolor }]}>{title}</Text>
//         <Text style={[styles.description, { color: textcolor }]}>
//           {description}
//         </Text>
//         <Text style={[styles.badge, { backgroundColor: badgeColor }]}>
//           {items}
//         </Text>
//         <Text style={[styles.percentage, { color: textcolor }]}>
//           {percentagetext}
//         </Text>
//         <View style={[styles.progressview, { borderColor: badgeColor }]}>
//           <Progress.Bar
//             progress={clampedProgress}
//             unfilledColor="white"
//             borderWidth={0}
//             color={badgeColor}
//             animated={true}
//             width={wp("45%")}
//             height={hp("0.5%")}
//           />
//         </View>
//       </View>
//       <View style={styles.contentContainer2}>
//         <Image source={circle} style={styles.image2} />
//         <View style={styles.image}>
//           <Image source={Picture} style={styles.responsiveImage} />
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const CardComponent: React.FC<CardComponentProps> = ({
//   onPress,
//   data = {},
// }) => {
//   const {
//     title,
//     description,
//     items,
//     percentagetext,
//     progress = 0,
//     Picture,
//     bgColor,
//     badgeColor,
//     textcolor = "#626262",
//   } = data;

//   // Ensure progress is within the range [0, 1]
//   const clampedProgress = Math.max(0, Math.min(progress, 1));

//   return (
//     <TouchableOpacity
//       activeOpacity={0.8}
//       style={[styles.cardContainer, { backgroundColor: bgColor }]}
//       onPress={() => {
//         if (onPress) {
//           console.log("Card Pressed:", title);
//           onPress();
//         }
//       }}
//     >
//       <View style={styles.contentContainer}>
//         <Text style={[styles.title, { color: textcolor }]}>{title}</Text>
//         <Text style={[styles.description, { color: textcolor }]}>
//           {description}
//         </Text>
//         <Text style={[styles.badge, { backgroundColor: badgeColor }]}>
//           {items}
//         </Text>
//         <Text style={[styles.percentage, { color: textcolor }]}>
//           {percentagetext}
//         </Text>
//         <View style={[styles.progressview, { borderColor: badgeColor }]}>
//           <Progress.Bar
//             progress={clampedProgress}
//             unfilledColor="white"
//             borderWidth={0}
//             color={badgeColor}
//             animated={true}
//             width={wp("45%")}
//             height={hp("0.5%")}
//           />
//         </View>
//       </View>
//       <View style={styles.contentContainer2}>
//         <Image source={circle} style={styles.image2} />
//         <View style={styles.image}>
//           <Image source={Picture} style={styles.responsiveImage} />
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   cardContainer: {
//     height: hp("20%"),
//     width: "100%",
//     zIndex: 999,
//     borderRadius: wp("5%"),
//     flex: 1,
//     marginVertical: hp("1.5%"),
//     overflow: "hidden",
//     flexDirection: "row",
//   },
//   contentContainer: {
//     flexDirection: "column",
//     justifyContent: "center",
//     gap: hp("0.5%"),
//     alignItems: "flex-start",
//     flex: 1.2,
//     marginLeft: wp("6%"),
//   },
//   contentContainer2: {
//     position: "relative",
//     flex: 1,
//     padding: wp("2%"),
//   },
//   title: {
//     fontFamily: FontFamily.H4_Regular,
//     fontSize: FontSize.itemtitle,
//     color: COLORS.black,
//     fontWeight: "600",
//     lineHeight: wp("5.5%"),
//     textAlign: "left",
//   },
//   description: {
//     fontFamily: FontFamily.S1_Regular,
//     fontSize: FontSize.subtitle,
//     color: COLORS.gray,
//     fontWeight: "300",
//     marginVertical: hp("0.2%"),
//     textAlign: "left",
//   },
//   badge: {
//     paddingHorizontal: wp("3%"),
//     paddingVertical: hp("0.5%"),
//     textAlign: "center",
//     borderRadius: wp("5%"),
//     fontSize: FontSize.subtitle,
//     fontFamily: FontFamily.subtitle,
//     color: "white",
//     marginVertical: hp("0.2%"),
//   },
//   percentage: {
//     fontSize: wp("3.5%"),
//     color: "#000",
//   },
//   progressview: {
//     backgroundColor: "#FFFFFF",
//     borderWidth: 1,
//     borderRadius: wp("2%"),
//   },
//   image: {
//     position: "absolute",
//     right: -16,
//     bottom: 0,
//   },
//   responsiveImage: {
//     width: wp("40%"),
//     height: hp("15%"),
//     resizeMode: "contain",
//   },
//   image2: {
//     position: "absolute",
//     right: 0,
//     top: -12,
//     width: "100%",
//     height: "100%",
//     resizeMode: "contain",
//   },
// });

// export default CardComponent;
