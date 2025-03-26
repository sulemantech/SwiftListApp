import React, { useContext, useEffect, useState } from "react";
import { Image } from "expo-image";
import { Link, router, useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import TextInput2 from "../../components/Input1";
import Checkbox from "expo-checkbox";
import Signin from "../../assets/images/SVG/signin.svg";
import facebook from "../../assets/images/social-media-facebook.png";
import google from "../../assets/images/social-media-google.png";
import back from "../../assets/images/back-arrow.png";
// import SCREENS from '..';
// import useFirebaseMessaging from '../components/UseFirebaseMessaging';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import auth from "@react-native-firebase/auth";
import { ProductContext } from "../../Context/CardContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import messaging from '@react-native-firebase/messaging'
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const LoginScreen = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const routerr = useRouter();
  const { setUserDetails, isAuthenticated } = useContext(ProductContext);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "43816911899-r0905121ph3ppu4p6feodkg0ieq4tkj5.apps.googleusercontent.com",
    });
  }, []);

  //   const { getDeviceToken } = useFirebaseMessaging();

  //   useEffect(() => {
  //     getDeviceToken(); // Fetch the FCM token on app start
  //   }, [getDeviceToken]);

  const onFacebookButtonPress = async () => {
    try {
      setLoading(true);
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);

      if (result.isCancelled) {
        console.log("Facebook login cancelled");
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error("Something went wrong obtaining access token");
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken
      );
      await auth().signInWithCredential(facebookCredential);

      const user = auth().currentUser;

      if (user) {
        const username = user.displayName || "User";
        const profilePicture =
          user.photoURL || "https://via.placeholder.com/150";

        setUserDetails((prevDetails) => ({
          ...prevDetails,
          UserName: username || prevDetails.UserName,
          UserProfilePicture: profilePicture || prevDetails.UserProfilePicture,
        }));
      }

      routerr.replace("/(Dashboard)/Home");
    } catch (error) {
      console.error("Facebook Sign-in error: ", error);
      Alert.alert("Error", "Facebook Sign-In failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  async function onGoogleButtonPress() {
    try {
      setLoading(true);
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const signInResult = await GoogleSignin.signIn();
      const idToken = signInResult?.data?.idToken;
      const accessToken = signInResult?.data?.accessToken;
      if (!idToken) {
        throw new Error("No ID token found");
      }
      const googleCredential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );
      await auth().signInWithCredential(googleCredential);
      await AsyncStorage.removeItem("user");
      const user = auth().currentUser;
      if (user) {
        const username = user.displayName || "User";
        const profilePicture =
          user.photoURL || "https://via.placeholder.com/150";

        await AsyncStorage.setItem(
          "user",
          JSON.stringify({ username, profilePicture })
        );

        setUserDetails((prevDetails) => ({
          ...prevDetails,
          UserName: username || prevDetails.UserName,
          UserProfilePicture: profilePicture || prevDetails.UserProfilePicture,
        }));
      }

      routerr.replace("/(Dashboard)/Home");
    } catch (error) {
      console.error("Google Sign-in error: ", error);
      Alert.alert("Error", "Google Sign-In failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleSignIn = async () => {
    // Reset error messages
    setEmailError("");
    setPasswordError("");

    if (email === "") {
      setEmailError("Please fill in the email field.");
    }
    if (password === "") {
      setPasswordError("Please fill in the password field.");
    }
    if (email === "" || password === "") {
      return;
    }

    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      const user = auth().currentUser;
      if (user) {
        const username = user.displayName || "User";
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          UserName: username || prevDetails.UserName,
        }));
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
    setLoading(false);
  };

  const onSignInButtonPress = () => {
    handleSignIn();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      pointerEvents={loading ? "none" : "auto"}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar
        animated={true}
        backgroundColor="#FFF"
        barStyle={"dark-content"}
      />
      {/* <Image source={Signin} style={styles.PlaceHolderimage} /> */}
      <View style={styles.headerContainer}>
        <Text style={styles.signInTitle}>{"Sign In"}</Text>
      </View>

      <View style={styles.ImageContainer}>
        <Signin width={158} height={150} style={styles.signinImage} />
      </View>
      {/* <View style={styles.headerContainer}> */}
      {/* <TouchableOpacity activeOpacity={1} onPress={() => router.back()}>
          <Image source={back} style={styles.back} />
        </TouchableOpacity> */}

      {/* <Text style={styles.signInText}></Text> */}
      {/* </View> */}
      <View style={styles.inputbox}>
        <TextInput2
          style={{ marginBottom: 24 }}
          bgcolor={"#fff"}
          label={"Email/Phone Number"}
          placeholder={"Enter email address"}
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setEmailError(""); // Clear error as user types
          }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput2
          bgcolor={"#fff"}
          label={"Password"}
          placeholder={"Enter Password"}
          secureTextEntry={true}
          value={password}
          onChangeText={(value) => {
            setPassword(value);
            setPasswordError(""); // Clear error as user types
          }}
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>

      <View style={styles.row}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            color={"#6C6C6C"}
            value={isChecked}
            onValueChange={setIsChecked}
            tintColors={{ true: "#52C2FE", false: "#52C2FE" }}
          />
          <Text style={[styles.checkboxLabel, { left: 10 }]}>
            Keep me signed in
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => routerr.push("/auth/ForgotPassword")}
        >
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containersign}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.signInButton}
          onPress={onSignInButtonPress}
          disabled={loading}
        >
          {!loading && <Text style={styles.buttonText}>Sign In</Text>}
          {loading && (
            <View>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.containerline}>
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>Or sign in with</Text>
          <View style={styles.line} />
        </View>
      </View>

      <View style={styles.socialouterview}>
        <TouchableOpacity
          onPress={() => onGoogleButtonPress().then(() => {})}
          disabled={loading}
          style={styles.containersocial}
        >
          <View style={styles.social}>
            <View style={styles.innersocial}>
              <Image
                source={google}
                style={[styles.socialIcon, { left: -7 }]}
              />
              <Text style={[styles.socialButtonText, { left: -7 }]}>
                Continue with Google
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onFacebookButtonPress}
          disabled={loading}
          style={styles.containersocial}
        >
          <View style={styles.social}>
            <View style={styles.innersocial}>
              <Image source={facebook} style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>
                Continue with Facebook
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.row2}>
        <View style={styles.checkboxContainer}>
          <Text style={styles.donthaveanaccount}>Don’t have an account?</Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => router.push("/auth/Signup")}
        >
          <Text style={styles.Signuptext}>Sign Up</Text>
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

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: "5.5%",
    fontFamily: "OpenSans-Regular",
    // backgroundColor: "red",
  },
  // headerContainer: {
  //   position: "absolute",
  //   top: 0,
  //   padding: 7,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   width: "100%",
  //   height: "10%",
  // },
  back: {
    width: 25,
    height: 20,
  },
  signInText: {
    selfAlign: "center",
    marginBottom: 25,
    color: "#4C4C4C",
    opacity: 0.8,
    fontSize: 26,
    fontWeight: "600",
    fontFamily: "OpenSans-italic",

    // backgroundColor:"red"
  },
  inputbox: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexDirection: "column",
    width: "100%",
  },
  PlaceHolderimage: {
    width: 158,
    height: 150.07,
  },
  signinImage: {
    marginBottom: 10,
    marginHorizontal: "auto",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 11,
    marginBottom: 24,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "47.5%",
    marginTop: 11,
    // backgroundColor:"red"
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
  },
  checkboxLabel: {
    fontSize: 12,
    fontFamily: "OpenSans-Regular",
    color: "#5C5C5C",
    marginLeft: 2,
    // backgroundColor:"red"
  },
  forgotPassword: {
    color: "#9386F7",
    fontFamily: "OpenSans-Regular",
    fontSize: 12,
    marginLeft: 3,
    // backgroundColor: "red",
    textDecorationLine: "underline",
  },
  containersocial: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "green",
  },
  socialouterview: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "green",
    // height: 10,
    marginTop: 0, // Remove the top margin
    paddingTop: 0, // Ensure no extra padding
  },
  // containersign: {
  //   marginTop: 10,
  //   width: "100%",
  //   height: 50,
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  containersign: {
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0, // Set to 0
  },

  // signInButton: {
  //   // width: "100%",
  //   width: "100%",
  //   height: 50,
  //   backgroundColor: "#A9A0F0",
  //   borderRadius: 30,
  //   paddingVertical: 12,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginTop: 10,
  //   flexDirection: "row", // Ensures horizontal alignment of the content
  // },
  signInButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#A9A0F0",
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 0, // Set to 0 or adjust as needed
  },

  buttonText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 13,
    lineHeight: 16,
    textAlign: "center",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  // containerline: {
  //   alignItems: "center",
  //   marginVertical: 20,
  //   fontFamily: "OpenSans-Regular",
  //   // color: "red",
  //   // backgroundColor: "red",
  // },
  containerline: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 0, // Remove any vertical spacing
    paddingVertical: 0, // Ensure no extra padding
  },

  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginTop: 24,
    marginBottom: 14,
    // backgroundColor: "red",
    // marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#5C5C5C",
    opacity: 0.7,
  },
  dividerText: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    color: "#5C5C5C",
    opacity: 0.7,
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
  },
  social: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#A9A0F0",
    borderWidth: 1,
    borderRadius: 30,
    flexDirection: "row",
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    // backgroundColor: "red",
  },
  innersocial: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
  },
  socialButtonText: {
    marginLeft: 10,
    fontFamily: "OpenSans-SemiBold",
    color: "#5C5C5C",
    fontSize: 13,
  },
  errorText: {
    color: "red",
    width: "100%",
    fontSize: 12,
    paddingLeft: 16,
    marginTop: -8,
    textAlign: "left",
    fontFamily: "OpenSans-Medium",
  },
  ImageContainer: {
    marginTop: 20,
    alignItems: "center", // Center both elements horizontally
    marginBottom: 20, // Add spacing between Sign In text and form fields
    // width:screenWidth * 0.4389,
    // height:screenHeight * 0.1829,
  },
  // signInTitle: {
  //   fontSize: 16, // Adjust font size as needed
  //   fontFamily: "OpenSans-SemiBold",
  //   color: "#5C5C5C",
  //   marginBottom: 24, // Creates spacing between text and SVG
  // },
  signInTitle: {
    fontSize: 16, // Adjust size as needed
    fontWeight: "OpenSans-SemiBold",
    color: "#5C5C5C", // Ensure it's not the same as background
    textAlign: "center",
    // letter spacing
    letterSpacing: 0,
    // lineHeight: 16,
  },
  signinImage: {
    marginTop: 10, // Move the SVG a little down
  },
  // headerContainer: {
  //   backgroundColor: "red",
  //   width:screenWidth * 0.275,
  //   height:screenHeight * 0.0268,
  // },
  headerContainer: {
    // backgroundColor: "red", // Temporary for debugging
    marginTop: 20,
  },
  donthaveanaccount: {
    fontSize: 14,
    fontFamily: "OpenSans-Regular",
    color: "#5C5C5C",
    // marginLeft: 2,
    opacity: 0.7,
    // backgroundColor: "red",
    marginTop: 13,
  },
  Signuptext: {
    opacity: 0.7,
    // backgroundColor: "red",
    marginTop: 13,
    color: "#9386F7",
    fontFamily: "OpenSans-Regular",
    fontSize: 14,
    // marginLeft: 3,
    // backgroundColor: "red",
    textDecorationLine: "underline",
  },
});
