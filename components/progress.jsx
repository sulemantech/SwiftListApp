// import React, { useEffect } from "react";
// import { Text, View } from "react-native";
// import Animated, {
//   interpolateColor,
//   useAnimatedProps,
//   useDerivedValue,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";
// import { Circle, Svg } from "react-native-svg";

// const AnimatedCircle = Animated.createAnimatedComponent(Circle);
// const AnimatedText = Animated.createAnimatedComponent(Text);

// const ProgressCircle = ({
//   percentage = 0,
//   colors = ["#9E4784", "#66347F", "#37306B"],
//   size = 100,
//   strokeWidth = 10,
//   textSize = 24,
// }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const duration = 4000;

//   const progress = useSharedValue(0);

//   useEffect(() => {
//     progress.value = withTiming(percentage, { duration });
//   }, [percentage]);

//   const strokeOffset = useDerivedValue(() => {
//     return circumference * (1 - progress.value / 100);
//   });

//   const strokeColor = useDerivedValue(() => {
//     return interpolateColor(progress.value, [0, 50, 100], colors);
//   });

//   const animatedCircleProps = useAnimatedProps(() => ({
//     strokeDashoffset: strokeOffset.value,
//     stroke: strokeColor.value,
//   }));

//   const animatedText = useDerivedValue(() => {
//     return `${Math.round(progress.value)}%`;
//   });

//   return (
//     <View style={{ justifyContent: "center", alignItems: "center" }}>
//       <AnimatedText
//         style={{
//           color: "black",
//           fontSize: textSize,
//           fontWeight: "bold",
//           position: "absolute",
//           textAlign: "center",
//         }}
//       >
//         {animatedText.value}
//       </AnimatedText>
//       <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
//         {/* Background Circle */}
//         <Circle
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           stroke="#E7E7E7"
//           strokeWidth={strokeWidth}
//           fill="transparent"
//         />
//         {/* Animated Progress Circle */}
//         <AnimatedCircle
//           animatedProps={animatedCircleProps}
//           cx={size / 2}
//           cy={size / 2}
//           r={radius}
//           strokeDasharray={circumference}
//           strokeWidth={strokeWidth}
//           strokeLinecap="round"
//           fill="transparent"
//           transform={`rotate(-90 ${size / 2} ${size / 2})`} // Start from top
//         />
//       </Svg>
//     </View>
//   );
// };

// export default ProgressCircle;

import React, { useEffect, useState } from "react";
import { TextInput, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Circle, Svg } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ProgressCircle = ({
  percentage = 0,
  colors = ["#9E4784", "#66347F", "#37306B"],
  size = 100, // Dynamic size
  strokeWidth = 10, // Dynamic stroke width
  textSize = 24, // Dynamic text size
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

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: strokeOffset.value,
      stroke: strokeColor.value,
    };
  });

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <TextInput
        editable={false}
        value={`${displayPercentage}%`}
        style={{
          color: "black",
          fontSize: textSize,
          fontWeight: "regular",
          position: "absolute",
          textAlign: "center",
        }}
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

{
  /* <CircularProgress/> */
}
{
  /* <View style={styles.progressCircles_view}>
                <ProgressCircle
                  percentage={85}
                  colors={["#FFF", "#ADF7FE", "#ADF7FE"]}
                  size={40} // Custom size
                  strokeWidth={7} // Thicker stroke
                  textSize={10} // Larger text
                />
                <ProgressCircle
                  percentage={85}
                  colors={["#FFF", "#8BC17C", "#8BC17C"]}
                  size={40} // Custom size
                  strokeWidth={7} // Thicker stroke
                  textSize={10} // Larger text
                />
                <ProgressCircle
                  percentage={85}
                  colors={["#FFF", "#BBBF42", "#BBBF42"]}
                  size={40} // Custom size
                  strokeWidth={7} // Thicker stroke
                  textSize={10} // Larger text
                />
                <ProgressCircle
                  percentage={85}
                  colors={["#FFF", "#DD9947", "#DD9947"]}
                  size={40} // Custom size
                  strokeWidth={7} // Thicker stroke
                  textSize={10} // Larger text
                />
                <ProgressCircle
                  percentage={85}
                  colors={["#FFF", "#DA716F", "#DA716F"]}
                  size={40} // Custom size
                  strokeWidth={7} // Thicker stroke
                  textSize={10} // Larger text
                />
              </View> */
}
