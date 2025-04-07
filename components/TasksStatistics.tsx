import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import React from "react";
import UserProfile from "../assets/images/UserProfile.png";
import ProgressCircle from "./progress";
import { Image } from "expo-image";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Define the type for each item in cardDataArray
interface CardData {
  progress: number;
  badgeColor: string;
}

// Define the prop types for the component
interface TasksStatisticsProps {
  cardDataArray: CardData[];
}

const TasksStatistics: React.FC<TasksStatisticsProps> = ({ cardDataArray }) => {
  // const { width, height } = useWindowDimensions();
  return (
    <View style={styles.todayProgress_card}>
      <LinearGradient
        colors={["#9584F8", "#9584F810", "#9584F820"]}
        style={styles.LinearGradient}
      >
        <View style={styles.innerView}>
          <Text style={styles.innerText}>Today’s Progress</Text>

          <View style={styles.progressCircles_view}>
            {cardDataArray.map((card, index) => (
              <ProgressCircle
                key={index}
                percentage={card.progress ? card.progress * 100 : 1}
                colors={["#FFF", card.badgeColor, card.badgeColor]}
                size={height * 0.0488}
                strokeWidth={7}
                textSize={10}
              />
            ))}
          </View>

          <View style={styles.motivational_msg_view}>
            <Image
              source={UserProfile}
              style={[styles.userProfileImage, { width: 17.69, height: 17.69 }]}
            />
            <View
              style={{
                backgroundColor: "#8879F6",
                justifyContent: "center",
                borderRadius: 11.17,
                width: width * 0.5778,
                height: height * 0.0232,
              }}
            >
              <Text
                style={[
                  styles.motivationalmsg,
                  { color: "#FFF", textAlign: "left" },
                ]}
              >
                🎉 Keep the pace! You’re doing great.
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default TasksStatistics;

const styles = StyleSheet.create({
  todayProgress_card: {
    marginTop: height * 0.0244,
    height: height * 0.1683,
    width: width * 0.8889,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: height * 0.0122,
    marginHorizontal: 0,
  },
  innerView: {
    // margin: 10,
    marginVertical: height * 0.022,
    marginHorizontal: width * 0.05,
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",

    // backgroundColor: "red",
    // paddingHorizontal: 10,
    // height: height * 0.1238,
  },
  innerText: {
    fontFamily: "OpenSans-Medium",
    fontSize: 14,
    color: "#5C5C5C",
    // paddingVertical: "0.5%",

    // lineHeight: "100%",
    textAlign: "left",
    // backgroundColor: "red",
    marginBottom: height * 0.0171,
  },
  progressCircles_view: {
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.0111,
    // backgroundColor: "red",
  },
  motivational_msg_view: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.0171,
    // backgroundColor: "red",
    // width: width * 0.8889,
  },
  LinearGradient: {
    // position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: height * 0.1683,
    width: "100%",
    // borderTopLeftRadius: 14,
    // borderTopRightRadius: 14,
    overflow: "hidden",
    borderRadius: 14,
    // backgroundColor: "green",
  },
  userProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: width * 0.0083,
  },
  motivationalmsg: {
    fontFamily: "OpenSans-Regular",
    fontSize: 9,
    textAlign: "center",
    color: "#FFFFFF",
    marginLeft: width * 0.0278,
  },
});

// import { StyleSheet, Text, View } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import React from "react";
// import UserProfile from "../assets/images/UserProfile.png";
// import ProgressCircle from "./progress";
// import { Image } from "expo-image";

// // Define the type for each item in cardDataArray
// interface CardData {
//   progress: number;
//   badgeColor: string;
// }

// // Define the prop types for the component
// interface TasksStatisticsProps {
//   cardDataArray: CardData[];
// }

// const TasksStatistics: React.FC<TasksStatisticsProps> = ({ cardDataArray }) => {
//   return (
//     <View style={styles.todayProgress_card}>
//       <LinearGradient
//         colors={["#9584F8", "#9584F810", "#9584F820"]}
//         style={styles.LinearGradient}
//       >
//         <View style={styles.innerView}>
//           <Text style={styles.innerText}>Tasks Completed!</Text>

//           <View style={styles.progressCircles_view}>
//             {cardDataArray.map((card, index) => (
//               <ProgressCircle
//                 key={index}
//                 percentage={card.progress ? card.progress * 100 : 1}
//                 colors={["#FFF", card.badgeColor, card.badgeColor]}
//                 size={40}
//                 strokeWidth={7}
//                 textSize={10}
//               />
//             ))}
//           </View>

//           <View style={styles.motivational_msg_view}>
//             <Image
//               source={UserProfile}
//               style={[styles.userProfileImage, { width: 17.69, height: 17.69 }]}
//             />
//             <View
//               style={{
//                 backgroundColor: "#8879F6",
//                 justifyContent: "center",
//                 borderRadius: 11.17,
//                 width: 208,
//                 height: 19,
//                 left: -4,
//               }}
//             >
//               <Text
//                 style={[
//                   styles.innerText,
//                   { color: "#FFF", textAlign: "center" },
//                 ]}
//               >
//                 🎉 Keep the pace! You’re doing great.
//               </Text>
//             </View>
//           </View>
//         </View>
//       </LinearGradient>
//     </View>
//   );
// };

// export default TasksStatistics;

// const styles = StyleSheet.create({
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
//     margin: 10,
//     alignItems: "flex-start",
//     justifyContent: "space-between",
//     width: "100%",
//     gap: 10,
//   },
//   innerText: {
//     fontFamily: "OpenSans-Regular",
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
//   },
//   motivational_msg_view: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 5,
//   },
//   LinearGradient: {
//     // position: "absolute",
//     left: 0,
//     right: 0,
//     top: 0,
//     height: hp("20%"),
//     width: "100%",
//     // borderTopLeftRadius: 14,
//     // borderTopRightRadius: 14,
//     overflow: "hidden",
//     borderRadius: 14,
//   },
//   userProfileImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 25,
//     marginRight: 10,
//   },
// });
