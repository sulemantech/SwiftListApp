// import React, { useEffect } from "react";
// import { TextInput, View } from "react-native";
// import Animated, {
//   interpolateColor,
//   useAnimatedProps,
//   useDerivedValue,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";
// import { Circle, Svg } from "react-native-svg";

// const AnimatedCircle = Animated.createAnimatedComponent(Circle);
// const AnimatedText = Animated.createAnimatedComponent(TextInput);

// const radius = 45;
// const circumference = radius * Math.PI * 2;
// const duration = 6000;

// const ProgressCircle = () => {
//   const strokeOffset = useSharedValue(circumference);

//   const percentage = useDerivedValue(() => {
//     return ((circumference - strokeOffset.value) / circumference) * 100;
//   });

//   const strokeColor = useDerivedValue(() => {
//     return interpolateColor(
//       percentage.value,
//       [0, 50, 100],
//       ["#9E4784", "#66347F", "#37306B"]
//     );
//   });

//   const animatedCircleProps = useAnimatedProps(() => {
//     return {
//       strokeDashoffset: strokeOffset.value, // Ensure animation works
//       stroke: strokeColor.value,
//     };
//   });

//   const animatedTextProps = useAnimatedProps(() => {
//     return {
//       text: `${Math.round(percentage.value)} %`,
//     };
//   });

//   useEffect(() => {
//     strokeOffset.value = withTiming(0, { duration }); // Ensure it animates
//   }, []);

//   return (
//     <View
//       style={{
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <AnimatedText
//         editable={false} // Required for TextInput
//         style={{
//           color: "#37306B",
//           fontSize: 24,
//           fontWeight: "bold",
//           position: "absolute",
//         }}
//         animatedProps={animatedTextProps}
//       />
//       <Svg height="200" width="200" viewBox="0 0 100 100">
//         {/* Background Circle */}
//         <Circle
//           cx="50"
//           cy="50"
//           r="45"
//           stroke="#E7E7E7"
//           strokeWidth="10"
//           fill="transparent"
//         />
//         {/* Animated Progress Circle */}
//         <AnimatedCircle
//           animatedProps={animatedCircleProps}
//           cx="50"
//           cy="50"
//           r="45"
//           strokeDasharray={`${circumference}`}
//           strokeDashoffset={circumference} // Start from full circumference
//           strokeWidth="10"
//           fill="transparent"
//         />
//       </Svg>
//     </View>
//   );
// };

// export default ProgressCircle;

// import React, { useEffect } from "react";
// import { TextInput, View } from "react-native";
// import Animated, {
//   interpolateColor,
//   useAnimatedProps,
//   useDerivedValue,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";
// import { Circle, Svg } from "react-native-svg";

// const AnimatedCircle = Animated.createAnimatedComponent(Circle);
// const AnimatedText = Animated.createAnimatedComponent(TextInput);

// const radius = 45;
// const circumference = radius * Math.PI * 2;
// const duration = 2000;

// const ProgressCircle = ({
//   percentage = 0,
//   colors = ["#9E4784", "#66347F", "#37306B"],
// }) => {
//   const strokeOffset = useSharedValue(circumference);

//   useEffect(() => {
//     strokeOffset.value = withTiming(circumference * (1 - percentage / 100), {
//       duration,
//     });
//   }, [percentage]);

//   const strokeColor = useDerivedValue(() => {
//     return interpolateColor(percentage, [0, 50, 100], colors);
//   });

//   const animatedCircleProps = useAnimatedProps(() => {
//     return {
//       strokeDashoffset: strokeOffset.value,
//       stroke: strokeColor.value,
//     };
//   });

//   const animatedTextProps = useAnimatedProps(() => {
//     return {
//       text: `${Math.round(percentage)} %`,
//     };
//   });

//   return (
//     <View style={{ justifyContent: "center", alignItems: "center" }}>
//       <AnimatedText
//         editable={false}
//         style={{
//           color: "#37306B",
//           fontSize: 24,
//           fontWeight: "bold",
//           position: "absolute",
//         }}
//         animatedProps={animatedTextProps}
//       />
//       <Svg height="200" width="200" viewBox="0 0 100 100">
//         {/* Background Circle */}
//         <Circle
//           cx="50"
//           cy="50"
//           r="45"
//           stroke="#E7E7E7"
//           strokeWidth="10"
//           fill="transparent"
//         />
//         {/* Animated Progress Circle */}
//         <AnimatedCircle
//           animatedProps={animatedCircleProps}
//           cx="50"
//           cy="50"
//           r="45"
//           strokeDasharray={circumference}
//           strokeWidth="10"
//           fill="transparent"
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

const radius = 45;
const circumference = radius * Math.PI * 2;
const duration = 2000;

const ProgressCircle = ({
  percentage = 0,
  colors = ["#9E4784", "#66347F", "#37306B"],
}) => {
  const strokeOffset = useSharedValue(circumference);
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    strokeOffset.value = withTiming(circumference * (1 - percentage / 100), {
      duration,
    });

    // Update percentage text smoothly
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
      {/* Display percentage text using state */}
      <TextInput
        editable={false}
        value={`${displayPercentage} %`}
        style={{
          color: "#37306B",
          fontSize: 24,
          fontWeight: "bold",
          position: "absolute",
          textAlign: "center",
        }}
      />
      <Svg height="200" width="200" viewBox="0 0 100 100">
        {/* Background Circle */}
        <Circle
          cx="50"
          cy="50"
          r="45"
          stroke="#E7E7E7"
          strokeWidth="10"
          fill="transparent"
        />
        {/* Animated Progress Circle */}
        <AnimatedCircle
          animatedProps={animatedCircleProps}
          cx="50"
          cy="50"
          r="45"
          strokeDasharray={circumference}
          strokeWidth="10"
          fill="transparent"
        />
      </Svg>
    </View>
  );
};

export default ProgressCircle;
