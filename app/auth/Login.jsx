// // Login.tsx
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { router, useRouter } from "expo-router";
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
  const [loading, setLoading] = useState(false);
  const routerr = useRouter();
  const { setUserDetails } = useContext(ProductContext);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "43816911899-r0905121ph3ppu4p6feodkg0ieq4tkj5.apps.googleusercontent.com",
    });
  }, []);

  const onFacebookButtonPress = async () => {
    try {
      setLoading(true);
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);

      if (result.isCancelled) {
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

  return (
    <SafeAreaView
      style={styles.container}
      pointerEvents={loading ? "none" : "auto"}
    >
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />

      <View style={styles.ImageContainer}>
        <Signin width={width * 0.5} height={height * 0.22} />
      </View>

      <Text style={styles.heading}>Let’s Get You In!</Text>
      <Text style={styles.subHeading}>
        Login with Google or Facebook — no{"\n"}passwords needed, just a tap
        away!
      </Text>

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
      </View>

      <Text style={styles.termsText}>
        By continuing, you agree to our{" "}
        <Text style={styles.link}>Terms of Service</Text> and{" "}
        <Text style={styles.link}>Privacy Policy</Text>
      </Text>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#A9A0F0"
          style={{ marginTop: 20 }}
        />
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: "5.5%",
    // paddingHorizontal: width * (20 / 360),
    paddingTop: height * 0.04,
  },
  ImageContainer: {
    alignItems: "center",
    marginBottom: height * 0.02,
    // backgroundColor: "red",
    // marginTop: height * (118 / 820),
  },
  heading: {
    fontSize: width * (18 / 360),
    // fontSize:19.8,
    fontFamily: "OpenSans-SemiBold",
    color: "#333",
    textAlign: "center",
    marginBottom: height * 0.01,
  },
  subHeading: {
    fontSize: width * 0.038,
    fontFamily: "OpenSans-Regular",
    color: "#666",
    textAlign: "center",
    marginBottom: height * 0.04,
  },
  socialouterview: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
    paddingHorizontal: width * (20 / 360),
    // paddingHorizontal: 0,
  },
  containersocial: {
    width: "100%",
    alignItems: "center",
    // marginBottom: height * 0.018,
    marginBottom: height * (13 / 820),
  },
  social: {
    width: "100%",
    height: height * 0.065,
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
    fontSize: width * (13 / 360),
  },
  termsText: {
    fontSize: width * 0.032,
    color: "#999",
    textAlign: "center",
    marginTop: height * (27 / 820),
    width: "78%",
    lineHeight: 20,
    fontFamily: "OpenSans-Regular",
  },
  link: {
    textDecorationLine: "underline",
    color: "#9386F7",
  },
});