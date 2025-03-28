// import { Text, View, useWindowDimensions, StyleSheet } from "react-native";
// import React from "react";

// const OnboardingItem = ({ item }) => {
//   const { width } = useWindowDimensions();

//   return (
//     <View style={[styles.container, { width }]}>
//       <View style={styles.image}>
//         <item.image width={200} height={200} />
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.divider}> </Text>
//         <Text style={styles.description}>{item.description}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//   },
//   image: {
//     transform: [{ scale: 0.95 }],
//     justifyContent: "center",
//   },
//   textContainer: {
//     marginTop: 40,
//     justifyContent: "flex-start",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 18,
//     fontFamily: "OpenSans-SemiBold", // Make sure this font is loaded in Expo
//     fontWeight: "600",
//     color: "#373737",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   divider: {
//     width: 55,
//     height: 2,
//     borderBottomWidth: 2,
//     borderColor: "#81CAED",
//   },
//   description: {
//     fontFamily: "OpenSans-Regular", // Ensure this font is loaded in Expo
//     color: "#6c6c6c",
//     fontWeight: "300",
//     fontSize: 12,
//     marginTop: 10,
//     textAlign: "center",
//     lineHeight: 23,
//     paddingHorizontal: 24,
//   },
// });

// export default OnboardingItem;

// import {
//   Text,
//   View,
//   useWindowDimensions,
//   StyleSheet,
//   Image,
// } from "react-native";
// import React from "react";

// const OnboardingItem = ({ item }) => {
//   const { width } = useWindowDimensions();

//   return (
//     <View style={[styles.container, { width }]}>
//       <View style={styles.image}>
//         <Image
//           source={item.image}
//           style={{ width: 280, height: 265.95, resizeMode: "contain" }}
//         />
//       </View>
//       <View style={styles.textContainer}>
//         <Text style={styles.title}>{item.title}</Text>
//         {/* <Text style={styles.divider}> </Text> */}
//         <Text style={styles.description}>{item.description}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//   },
//   image: {
//     transform: [{ scale: 0.95 }],
//     justifyContent: "center",
//   },
//   textContainer: {
//     marginTop: 40,
//     justifyContent: "flex-start",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 18,
//     fontFamily: "OpenSans-SemiBold", // Ensure this font is loaded in Expo
//     fontWeight: "600",
//     color: "#373737",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   // divider: {
//   //   width: 55,
//   //   height: 2,
//   //   borderBottomWidth: 2,
//   //   borderColor: "#81CAED",
//   // },
//   description: {
//     fontFamily: "OpenSans-Regular", // Ensure this font is loaded in Expo
//     color: "#6c6c6c",
//     fontWeight: "300",
//     fontSize: 12,
//     marginTop: 10,
//     marginBottom: 34,
//     textAlign: "center",
//     lineHeight: 23,
//     fontWeight:400,
//     paddingHorizontal: 24,
//   },
// });

// export default OnboardingItem;

import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";

const { width, height } = Dimensions.get("window");

const OnboardingItem = ({ item }) => {
  return (
    <View style={[styles.container, { width }]}>
      <View style={[styles.imageContainer, { height: height * 0.313 }]}>
        <Image
          source={item.image}
          style={{
            width: width * 0.744,
            // height: "100%",
            height: height * 0.313,
            resizeMode: "contain",
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    // backgroundColor: "green",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  textContainer: {
    flex: 1, // Allow textContainer to take up available space
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: width * 0.01, // Responsive horizontal padding
  },
  title: {
    fontSize: 19.5,
    fontFamily: "OpenSans-SemiBold",
    color: "#4C4C4C",
    marginBottom: (25 / 800) * height,
    textAlign: "center",
  },
  description: {
    fontFamily: "OpenSans-Regular",
    color: "#5C5C5C",
    fontSize: 12,
    textAlign: "center",
    // backgroundColor: "red",
    lineHeight: 20, // Adjust line height for readability
    // marginHorizontal: width * 0.02, // Responsive horizontal padding

  },
});
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       width: width,
//       alignItems: "center",
//       justifyContent: "center",
//       paddingHorizontal: 16,
//       // backgroundColor: "green",
//     },
//   textContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     width: width * 0.8, // Ensure both title & description have the same width
//   },
//   title: {
//     fontSize: 18,
//     fontFamily: "OpenSans-SemiBold",
//     fontWeight: "600",
//     color: "#4C4C4C",
//     marginBottom: (25 / 800) * height,
//     textAlign: "center",
//     width: "100%", // Ensure it takes full width of textContainer
//   },
//   description: {
//     fontFamily: "OpenSans-Regular",
//     color: "#5C5C5C",
//     fontSize: 12,
//     textAlign: "center",
//     lineHeight: 20, // Adjust line height for readability
//     width: "100%", // Same width as title
//   },
// });

export default OnboardingItem;
