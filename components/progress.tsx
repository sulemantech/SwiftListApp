import React, { useEffect, useState } from "react";
import { TextInput, View, StyleProp, TextStyle, ViewStyle } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Circle, Svg } from "react-native-svg";

// Define props interface
interface ProgressCircleProps {
  percentage?: number;
  colors?: string[];
  size?: number;
  strokeWidth?: number;
  textSize?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percentage = 0,
  colors = ["#9E4784", "#66347F", "#37306B"],
  size = 100,
  strokeWidth = 10,
  textSize = 24,
  style,
  textStyle,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const duration = 4000;

  const strokeOffset = useSharedValue(circumference);
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    strokeOffset.value = withTiming(circumference * (1 - percentage / 100), {
      duration,
    });

    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setDisplayPercentage(Math.min(progress, percentage));
      if (progress >= percentage) clearInterval(interval);
    }, duration / percentage);

    return () => clearInterval(interval);
  }, [percentage]);

  const strokeColor = useDerivedValue(() => {
    return interpolateColor(percentage, [0, 50, 100], colors);
  });

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: strokeOffset.value,
    stroke: strokeColor.value,
  }));

  return (
    <View style={[{ justifyContent: "center", alignItems: "center" }, style]}>
      <TextInput
        editable={false}
        value={`${displayPercentage}%`}
        style={[
          {
            color: "black",
            fontSize: textSize,
            fontWeight: "400",
            position: "absolute",
            textAlign: "center",
          },
          textStyle,
        ]}
      />
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E7E7E7"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <AnimatedCircle
          animatedProps={animatedCircleProps}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // Rotate to start from top
        />
      </Svg>
    </View>
  );
};

export default ProgressCircle;
