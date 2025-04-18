import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar
} from "react-native";
import React from "react";
import { Image } from "expo-image";
// import { StatusBar } from "expo-status-bar";

// Import image assets
import back from "../assets/images/back-arrow.png";
import heart from "../assets/images/heartIcon.png";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

// Define props type
interface HeaderProps {
  title: string | string[];
  onBack: () => void;
  Rightelement?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  Rightelement = false,
}) => (
  <SafeAreaView style={styles.headerContainer}>
    <View style={styles.bacKview}>
      <TouchableOpacity
        style={styles.backview}
        activeOpacity={0.2}
        onPress={onBack}
      >
        <Image source={back} style={styles.back} />
      </TouchableOpacity>
      <Text style={styles.signInText}>{title}</Text>
      <Text style={styles.signInText}></Text>
      {Rightelement && <Image source={heart} style={styles.heart} />}
    </View>
  </SafeAreaView>
);

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    // paddingVertical: 7,
    // paddingHorizontal: "",
    paddingTop: StatusBar.currentHeight || 0,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    // backgroundColor: "#fff",
    width: "100%",
    zIndex: 1,
  },
  backview: {
    display: "flex",
    // backgroundColor: "#903fff",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    // width: 100,
  },
  back: {
    width: 18.95,
    height: 10.26,
  },
  signInText: {
    color: "#4C4C4C",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "OpenSans-SemiBold",
  },
  heart: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 30,
    height: 30,
  },
  bacKview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#903fff",
    height: 24,
    width: screenWidth * 0.8889,
    marginTop:19.54,
  },
});
