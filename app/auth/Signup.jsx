import React, { useState } from "react";
import { Image } from "expo-image";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TextInput2 from "../../components/Input";
// import Signin from '../../assets/images/SVG/signup.svg';
import Signup1 from "../../assets/images/SVG/signup.svg";
import back from "../../assets/images/back-arrow.png";
import { Link, router } from "expo-router";
import auth from "@react-native-firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await auth().createUserWithEmailAndPassword(email, password);
      await auth().currentUser.updateProfile({ displayName: name });
      //   navigation.navigate(SCREENS.Dashbored);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={1} onPress={() => router.back()}>
          <Image source={back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.signInText}>Sign Up</Text>
        <Text style={styles.signInText}></Text>
      </View>

      <View style={styles.inputbox}>
        {/* <Signin /> */}
        {/* <Image source={Signin} style={styles.PlaceHolderimage} /> */}
        <Signup1 width={158} height={150} />

        {error && <Text style={styles.errorText}>{error}</Text>}
        <TextInput2
          bgcolor={"#fff"}
          label={"Name"}
          placeholder={"Enter Username"}
          value={name}
          onChangeText={setName}
        />
        <TextInput2
          bgcolor={"#fff"}
          label={"Email/Phone Number"}
          placeholder={"Enter email address"}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput2
          bgcolor={"#fff"}
          label={"Password"}
          placeholder={"Enter Password"}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput2
          bgcolor={"#fff"}
          label={"Confirm Password"}
          placeholder={"Re-enter Password"}
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

      {/* <View style={styles.row2}>
        <Text style={styles.checkboxLabel}>Already Have an Account?</Text>
        <Link href="/auth/Login">
          <Text style={[styles.forgotPassword, { marginLeft: 10 }]}>
            Sign In
          </Text>
        </Link>
      </View>
    </ScrollView>
  );
}; */}
      <View style={styles.row2}>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Already have an account?</Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => router.push("/auth/Login")}
        >
          <Text style={styles.forgotPassword}>Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )} */}
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 35,
    backgroundColor: "#fff",
    paddingHorizontal: "5%",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    top: 0,
  },
  back: {
    width: 18.95,
    height: 10.26,
  },
  signInText: {
    color: "#4C4C4C",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 16,
    // marginBottom: 10,

    fontFamily: "OpenSans-Bold",
  },
  inputbox: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: 20,
    marginTop: 40,
  },
  PlaceHolderimage: {
    width: 158,
    height: 150.07,
    gap: 0,
  },
  signinImage: {
    marginVertical: 30,
    alignSelf: "center",
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: "auto",
  },
  checkboxLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Light",
    color: "#8c8c8c",
  },
  forgotPassword: {
    color: "#A9A0F0",
    fontFamily: "Poppins-Light",
    fontSize: 12,
    marginLeft: 3,
    // backgroundColor: "red",
    textDecorationLine: "underline",
  },
  containersign: {
    marginTop: 10,
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  signInButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#A9A0F0",
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
    color: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});
