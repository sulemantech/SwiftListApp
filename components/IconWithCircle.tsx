import {
  StyleSheet,
  Text,
  View,
  Image,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
} from "react-native";
import React from "react";

interface IconWithCircleProps {
  text: string;
  textColor?: string;
  circleSize?: number;
  circleColor?: string;
  imageSource: ImageSourcePropType;
  imageSize?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const IconWithCircle: React.FC<IconWithCircleProps> = ({
  text,
  textColor = "#000",
  circleSize = 50,
  circleColor = "#ddd",
  imageSource,
  imageSize = 30,
  textStyle,
}) => {
  return (
    <View style={[styles.container]}>
      <Text style={[{ color: textColor, marginLeft: 10 }, styles.text]}>
        {text}
      </Text>
      <View
        style={[
          styles.circle,
          {
            width: circleSize,
            height: circleSize,
            backgroundColor: circleColor,
            borderRadius: circleSize / 2,
          },
        ]}
      >
        <Image
          source={imageSource}
          style={{
            width: imageSize,
            height: imageSize,
            resizeMode: "contain",
          }}
        />
      </View>
    </View>
  );
};

export default IconWithCircle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 180,
    justifyContent: "flex-end",
    gap: 10,
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "OpenSans-Bold",
    fontSize: 13,
    lineHeight: 13,
    letterSpacing: 0,
    textAlignVertical: "center",
  },
});
