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
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import auth from "@react-native-firebase/auth";
import { ProductContext } from "../../Context/CardContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import messaging from '@react-native-firebase/messaging'

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

  //   const onFacebookButtonPress = async () => {
  //     try {
  //       setLoading(true);

  //       // Attempt to log in with Facebook
  //       const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  //       if (result.isCancelled) {
  //         return;
  //       }

  //       // Get the access token
  //       const data = await AccessToken.getCurrentAccessToken();
  //       if (!data) {
  //         return;
  //       }

  //       // Use the Facebook access token to authenticate with Firebase
  //       const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  //       await auth().signInWithCredential(facebookCredential);

  //       const user = auth().currentUser;

  //       let profilePicture = 'https://via.placeholder.com/150'; // Default profile picture

  //       // Manually fetch the profile picture
  //       const response = await fetch(
  //         `https://graph.facebook.com/me/picture?type=large&redirect=false&access_token=${data.accessToken}`
  //       );
  //       const profileData = await response.json();
  //       if (profileData?.data?.url) {
  //         profilePicture = profileData.data.url;
  //       }

  //       if (user) {
  //         const username = user.displayName || 'User';
  //         const email = user.email || 'Not Available';

  //         setUserDetails(prevDetails => ({
  //           ...prevDetails,
  //           UserName: username || prevDetails.UserName,
  //           UserEmail: email || prevDetails.UserEmail,
  //           UserProfilePicture: profilePicture || prevDetails.UserProfilePicture,
  //         }));
  //       }

  //       navigation.replace(SCREENS.Dashbored);
  //     } catch (error) {
  //       console.error('Facebook Sign-in error: ', error);
  //       Alert.alert('Error', 'Facebook Sign-In failed. Please try again.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

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
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={1} onPress={() => router.back()}>
          <Image source={back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.signInText}>Sign In</Text>
        <Text style={styles.signInText}></Text>
      </View>
      <View style={styles.inputbox}>
        {/* <Image source={Signin} style={styles.PlaceHolderimage} /> */}
        <Signin width={158} height={150} />

        <TextInput2
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
          //  onPress={onFacebookButtonPress}
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
      </View>

      <View style={styles.row2}>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Don't Have an Account?</Text>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => router.push("/auth/Signup")}
        >
          <Text style={styles.forgotPassword}>Sign Up</Text>
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
    paddingTop: 70,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: "5.5%",
    fontFamily: "Poppins-Regular",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    padding: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "10%",
  },
  back: {
    width: 25,
    height: 20,
  },
  signInText: {
    color: "#4C4C4C",
    opacity: 0.8,
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "OpenSans-Bold",

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
    marginTop: 10,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "54%",
    marginTop: 10,
    // backgroundColor:"red"
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Light",
    color: "#8c8c8c",
    marginLeft: 2,
    // backgroundColor:"red"
  },
  forgotPassword: {
    color: "#9386F7",
    fontFamily: "Poppins-Light",
    fontSize: 12,
    // backgroundColor:"red"
  },
  containersocial: {
    marginTop: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  socialouterview: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
    // width: "100%",
    width: "100%",
    height: 50,
    backgroundColor: "#A9A0F0",
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    flexDirection: "row", // Ensures horizontal alignment of the content
  },

  buttonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  containerline: {
    alignItems: "center",
    marginVertical: 20,
    fontFamily: "Poppins-Regular",
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
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
    fontWeight: "400",
    fontFamily: "Open Sans",
  },
  social: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#A9A0F0",
    borderWidth: 1,
    borderRadius: 30,
    flexDirection: "row",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  innersocial: {
    flexDirection: "row",
    alignItems: "center",
  },
  socialButtonText: {
    marginLeft: 10,
    fontFamily: "Poppins-Regular",
    color: "#8C8C8C",
    fontSize: 12,
  },
  errorText: {
    color: "red",
    width: "100%",
    fontSize: 12,
    paddingLeft: 16,
    marginTop: -8,
    textAlign: "left",
    fontFamily: "Poppins-Medium",
  },
});
