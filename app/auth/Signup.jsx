import React, { useState } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import TextInput2 from "../../components/Input";
import Signup1 from "../../assets/images/SVG/signup.svg";
import back from "../../assets/images/back-arrow.png";
import { Link, router } from "expo-router";
import auth from "@react-native-firebase/auth";

const { width, height } = Dimensions.get("window");

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!email || !password || !name) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await auth().createUserWithEmailAndPassword(email, password);
      await auth().currentUser.updateProfile({ displayName: name });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.fullContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity activeOpacity={1} onPress={() => router.back()}>
            <Image source={back} style={styles.back} />
          </TouchableOpacity>
          <Text style={styles.signInText}>Sign Up</Text>
        </View>

        <View style={styles.inputbox}>
          <Signup1 width={158} height={150} style={styles.PlaceHolderimage} />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TextInput2
            style={{ marginBottom: height * 0.0293 }}
            bgcolor="#fff"
            label="Name"
            placeholder="Enter Username"
            value={name}
            onChangeText={setName}
          />
          <TextInput2
            style={{ marginBottom: height * 0.0293 }}
            bgcolor="#fff"
            label="Email/Phone Number"
            placeholder="Enter email address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput2
            style={{ marginBottom: height * 0.0293 }}
            bgcolor="#fff"
            label="Password"
            placeholder="Enter Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput2
            style={{ marginBottom: height * 0.0293 }}
            bgcolor="#fff"
            label="Confirm Password"
            placeholder="Re-enter Password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <View style={styles.containersign}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.signInButton}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row2}>
          <Text style={styles.donthaveanaccount}>Already have an account?</Text>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => router.push("/auth/Login")}
          >
            <Text style={styles.SignIntext}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: "5.5%",
    // paddingBottom: 30,
    paddingBottom: height * 0.0366,
    backgroundColor: "#fff",
    // backgroundColor: "red",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: height * 0.0244,
    // backgroundColor: "red",
    // top:-10,
  },
  back: {
    width: 18.95,
    height: height * 0.0133,
  },
  signInText: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -30 }],
    color: "#5C5C5C",
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold",
  },
  inputbox: {
    width: "100%",
    alignItems: "center",
    marginTop: height * 0.0293,
    // backgroundColor: "red",
  },
  PlaceHolderimage: {
    width: 158,
    height: 150.07,
    // marginBottom: 24,
    marginBottom: height * 0.0293,

    // backgroundColor: "red",
  },
  containersign: {
    width: "100%",
    // height: 50,
    height: height * 0.061,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    // backgroundColor: "red",
  },
  signInButton: {
    width: "100%",
    // height: 50,
    height: height * (50 / 820),
    width: width * (320 / 360),
    backgroundColor: "#A9A0F0",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 13,
    lineHeight: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  row2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.0244,
  },
  donthaveanaccount: {
    fontSize: 14,
    fontFamily: "OpenSans-Regular",
    color: "#5C5C5C",
    opacity: 0.7,
  },
  SignIntext: {
    fontSize: 14,
    fontFamily: "OpenSans-Regular",
    color: "#9386F7",
    textDecorationLine: "underline",
    opacity: 0.7,
  },
});
