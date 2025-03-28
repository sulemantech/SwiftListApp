// import React, { useState, useRef } from "react";
// import {
//   View,
//   FlatList,
//   StyleSheet,
//   Animated,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   StatusBar,
// } from "react-native";
// import { useRouter } from "expo-router";
// import OnboardingItem from "./Onbordingitem";
// import * as SecureStore from "expo-secure-store";
// import pic1 from "../../assets/images/Onbording/1.png";
// import pic2 from "../../assets/images/Onbording/2.png";
// import pic3 from "../../assets/images/Onbording/3.png";
// import pic4 from "../../assets/images/Onbording/4.png";
// import pic5 from "../../assets/images/Onbording/5.png";

// const { width, height } = Dimensions.get("window");

// export default function Onboarding() {
//   const router = useRouter();
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const slidesRef = useRef(null);
//   // status bar

//   const slides = [
//     {
//       id: "1",
//       title: "Organize Your Grocery Essentials",
//       description: "Keep track of all your shopping needs in one place. Add, edit, and check off items effortlessly.",
//       image: pic1,
//     },
//     {
//       id: "2",
//       title: "Plan Your Grooming Routine",
//       description: "Stay on top of your self-care with scheduled reminders and custom grooming lists.",
//       image: pic2,
//     },
//     {
//       id: "3",
//       title: "Track Your Spiritual Journey",
//       description: "Keep track of all your shopping needs in one place. Add, edit, and check off items effortlessly.",
//       image: pic3,
//     },
//     {
//       id: "4",
//       title: "Manage Your Daily To-Do Tasks",
//       description: "Simplify your day by organizing tasks with ease. Prioritize, set deadlines, and stay productive.",
//       image: pic4,
//     },
//     {
//       id: "5",
//       title: "Create Your Perfect Kitchen Menu",
//       description: "Plan meals for the week with recipes. Organize ingredients and streamline cooking process.",
//       image: pic5,
//     },
//   ];

//   const handleNext = async () => {
//     if (currentIndex < slides.length - 1) {
//       slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
//     } else {
//       try {
//         await SecureStore.setItemAsync("onboardingCompleted", "true");
//         router.replace("/auth/Login");
//       } catch (error) {
//         console.error("Error saving onboarding status:", error);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar
//         animated={true}
//         backgroundColor="#FFF"
//         barStyle="dark-content"
//       />
//       <TouchableOpacity
//         activeOpacity={1}
//         style={styles.skip}
//         // onPress={() => router.replace("/login")}
//       >
//         <Text style={styles.skipText}>Skip</Text>
//       </TouchableOpacity>
//       <View style={styles.container2}>
//         <FlatList
//           data={slides}
//           renderItem={({ item }) => <OnboardingItem item={item} />}
//           keyExtractor={(item) => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           pagingEnabled
//           bounces={false}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//             { useNativeDriver: false }
//           )}
//           scrollEventThrottle={32}
//           onViewableItemsChanged={({ viewableItems }) =>
//             setCurrentIndex(viewableItems[0]?.index || 0)
//           }
//           viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
//           ref={slidesRef}
//         />
//         <View style={styles.pagination}>
//           {slides.map((_, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => {
//                 slidesRef.current.scrollToIndex({ index });
//                 setCurrentIndex(index);
//               }}
//               style={[
//                 styles.dotContainer,
//                 currentIndex === index ? styles.activeDotContainer : null,
//               ]}
//             >
//               <View
//                 style={[
//                   styles.dot,
//                   {
//                     backgroundColor:
//                       currentIndex === index ? "#A9A0F0" : "#A9A0F0",
//                   },
//                 ]}
//               />
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//       <View style={styles.btnview}>
//         <TouchableOpacity
//           activeOpacity={1}
//           onPress={handleNext}
//           style={styles.button}
//         >
//           <Text style={styles.buttonText}>
//             {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     // gap: height * 0.06,
//   },
//   container2: {
//     marginTop: height * 0.1,
//     height: height * 0.5,
//     // backgroundColor: "green",
//   },
//   pagination: {
//     flexDirection: "row",
//     // marginTop: height * 0.01,
//     justifyContent: "center",
//     // backgroundColor: "red",
//   },
//   dotContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     width: 12,
//     height: 12,
//     top: 0,
//     // top: -55,
//   },
//   dot: {
//     width: 6,
//     height: 6,
//     borderRadius: 5,
//   },
//   activeDotContainer: {
//     borderWidth: 1,
//     borderColor: "#A9A0F0",
//     borderRadius: 15,
//     padding: 3,
//   },
//   button: {
//     width: "87%",
//     marginHorizontal: "auto",
//     height: 50,
//     backgroundColor: "#A9A0F0",
//     borderRadius: 30,
//     alignItems: "center",
//     justifyContent: "center",
//     // marginTop: 10,
//     top: 50,
//   },
//   buttonText: {
//     fontFamily: "OpenSans-Medium",
//     fontSize: 12,
//     lineHeight: 16,
//     textAlign: "center",
//     color: "#fff",
//   },
//   skip: {
//     padding: width * 0.03,
//     position: "absolute",
//     zIndex: 100,
//     top: height * 0.02,
//     right: width * 0.03,
//   },
//   btnview: {
//     width: "100%",
//     height: height * 0.27,
//   },
//   skipText: {
//     color: " #5C5C5C",
//     // color:"red",
//     fontSize: 12,
//     fontFamily: "OpenSans-Regular",
//     opacity: 0.7,
//     fontWeight: "600",
//   },
// });

import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import OnboardingItem from "./Onbordingitem";
import * as SecureStore from "expo-secure-store";
import pic1 from "../../assets/images/Onbording/1.png";
import pic2 from "../../assets/images/Onbording/2.png";
import pic3 from "../../assets/images/Onbording/3.png";
import pic4 from "../../assets/images/Onbording/4.png";
import pic5 from "../../assets/images/Onbording/5.png";

const { width, height } = Dimensions.get("window");

export default function Onboarding() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const slides = [
    {
      id: "1",
      title: "Organize Your Grocery Essentials",
      description:
        "Keep track of all your shopping needs in one place.\nAdd, edit, and check off items effortlessly.",
      image: pic1,
    },
    {
      id: "2",
      title: "Plan Your Grooming Routine",
      description:
        "Stay on top of your self-care with scheduled \nreminders and custom grooming lists..",
      image: pic2,
    },
    {
      id: "3",
      title: "Track Your Spiritual Journey",
      description:
        "Keep track of all your shopping needs in one place. \nAdd, edit, and check off items effortlessly.",
      image: pic3,
    },
    {
      id: "4",
      title: "Manage Your Daily To-Do Tasks",
      description:
        "Simplify your day by organizing tasks with ease. \nPrioritize, set deadlines, and stay productive.",
      image: pic4,
    },
    {
      id: "5",
      title: "Create Your Perfect Kitchen Menu",
      description:
        "Plan meals for the week with recipes. Organize \ningredients and streamline cooking process.",
      image: pic5,
    },
  ];

  const handleNext = async () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      try {
        await SecureStore.setItemAsync("onboardingCompleted", "true");
        router.replace("/auth/Login");
      } catch (error) {
        console.error("Error saving onboarding status:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#FFF"
        barStyle="dark-content"
      />
      <TouchableOpacity activeOpacity={1} style={styles.skip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <View style={styles.carouselContainer}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={({ viewableItems }) =>
            setCurrentIndex(viewableItems[0]?.index || 0)
          }
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          ref={slidesRef}
        />
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                slidesRef.current.scrollToIndex({ index });
                setCurrentIndex(index);
              }}
              style={[
                styles.dotContainer,
                currentIndex === index ? styles.activeDotContainer : null,
              ]}
            >
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      currentIndex === index ? "#A9A0F0" : "#A9A0F0",
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.btnview}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handleNext}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
  },
  carouselContainer: {
    // flex: 0.47678,
    marginTop: (115 / 800) * height,
    // backgroundColor: "red",
    height: (447 / 800) * height,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    // marginTop: (40 / 800) * width,
    // backgroundColor: "red",
  },
  dotContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 12,
    height: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 5,
  },
  activeDotContainer: {
    borderWidth: 1,
    borderColor: "#A9A0F0",
    borderRadius: 15,
    padding: 3,
  },
  button: {
    // top: -8.5,
    width: (320 / 360) * width,
    height: (50 / 800) * height,
    // marginTop: (50 / 800) * height,
    backgroundColor: "#A9A0F0",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
  },
  skip: {
    position: "absolute",
    top: height * (27 / 800),
    right: (20 / 360) * width,
    zIndex: 10,
  },
  skipText: {
    fontSize: 12,
    color: "#5C5C5C",
    opacity: 0.7,
    fontFamily: "OpenSans-SemiBold",
  },
  btnview: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: height * 0.05,
    // backgroundColor: "red",
    marginTop: (50 / 800) * height,
  },
});

// export default Onboarding;
