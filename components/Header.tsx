import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "expo-image";

// Import image assets
import back from "../assets/images/back-arrow.png";
import heart from "../assets/images/heartIcon.png";

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
    <TouchableOpacity
      style={styles.backview}
      activeOpacity={0.2}
      onPress={onBack}
    >
      <Image source={back} style={styles.back} />
    </TouchableOpacity>
    <Text style={styles.signInText}>{title}</Text>
    {Rightelement && <Image source={heart} style={styles.heart} />}
  </SafeAreaView>
);

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 7,
    paddingHorizontal: "5.5%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    zIndex: 1,
    marginTop: 25,
  },
  backview: {
    height: 60,
    position: "absolute",
    left: 0,
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  back: {
    width: 27,
    height: 20,
    marginBottom: 10,
    marginRight: 30,
  },
  signInText: {
    color: "#0c0c0c",
    fontSize: 20,
    fontWeight: "600",
    paddingVertical: 5,
    fontFamily: "OpenSans-Bold",
  },
  heart: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 30,
    height: 30,
  },
});
