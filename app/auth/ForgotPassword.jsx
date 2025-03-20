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
import Signin from "../../assets/images/SVG/signup.svg";
import forgotScreen_image from "../../assets/images/forgotScreen_image.png";
import { router } from "expo-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

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
      router.back(); // Navigate back after sending the reset email
    } catch (error) {
      console.error("Password reset error:", error.message);
      Alert.alert("Error", "Failed to send password reset email. Please try again.");
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
        <Image source={forgotScreen_image} style={styles.PlaceHolderimage} />
        <Text style={styles.instructions}>
          Please enter your email address. You will receive a link to reset your password.
        </Text>

        <TextInput2
          bgcolor={"#fff"}
          label={"Email"}
          placeholder={"Enter email address"}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.containersign}>
        <TouchableOpacity
          activeOpacity={10}
          onPress={handlePasswordReset} // Updated to call the function
          style={styles.signInButton}
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
    fontSize: 12,
    width: "100%",
    lineHeight: 23,
    fontFamily: "Poppins-Regular",
    fontWeight: "300",
    textAlign: "left",
    marginBottom: 10,
  },
  containersign: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  signInButton: {
    width: "100%",
    backgroundColor: "#52C2FE",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    fontWeight: "500",
    color: "#fff",
  },
  PlaceHolderimage: {
    width: 158,
    height: 150.07,
  },
});
