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
const { width, height } = Dimensions.get("window");


const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  const handlePasswordReset = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);

      // Alert.alert(
      //   "Success",
      //   "A password reset link has been sent to your email. Please check your inbox."
      // );
      router.push("/auth/EmailSuccess");
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
      </View>

      <View style={styles.inputbox}>
        <ForgotPassword_image
          style={styles.PlaceHolderimage}
          width={width * 0.4455}
          height={width * 0.4455}
        />
        <Text style={styles.instructions}>
          Please enter your email address. You will receive a link to create a
          new password via email.
        </Text>

        <TextInput2
          // style={{ marginBottom: 24 }}
          bgColor={"#fff"}
          label={"Email/Phone Number"}
          placeholder={"Enter your email "}
          value={email}
          onChangeText={setEmail}
          onFocus={undefined}
          onBlur={undefined}
          style={undefined}
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
    backgroundColor: "#fff",
    paddingHorizontal: "5%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: height * 0.022,
  },
  back: {
    width: 18.95,
    height: 10.26,
  },
  signInText: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -54 }],
    color: "#4C4C4C",
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold",
  },
  inputbox: {
    width: "100%",
    alignItems: "center",
    marginTop: height * 0.0293,
  },
  instructions: {
    color: "#6c6c6c",
    fontSize: 14,
    width: width * 0.8889,
    lineHeight: 20,
    fontFamily: "OpenSans-Regular",
    fontWeight: "400",
    textAlign: "center",
    opacity: 0.7,
    marginTop: height * 0.0293,
    marginBottom: height * 0.0488,
    // backgroundColor: "red",
  },
  containersign: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  ForgotPasswordButton: {
    width: width * 0.8889,
    backgroundColor: "#A9A0F0",
    borderRadius: 30,
    // paddingVertical: 16,
    height: height * 0.061,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 12,
    fontWeight: "500",
    color: "#fff",
  },
  PlaceHolderimage: {
    top: 0, // Removes any offset
  },
});
