import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import auth from "@react-native-firebase/auth";
import TextInput2 from "../../components/Input";
import back from "../../assets/images/back-arrow.png";
import ForgotPassword_image from "../../assets/images/ForgotPassword.svg";
import { router } from "expo-router";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const handlePasswordReset = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      console.log("Reset email sent to:", email);

      Alert.alert(
        "Success",
        "A password reset link has been sent to your email. Please check your inbox."
      );
    } catch (error: unknown) {
      const err = error as { message: string };
      console.error("Password reset error:", err.message);
      Alert.alert(
        "Error",
        "Failed to send password reset email. Please try again."
      );
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={1} onPress={() => router.back()}>
          <Image source={back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.signInText}>Forgot Password</Text>
        <Text style={styles.signInText}></Text>
      </View>

      <View style={styles.inputbox}>
        <ForgotPassword_image
          style={styles.PlaceHolderimage}
          width={screenWidth * 0.4455}
          height={screenWidth * 0.4455}
        />
        <Text style={styles.instructions}>
          Please enter your email address. You will receive a link to create a
          new password via email.
        </Text>

        <TextInput2
          bgColor={"#fff"}
          label={"Email"}
          placeholder={"Enter email address"}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.containersign}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handlePasswordReset}
          style={styles.ForgotPasswordButton}
        >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    paddingHorizontal: "5%",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    paddingVertical: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  back: {
    width: 25,
    height: 20,
  },
  signInText: {
    color: "#0c0c0c",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "OpenSans-Bold",
  },
  inputbox: {
    width: "100%",
    marginTop: 50,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  instructions: {
    color: "#6c6c6c",
    fontSize: 14,
    width: screenWidth * 0.8889,
    lineHeight: 20,
    fontFamily: "Poppins-Regular",
    fontWeight: "400",
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 20,
    marginTop: 10,
  },
  containersign: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ForgotPasswordButton: {
    width: screenWidth * 0.8889,
    backgroundColor: "#A9A0F0",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  buttonText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    fontWeight: "500",
    color: "#fff",
  },
  PlaceHolderimage: {
    marginTop: 10,
  },
});

// izaz changes
// import React, { useState } from "react";
// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   Alert,
// } from "react-native";
// import auth from "@react-native-firebase/auth";
// import TextInput2 from "../../components/Input";
// import back from "../../assets/images/back-arrow.png";
// import Signin from "../../assets/images/SVG/signup.svg";
// import forgotScreen_image from "../../assets/images/forgotScreen_image.png";
// import { router } from "expo-router";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");

//   const handlePasswordReset = async () => {
//     if (!email.trim()) {
//       Alert.alert("Error", "Please enter a valid email address.");
//       return;
//     }

//     try {
//       await auth().sendPasswordResetEmail(email);
//       console.log("Reset email sent to:", email);

//       Alert.alert(
//         "Success",
//         "A password reset link has been sent to your email. Please check your inbox."
//       );
//       // router.push('./auth/EmailSuccess');
//       // router.back();
//     } catch (error: any) {
//       console.error("Password reset error:", error.message);
//       Alert.alert(
//         "Error",
//         "Failed to send password reset email. Please try again."
//       );
//     }
//   };

//   return (
//     <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
//       <View style={styles.headerContainer}>
//         <TouchableOpacity activeOpacity={1} onPress={() => router.back()}>
//           <Image source={back} style={styles.back} />
//         </TouchableOpacity>
//         <Text style={styles.signInText}>Forgot Password</Text>
//         <Text style={styles.signInText}></Text>
//       </View>

//       <View style={styles.inputbox}>
//         <Image source={forgotScreen_image} style={styles.PlaceHolderimage} />
//         <Text style={styles.instructions}>
//           Please enter your email address. You will receive a link to reset your
//           password.
//         </Text>

//         <TextInput2
//           bgColor={"#fff"}
//           label={"Email"}
//           placeholder={"Enter email address"}
//           value={email}
//           onChangeText={setEmail}
//         />
//       </View>

//       <View style={styles.containersign}>
//         <TouchableOpacity
//           activeOpacity={10}
//           onPress={handlePasswordReset} // Updated to call the function
//           style={styles.signInButton}
//         >
//           <Text style={styles.buttonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default ForgotPassword;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//     backgroundColor: "#fff",
//     paddingHorizontal: "5%",
//   },
//   headerContainer: {
//     position: "absolute",
//     top: 0,
//     paddingVertical: 7,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     width: "100%",
//   },
//   back: {
//     width: 25,
//     height: 20,
//   },
//   signInText: {
//     color: "#0c0c0c",
//     fontSize: 20,
//     fontWeight: "600",
//     fontFamily: "OpenSans-Bold",
//   },
//   inputbox: {
//     width: "100%",
//     marginTop: 50,
//     display: "flex",
//     alignItems: "center",
//     gap: 10,
//   },
//   instructions: {
//     color: "#6c6c6c",
//     fontSize: 12,
//     width: "100%",
//     lineHeight: 23,
//     fontFamily: "Poppins-Regular",
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
//     fontFamily: "Poppins-Regular",
//     fontSize: 12,
//     fontWeight: "500",
//     color: "#fff",
//   },
//   PlaceHolderimage: {
//     width: 158,
//     height: 150.07,
//   },
// });

// const handlePasswordReset = async () => {
//   if (!email.trim()) {
//     setModalMessage('Please enter a valid email address.');
//     setModalVisible(true);
//     return;
//   }

//   try {
//     await auth().sendPasswordResetEmail(email);
//     setModalMessage('A password reset link has been sent to your email. Please check your inbox.');
//     setModalVisible(true);
//     navigation.navigate(SCREENS.EmailSuccess); // Navigate to success screen
//   } catch (error) {
//     console.error('Password reset error:', error.message);
//     setModalMessage('Failed to send password reset email. Please try again.');
//     setModalVisible(true);
//   }
// };
