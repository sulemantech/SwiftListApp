import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import ChevronIcon from "../assets/images/profilepage/ChevronIcon.png";
import DefaultIcon from "../assets/images/profilepage/profile.png";

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
  iconSize = { width: 16, height: 16 },
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
      <Image source={ChevronIcon} style={{ width: 14.77, height: 14.77 }} />
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
    fontFamily: "Poppins-Bold",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    textAlign: "left",
    color: "#4c4c4c",
    marginLeft: 10,
  },
});
