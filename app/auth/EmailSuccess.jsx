// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React from 'react';
// import back from "../../assets/images/back-arrow.png";
// import Signin from '../../assets/images/SVG/emailsent.svg';
// import SCREENS from '..';

// const EmailSuccess = () => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <TouchableOpacity activeOpacity={1}
//         //  onPress={() => navigation.goBack()}
//          >
//           <Image source={back} style={styles.back}
//            />
//         </TouchableOpacity>
//         <Text style={styles.signInText}> </Text>
//       </View>

//       <View style={styles.inputbox}>
//         {/* <Image source={Signin} style={styles.signinImage} /> */}
//         <Signin />
//         <Text style={styles.instructions}>
//           Email has been sent to your email address. Please check your inbox for email and follow instructions.
//         </Text>
//       </View>

//       <View style={styles.containersign}>
//         <TouchableOpacity
//           activeOpacity={1}
//           style={styles.signInButton}
//           // onPress={() => navigation.navigate(SCREENS.login)}
//           // onPress={() => navigation.navigate(SCREENS.ResetPassword)}
//           >
//           <Text style={styles.buttonText}>Continue</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default EmailSuccess;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 70,
//     alignItems: "center",
//     backgroundColor: "#fff",
//     paddingHorizontal: "5%",
//   },
//   headerContainer: {
//     position: "absolute",
//     top: 0,
//     padding: 7,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "100%",
//     height: "10%",
//   },
//   back: {
//     width: 18.95,
//     height: 10.26,
//   },
//   signInText: {
//     color: "#0c0c0c",
//     fontSize: 20,
//     fontWeight: "600",
//     fontFamily: "OpenSans-Bold",
//   },
//   inputbox: {
//     width: "100%",
//     marginTop: 7,
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 10,
//   },
//   signinImage: {
//     marginBottom: 10,
//   },
//   instructions: {
//     color: "#6c6c6c",
//     fontSize: 12,
//     lineHeight: 23,
//     width: "100%",
//     fontFamily: "OpenSans-Regular",
//     fontWeight: "300",
//     textAlign: "left",
//     marginBottom: 10,
//   },
//   containersign: {
//     marginTop: 10,
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   signInButton: {
//     width: "100%",
//     backgroundColor: "#52C2FE",
//     borderRadius: 30,
//     paddingVertical: 16,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 10,
//   },
//   buttonText: {
//     fontFamily: "OpenSans-Regular",
//     fontSize: 12,
//     fontWeight: "500",
//     color: "#fff",
//   },
// });

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import back from "../../assets/images/back-arrow.png";
import Signin from "../../assets/images/SVG/emailsent.svg";
import { Dimensions } from "react-native";
import { router } from "expo-router";
const screenWidth = Dimensions.get("window").width;

const screenHeight = Dimensions.get("window").height;

const EmailSuccess = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={1} onPress={() => router.back()}>
          <Image source={back} style={styles.back} />
        </TouchableOpacity>
      </View>
      <View style={styles.inputbox}>
        <Signin style={styles.signinImage} />
        <Text style={styles.instructions}>
          Email has been sent to your email address. Please check your inbox for
          email and follow instructions.
        </Text>
        <Text style={styles.warning}>
          The link will automatically expire after 5 minutes.
        </Text>
      </View>
    </View>
  );
};

export default EmailSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center", // Centers everything vertically
    // alignItems: "center", // Centers horizontally
    backgroundColor: "#fff",
  },
  headerContainer: {
    position: "absolute",
    // top: 20, // Keeps back button at the top
    // left: 10,
  },
  back: {
    width: 18.95,
    height: 10.26,
    marginTop: 18,
    marginLeft: 16,
  },
  inputbox: {
    marginTop: 65,
    width: "100%",
    alignItems: "center",
  },
  signinImage: {
    marginTop: 0,
    marginBottom: 24, // Ensures no gap above image
  },
  instructions: {
    color: "#4C4C4C",
    fontSize: 14,
    width: screenWidth * 0.7778,
    lineHeight: 20,
    fontFamily: "OpenSans-Regular",
    fontWeight: "400",
    textAlign: "center",
    opacity: 0.7,
    lineHeight: screenHeight * 0.0317,
    // lineHeight: screenHeight * 0.0417,

    paragraphSpacing: 10,
  },
  containersign: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  warning: {
    color: "#B20B1F",
    fontSize: 13,
    width: screenWidth * 0.4556,

    lineHeight: 20,
    fontFamily: "OpenSans-SemiBold",
    fontWeight: "400",
    lineHeight: screenHeight * 0.0251,
    // lineHeight: screenHeight * 0.0361,

    textAlign: "center",
    opacity: 0.7,
    marginTop: 361,
  },
});
