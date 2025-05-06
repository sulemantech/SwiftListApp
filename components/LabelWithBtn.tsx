import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import ChevronIcon from "../assets/images/profilepage/ChevronIcon.png";
import DefaultIcon from "../assets/images/profilepage/profile.png";
import Entypo from '@expo/vector-icons/Entypo';

interface LabelWithBtnProps {
  text: string;
  onPress?: () => void;
  IconsURL?: any;
  iconSize?: { width: number; height: number };
}

const LabelWithBtn: React.FC<LabelWithBtnProps> = ({
  text,
  onPress = () => console.log("Button pressed"),
  IconsURL = DefaultIcon,
  iconSize = { width: 20, height: 20 },
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconTextContainer}>
        <Image
          source={IconsURL}
          style={{ width: iconSize.width, height: iconSize.height }}
        />
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.Chevrobg}>
        <Entypo name="chevron-right" size={23} color="#A9A0F0" />
      </View>
    </TouchableOpacity>
  );
};

export default LabelWithBtn;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 4,
    justifyContent: "space-between",
    width: "100%",
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: "OpenSans-Bold",
    fontSize: 14,
    // lineHeight: 16,
    textAlign: "left",
    color: "#4c4c4c",
    marginLeft: 10,
  },
  Chevrobg: {
    backgroundColor: "#F3F3FD",
    padding: 4,
    borderRadius: 50,
  },
});
