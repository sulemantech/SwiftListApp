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

import {
  Text,
  View,
  useWindowDimensions,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";

const OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <View style={styles.image}>
        <Image
          source={item.image}
          style={{ width: 280, height: 265.95, resizeMode: "contain" }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        {/* <Text style={styles.divider}> </Text> */}
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  image: {
    transform: [{ scale: 0.95 }],
    justifyContent: "center",
  },
  textContainer: {
    marginTop: 40,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: "OpenSans-SemiBold", // Ensure this font is loaded in Expo
    fontWeight: "600",
    color: "#373737",
    marginBottom: 10,
    textAlign: "center",
  },
  // divider: {
  //   width: 55,
  //   height: 2,
  //   borderBottomWidth: 2,
  //   borderColor: "#81CAED",
  // },
  description: {
    fontFamily: "OpenSans-Regular", // Ensure this font is loaded in Expo
    color: "#6c6c6c",
    fontWeight: "300",
    fontSize: 12,
    marginTop: 10,
    textAlign: "center",
    lineHeight: 23,
    fontWeight:400,
    paddingHorizontal: 24,
  },
});

export default OnboardingItem;
