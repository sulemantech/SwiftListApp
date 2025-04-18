import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";

import back from "../assets/images/back-arrow.png";
import heart from "../assets/images/heartIcon.png";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

interface HeaderProps {
  title: string | string[];
  onBack: () => void;
  Rightelement?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  Rightelement = false,
}) => {
  const [pressed, setPressed] = useState(false);

  const handleBackPress = () => {
    setPressed(true);

    setTimeout(() => {
      onBack();
      setPressed(false);
    }, 50);
  };

  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.bacKview}>
        <Pressable
          style={[
            styles.backview,
            { backgroundColor: pressed ? "#903fff" : "#F3F3FD" },
          ]}
          onPress={handleBackPress}
        >
          <Image source={back} style={styles.back} />
        </Pressable>
        <Text style={styles.signInText}>{title}</Text>
        <Text style={styles.signInText}></Text>
        {Rightelement && <Image source={heart} style={styles.heart} />}
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: StatusBar.currentHeight || 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    zIndex: 1,
  },
  backview: {
    display: "flex",
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
    height: 24,
    width: screenWidth * 0.8889,
    marginTop: 19.54,
  },
});
