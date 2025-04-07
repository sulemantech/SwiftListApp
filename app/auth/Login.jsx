// Login.jsx (fully responsive with updated styling and working Google Sign-In)
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { router, useRouter } from "expo-router";
import TextInput2 from "../../components/Input1";
import Checkbox from "expo-checkbox";
import Signin from "../../assets/images/SVG/signin.svg";
import facebook from "../../assets/images/social-media-facebook.png";
import google from "../../assets/images/social-media-google.png";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import auth from "@react-native-firebase/auth";
import { ProductContext } from "../../Context/CardContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

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
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />

      <View style={styles.headerContainer}>
        <Text style={styles.signInTitle}>Sign In</Text>
      </View>

      <View style={styles.ImageContainer}>
        <Signin width={158} height={150} style={styles.signinImage} />
      </View>

      <View style={styles.inputbox}>
        <TextInput2
          style={{ marginBottom: height * 0.0293 }}
          bgcolor="#fff"
          label="Email/Phone Number"
          placeholder="Enter email address"
          value={email}
          onChangeText={(val) => {
            setEmail(val);
            setEmailError("");
          }}
        />
        {emailError ? (
          <Text style={[styles.errorText, { marginTop: height * -0.0249 }]}>
            {emailError}
          </Text>
        ) : null}
        <TextInput2
          bgcolor="#fff"
          label="Password"
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={(val) => {
            setPassword(val);
            setPasswordError("");
          }}
        />
        {passwordError ? (
          <Text style={[styles.errorText, { marginTop: height * 0.0049 }]}>
            {passwordError}
          </Text>
        ) : null}
      </View>

      <View style={styles.row}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            color="#6C6C6C"
            value={isChecked}
            onValueChange={setIsChecked}
            tintColors={{ true: "#52C2FE", false: "#52C2FE" }}
          />
          <Text style={styles.checkboxLabel}>Keep me signed in</Text>
        </View>
        <TouchableOpacity onPress={() => routerr.push("/auth/ForgotPassword")}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containersign}>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={handleSignIn}
          disabled={loading}
        >
          {!loading ? (
            <Text style={styles.buttonText}>Sign In</Text>
          ) : (
            <ActivityIndicator size="large" color="#fff" />
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
          onPress={onGoogleButtonPress}
          disabled={loading}
          style={styles.containersocial}
        >
          <View style={styles.social}>
            <View style={[styles.innersocial, { marginLeft: -15 }]}>
              <Image source={google} style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
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

        <View style={styles.row2}>
          <Text style={styles.donthaveanaccount}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/auth/Signup")}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: height * 0.0244,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: "5.5%",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: height * 0.0244,
  },
  signInTitle: {
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold",
    color: "#5C5C5C",
    textAlign: "center",
  },
  ImageContainer: {
    alignItems: "center",
    marginBottom: height * 0.0244,
  },
  inputbox: {
    width: "100%",
    alignItems: "center",
    marginBottom: height * 0.0134,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    paddingLeft: 10,
    marginTop: -8,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: height * 0.0293,
    // backgroundColor: "red",
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
    marginLeft: 8,
  },
  forgotPassword: {
    fontSize: 12,
    fontFamily: "OpenSans-Regular",
    color: "#9386F7",
    // backgroundColor: "red",
    // textDecorationLine: "underline",
  },
  containersign: {
    width: "100%",
    height: height * 0.061,
    justifyContent: "center",
    alignItems: "center",
  },
  signInButton: {
    width: "100%",
    height: height * 0.061,
    backgroundColor: "#A9A0F0",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 13,
    color: "#fff",
  },
  containerline: {
    width: "100%",
    alignItems: "center",
    marginVertical: height * 0.0293,
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
    fontSize: 14,
    fontFamily: "OpenSans-Regular",
    color: "#5C5C5C",
    marginHorizontal: 10,
    opacity: 0.7,
  },
  socialouterview: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
  containersocial: {
    width: "100%",
    alignItems: "center",
    marginBottom: height * 0.0159,
  },
  social: {
    width: "100%",
    height: height * 0.061,
    borderColor: "#A9A0F0",
    borderWidth: 1,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  innersocial: {
    flexDirection: "row",
    alignItems: "center",
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  socialButtonText: {
    fontFamily: "OpenSans-SemiBold",
    color: "#5C5C5C",
    fontSize: 13,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.0159,
  },
  donthaveanaccount: {
    fontSize: 14,
    fontFamily: "OpenSans-Regular",
    color: "#5C5C5C",
    opacity: 0.7,
  },
  signupText: {
    fontSize: 14,
    fontFamily: "OpenSans-Regular",
    color: "#9386F7",
    textDecorationLine: "underline",
    marginLeft: 5,
    opacity: 0.7,
  },
});
