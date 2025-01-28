// import React from 'react';
// // import * as Progress from 'react-native-progress';
// import { View, Text, StyleSheet,  TouchableOpacity } from 'react-native';
// import circle from '../assets/images/circle.png';
// import { Image } from 'expo-image';

// const CardComponent = ({ onPress=()=>{console.log("clicked")}, data = {} }) => {
//   const {
//     title,
//     description,
//     items,
//     percentagetext,
//     percentage,
//     Picture,
//     bgColor,
//     badgeColor,
//     textcolor="#626262",
//   } = data;

//   const percent = percentage / 100;

//   return (
//     <TouchableOpacity activeOpacity={1} style={[styles.cardContainer, { backgroundColor: bgColor }]} onPress={onPress}>
//       <View style={[styles.contentContainer]}>
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
//         <View style={[styles.progressview , { borderColor: badgeColor }]} >
//           {/* <Progress.Bar progress={percent} borderWidth={0} color={badgeColor} animated={true} /> */}
//         </View>
//       </View>
//       <View style={[styles.contentContainer2]}>
//         <Image source={circle} style={[styles.image2]} />
//         <View style={styles.image}>
//           <Image source={Picture}  width={150} height={130} fill="#000"/>
//         {/* <Picture width={150} height={130} fill="#000"/> */}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   cardContainer: {
//     height: 148,
//     width: '100%',
//     borderRadius: 22,
//     flex: 1,
//     marginVertical: 10,
//     overflow: 'hidden',
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   contentContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     gap: 2,
//     alignItems: 'flex-start',
//     flex: 1.2,
//     marginLeft: 15,
//   },
//   contentContainer2: {
//     position: 'relative',
//     flex: 1,
//     padding: 10,
//   },
//   title: {
//     fontFamily: 'OpenSans-SemiBold',
//     fontSize: 18,
//     fontWeight: '600',
//     lineHeight: 22,
//     textAlign: 'left',
//   },
//   description: {
//     fontFamily: 'Poppins',
//     fontSize: 12,
//     fontWeight: '300',
//     lineHeight: 15,
//     textAlign: 'left',
//   },
//   badge: {
//     color: '#FFF',
//     paddingHorizontal: 10,
//     paddingVertical: 2,
//     textAlign: 'center',
//     borderRadius: 20,
//   },
//   percentage: {
//     color: '#000',
//   },
//   image: {
//     position: 'absolute',
//     right: 0,
//     bottom: 0,
//   },
//   image2: {
//     position: 'absolute',
//     right: 0,
//     top: 0,
//     width: '100%',
//     maxWidth: '100%',
//     height: '105%',
//   },
//   progressview: {
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderRadius: 5,
//   },
// });

// export default CardComponent;

// import React from "react";
// import * as Progress from "react-native-progress";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import circle from "../assets/images/circle.png";
// import { Image } from "expo-image";

// const CardComponent = ({
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
//     progress,
//     Picture,
//     bgColor,
//     badgeColor,
//     textcolor = "#626262",
//   } = data;

//   return (
//     <TouchableOpacity
//       activeOpacity={1}
//       style={[styles.cardContainer, { backgroundColor: bgColor }]}
//       onPress={onPress}
//     >
//       <View style={[styles.contentContainer]}>
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
//             progress={progress}
//             unfilledColor="white"
//             borderWidth={0}
//             color={badgeColor}
//             animated={true}
//             width={150}
//             height={0.1}
//             useNativeDriver={true}
//           />
//         </View>
//       </View>
//       <View style={[styles.contentContainer2]}>
//         <Image source={circle} style={[styles.image2]} />
//         <View style={styles.image}>
//           <Image source={Picture} width={150} height={130} fill="#000" />
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   cardContainer: {
//     height: 148,
//     width: "100%",
//     borderRadius: 22,
//     flex: 1,
//     marginVertical: 10,
//     overflow: "hidden",
//     display: "flex",
//     flexDirection: "row",
//   },
//   contentContainer: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     gap: 2,
//     alignItems: "flex-start",
//     flex: 1.2,
//     marginLeft: 15,
//   },
//   contentContainer2: {
//     position: "relative",
//     flex: 1,
//     padding: 10,
//   },
//   title: {
//     fontFamily: "OpenSans-SemiBold",
//     fontSize: 18,
//     fontWeight: "600",
//     lineHeight: 22,
//     textAlign: "left",
//   },
//   description: {
//     fontFamily: "Poppins",
//     fontSize: 12,
//     fontWeight: "300",
//     lineHeight: 15,
//     textAlign: "left",
//   },
//   badge: {
//     color: "#FFF",
//     paddingHorizontal: 10,
//     paddingVertical: 2,
//     textAlign: "center",
//     borderRadius: 20,
//   },
//   progress: {
//     color: "#000",
//   },
//   image: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//   },
//   image2: {
//     position: "absolute",
//     right: 0,
//     top: 0,
//     width: "100%",
//     maxWidth: "100%",
//     height: "105%",
//   },
//   progressview: {
//     backgroundColor: "#FFFFFF",
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 3,
//   },
// });

// export default CardComponent;
// import React from "react";
// import * as Progress from "react-native-progress";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import circle from "../assets/images/circle.png";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";
// import { Image } from "expo-image";
// import { COLORS, FontFamily, FontSize } from "../constants/theme";

// const CardComponent = ({
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
//     progress = 0, // Default progress to 0
//     Picture,
//     bgColor,
//     badgeColor,
//     textcolor = "#626262",
//   } = data;

//   // Ensure progress is within the range [0, 1]
//   const clampedProgress = Math.max(0, Math.min(progress, 1));

//   return (
//     <TouchableOpacity
//       activeOpacity={1}
//       style={[styles.cardContainer, { backgroundColor: bgColor }]}
//       onPress={onPress}
//     >
//       <View style={[styles.contentContainer]}>
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
//             width={150}
//             height={6}
//           />
//         </View>
//       </View>
//       <View style={[styles.contentContainer2]}>
//         <Image source={circle} style={[styles.image2]} />
//         <View style={styles.image}>
//           <Image source={Picture} width={150} height={130} fill="#000" />
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   cardContainer: {
//     height: 148,
//     width: "100%",
//     borderRadius: 22,
//     flex: 1,
//     marginVertical: 10,
//     overflow: "hidden",
//     display: "flex",
//     flexDirection: "row",
//   },
//   contentContainer: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     gap: 2,
//     alignItems: "flex-start",
//     flex: 1.2,
//     marginLeft: 15,
//   },
//   contentContainer2: {
//     position: "relative",
//     flex: 1,
//     padding: 10,
//   },
//   title: {
//     fontFamily: FontFamily.H4_Regular,
//     fontSize: FontSize.itemtitle,
//     color: COLORS.black,
//     fontWeight: "600",
//     lineHeight: 22,
//     textAlign: "left",
//   },
//   description: {
//     fontFamily: FontFamily.S1_Regular,
//     fontSize: FontSize.subtitle,
//     color: COLORS.gray,
//     fontWeight: "300",
//     lineHeight: 15,
//     textAlign: "left",
//   },
//   badge: {
//     color: "#FFF",
//     paddingHorizontal: 10,
//     paddingVertical: 2,
//     textAlign: "center",
//     borderRadius: 20,
//   },
//   percentage: {
//     color: "#000",
//   },
//   image: {
//     position: "absolute",
//     right: 0,
//     bottom: 0,
//   },
//   image2: {
//     position: "absolute",
//     right: 0,
//     top: 0,
//     width: "100%",
//     maxWidth: "100%",
//     height: "105%",
//     backgroundColor: "red",
//   },
//   progressview: {
//     backgroundColor: "#FFFFFF",
//     borderWidth: 1,
//     borderRadius: 5,
//   },
// });

// export default CardComponent;

import React from "react";
import * as Progress from "react-native-progress";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import circle from "../assets/images/circle.png";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { COLORS, FontFamily, FontSize } from "../constants/theme";

const CardComponent = ({
  onPress = () => {
    console.log("clicked");
  },
  data = {},
}) => {
  const {
    title,
    description,
    items,
    percentagetext,
    progress = 0, // Default progress to 0
    Picture,
    bgColor,
    badgeColor,
    textcolor = "#626262",
  } = data;

  // Ensure progress is within the range [0, 1]
  const clampedProgress = Math.max(0, Math.min(progress, 1));

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.cardContainer, { backgroundColor: bgColor }]}
      onPress={onPress}
    >
      <View style={[styles.contentContainer]}>
        <Text style={[styles.title, { color: textcolor }]}>{title}</Text>
        <Text style={[styles.description, { color: textcolor }]}>
          {description}
        </Text>
        <Text style={[styles.badge, { backgroundColor: badgeColor }]}>
          {items}
        </Text>
        <Text style={[styles.percentage, { color: textcolor }]}>
          {percentagetext}
        </Text>
        <View style={[styles.progressview, { borderColor: badgeColor }]}>
          <Progress.Bar
            progress={clampedProgress}
            unfilledColor="white"
            borderWidth={0}
            color={badgeColor}
            animated={true}
            width={wp("45%")}
            height={hp("0.5%")}
          />
        </View>
      </View>
      <View style={[styles.contentContainer2]}>
        <Image source={circle} style={[styles.image2]} />
        <View style={styles.image}>
          <Image source={Picture} style={styles.responsiveImage} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: hp("20%"),
    width: "100%",
    borderRadius: wp("5%"),
    flex: 1,
    marginVertical: hp("1.5%"),
    overflow: "hidden",
    flexDirection: "row",
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "center",
    gap: hp("0.5%"),
    alignItems: "flex-start",
    flex: 1.2,
    marginLeft: wp("6%"),
  },
  contentContainer2: {
    position: "relative",
    flex: 1,
    padding: wp("2%"),
  },
  title: {
    fontFamily: FontFamily.H4_Regular,
    fontSize: FontSize.itemtitle,
    color: COLORS.black,
    fontWeight: "600",
    lineHeight: wp("5.5%"),
    textAlign: "left",
  },
  description: {
    fontFamily: FontFamily.S1_Regular,
    fontSize: FontSize.subtitle,
    color: COLORS.gray,
    fontWeight: "300",
    marginVertical: hp("0.2%"),
    textAlign: "left",
  },
  badge: {
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("0.5%"),
    textAlign: "center",
    borderRadius: wp("5%"),
    fontSize: FontSize.subtitle,
    fontFamily: FontFamily.subtitle,
    color: "white",
    marginVertical: hp("0.2%"),
  },
  percentage: {
    fontSize: wp("3.5%"),
    color: "#000",
  },
  progressview: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: wp("2%"),
  },
  image: {
    position: "absolute",
    right: -16,
    bottom: 0,
  },
  responsiveImage: {
    width: wp("40%"),
    height: hp("15%"),
    resizeMode: "contain",
  },
  image2: {
    position: "absolute",
    right: 0,
    top: -12,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default CardComponent;
