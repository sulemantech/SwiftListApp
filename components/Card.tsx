import * as Progress from "react-native-progress";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import { Image } from "expo-image";
import circle from "../assets/images/circle.png";
import { COLORS, FontFamily, FontSize } from "../constants/theme";

import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

interface CardData {
  title?: string;
  description?: string;
  items?: string;
  percentagetext?: string;
  progress?: number;
  Picture?: any;
  bgColor?: string;
  badgeColor?: string;
  textcolor?: string;
  percent?: string;
}

interface CardComponentProps {
  onPress?: () => void;
  data?: CardData;
}
const getResponsiveFontSize = (
  base: number,
  min: number,
  max: number,
  screenWidth: number
) => Math.max(Math.min((base / 360) * screenWidth, max), min);

const CardComponent: React.FC<CardComponentProps> = ({
  onPress,
  data = {},
}) => {
  const { width, height } = useWindowDimensions();

  const {
    title,
    description,
    items,
    percentagetext,
    progress = 0,
    Picture,
    bgColor,
    badgeColor,
    textcolor = "#626262",
    percent,
  } = data;

  // Ensure progress is within the range [0, 1]
  const clampedProgress = Math.max(0, Math.min(progress, 1));

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.cardContainer(width, height) as ViewStyle,
        { backgroundColor: bgColor },
      ]}
      onPress={() => {
        if (onPress) {
          console.log("Card Pressed:", title);
          onPress();
        }
      }}
    >
      <View style={styles.contentContainer(width, height)}>
        <Text style={[styles.title(width), { color: textcolor }]}>{title}</Text>
        <Text style={[styles.description(width, height), { color: textcolor }]}>
          {description}
        </Text>
        <Text
          style={[styles.badge(width, height), { backgroundColor: badgeColor }]}
        >
          {items}
        </Text>
        <View style={styles.percentageRow}>
          <Text style={[styles.percentage(width), { color: textcolor }]}>
            {percentagetext}
          </Text>
          {/* <Text style={[styles.percent(width), { color: textcolor }]}>
            {percent ? `${percent}%` : ""}
          </Text> */}
        </View>

        <View style={[styles.progressview(width), { borderColor: badgeColor }]}>
          <Progress.Bar
            progress={clampedProgress}
            unfilledColor="white"
            borderWidth={0}
            color={badgeColor}
            animated={true}
            width={width * 0.4167}
            height={height * 0.0049}
          />
        </View>
      </View>
      <View style={styles.contentContainer2(width)}>
        <Image source={circle} style={styles.image2} />
        {/* <View style={styles.image}>
          <Image
            source={Picture}
            style={styles.responsiveImage(width, height)}
          />
        </View> */}
        <View style={styles.image}>
          {typeof Picture === "function" ? (
            <View style={{ width: width * 0.4, height: height * 0.15 }}>
              <Picture width={width * 0.4} height={height * 0.15} />
            </View>
          ) : (
            <Image
              source={Picture}
              style={styles.responsiveImage(width, height)}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  // cardContainer: (width: number, height: number): ViewStyle => ({
  //   height: height * 0.2,
  //
  //   zIndex: 999,
  //   borderRadius: width * 0.05,
  //   flex: 1,
  //   marginVertical: height * 0.015,
  //   overflow: "hidden",
  //   flexDirection: "row",
  // }),
  cardContainer: (width: number, height: number): ViewStyle => ({
    height: height * 0.1683,
    width: width * 0.8889,
    zIndex: 999,
    borderRadius: width * 0.05,
    flex: 1,
    marginVertical: height * 0.0122,
    overflow: "hidden",
    flexDirection: "row",
    // backgroundColor: "red",
  }),
  contentContainer: (width: number, height: number): ViewStyle => ({
    flexDirection: "column",
    // justifyContent: "center",
    marginTop: height * 0.0232,
    // gap: height * 0.005,
    alignItems: "flex-start",
    marginLeft: width * 0.06,
    // backgroundColor: "gray",
    // width: width * 0.5644,
  }),
  contentContainer2: (width: number): ViewStyle => ({
    position: "relative",
    flex: 1,
    // padding: width * 0.02,
  }),
  title: (width: number): TextStyle => ({
    fontFamily: "OpenSans-SemiBold",
    fontSize: getResponsiveFontSize(18, 17, 19, width),
    color: "#4C4C4C",
    lineHeight: width * 0.055,
    textAlign: "left",
    // backgroundColor: "red",
    marginBottom: height * 0.0024,
  }),
  description: (width: number, height: number): TextStyle => ({
    fontFamily: "OpenSans-Regular",
    fontSize: getResponsiveFontSize(14, 13, 15, width),
    color: "#5C5C5C",
    textAlign: "left",
    // backgroundColor: "green",
  }),
  badge: (width: number, height: number): TextStyle => ({
    paddingHorizontal: width * 0.0222,
    height: height * 0.0268,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 12,
    fontSize: getResponsiveFontSize(13, 12, 14, width),
    fontFamily: "OpenSans-Regular",
    color: "white",
    marginBottom: height * 0.0024,
  }),
  percentage: (width: number): TextStyle => ({
    fontSize: getResponsiveFontSize(12, 11, 13, width),
    color: "#5C5C5C",
    fontFamily: "OpenSans-Regular",
    // backgroundColor: "red",
    lineHeight: 16,
    marginBottom: height * 0.0024,
  }),
  percent: (width: number): TextStyle => ({
    left: -4,
    fontSize: getResponsiveFontSize(12, 11, 13, width),
    color: "#5C5C5C",
    fontFamily: "OpenSans-SemiBold",
    // backgroundColor: "red",
    // lineHeight: 16,
    marginBottom: height * 0.0024,
  }),
  progressview: (width: number): ViewStyle => ({
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: width * 0.02,
  }),
  image: {
    position: "absolute",
    right: -16,
    bottom: 0,
  } as ViewStyle,
  responsiveImage: (width: number, height: number): ImageStyle => ({
    width: width * 0.4,
    height: height * 0.15,
    resizeMode: "contain",
  }),
  image2: {
    // position: "absolute",
    right: -5,
    top: -8,
    width: width * 0.3833,
    height: height * 0.1115,

    // height: "100%",
    // resizeMode: "contain",
  } as ImageStyle,
  percentageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.02,
  } as ViewStyle,
};

export default CardComponent;
// ===================================================================
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

// // const CardComponent: React.FC<CardComponentProps> = ({
// //   onPress = () => {
// //     console.log("clicked");
// //   },
// //   data = {},
// // }) => {
// //   const {
// //     title,
// //     description,
// //     items,
// //     percentagetext,
// //     progress = 0,
// //     Picture,
// //     bgColor,
// //     badgeColor,
// //     textcolor = "#626262",
// //   } = data;

// //   // Ensure progress is within the range [0, 1]
// //   const clampedProgress = Math.max(0, Math.min(progress, 1));

// //   return (
// //     // <TouchableOpacity
// //     //   activeOpacity={1}
// //     //   style={[styles.cardContainer, { backgroundColor: bgColor }]}
// //     //   onPress={() => onPress()}
// //     // >
// //     <TouchableOpacity
// //       activeOpacity={0.8}
// //       style={[styles.cardContainer, { backgroundColor: bgColor }]}
// //       onPress={() => {
// //         console.log("Card Pressed:", title);
// //         onPress();
// //       }}
// //     >
// //       <View style={styles.contentContainer}>
// //         <Text style={[styles.title, { color: textcolor }]}>{title}</Text>
// //         <Text style={[styles.description, { color: textcolor }]}>
// //           {description}
// //         </Text>
// //         <Text style={[styles.badge, { backgroundColor: badgeColor }]}>
// //           {items}
// //         </Text>
// //         <Text style={[styles.percentage, { color: textcolor }]}>
// //           {percentagetext}
// //         </Text>
// //         <View style={[styles.progressview, { borderColor: badgeColor }]}>
// //           <Progress.Bar
// //             progress={clampedProgress}
// //             unfilledColor="white"
// //             borderWidth={0}
// //             color={badgeColor}
// //             animated={true}
// //             width={wp("45%")}
// //             height={hp("0.5%")}
// //           />
// //         </View>
// //       </View>
// //       <View style={styles.contentContainer2}>
// //         <Image source={circle} style={styles.image2} />
// //         <View style={styles.image}>
// //           <Image source={Picture} style={styles.responsiveImage} />
// //         </View>
// //       </View>
// //     </TouchableOpacity>
// //   );
// // };

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
//
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
//
//     height: "100%",
//     resizeMode: "contain",
//   },
// });

// export default CardComponent;
