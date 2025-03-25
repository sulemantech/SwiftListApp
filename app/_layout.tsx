

//new code
import { Stack, useRouter, useSegments } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { ProductProvider } from "../Context/CardContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<
    boolean | null
  >(null);
  const [isMounted, setIsMounted] = useState(false); //  Ensure first render is complete
  const router = useRouter();
  const segment = useSegments();

  // Load fonts
  const [fontsLoaded] = useFonts({
    "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Italic": require("../assets/fonts/OpenSans-Italic.ttf"),
    "OpenSans-Light": require("../assets/fonts/OpenSans-Light.ttf"),
    "OpenSans-Medium": require("../assets/fonts/OpenSans-Medium.ttf"),
    "openSans-SemiBold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const completed = await SecureStore.getItemAsync("onboardingCompleted");
        setHasCompletedOnboarding(completed === "true");
      } catch (error) {
        console.error("Error fetching onboarding status:", error);
      }
    };
    checkOnboarding();
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
      setInitializing(false);
    });
    return subscriber;
  }, []);

  //  Ensure first render before navigating
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Delay navigation until everything is ready
  useEffect(() => {
    if (
      !isMounted ||
      initializing ||
      hasCompletedOnboarding === null ||
      !fontsLoaded
    )
      return;

    if (!hasCompletedOnboarding) {
      router.replace("/intro/Onbording");
    } else if (user) {
      router.replace("/(Dashboard)/Home");
    } else {
      router.replace("/auth/Login");
    }
  }, [isMounted, user, initializing, hasCompletedOnboarding, fontsLoaded]);

  if (
    initializing ||
    hasCompletedOnboarding === null ||
    !fontsLoaded ||
    !isMounted
  ) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ProductProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="intro/Onbording"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(Dashboard)" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
        </Stack>
      </ProductProvider>
    </GestureHandlerRootView>
  );
}


// old code
// import { Stack, useRouter, useSegments } from "expo-router";
// import { ActivityIndicator, View } from "react-native";
// import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
// import { useEffect, useState } from "react";
// import { ProductProvider } from "../Context/CardContext";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import * as SecureStore from "expo-secure-store";

// export default function RootLayout() {
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
//   const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null); // ✅ Start as `null`
//   const router = useRouter();
//   const segment = useSegments();

//   // ✅ Load onboarding state once and ensure it doesn't cause re-renders
//   useEffect(() => {
//     const checkOnboarding = async () => {
//       try {
//         const completed = await SecureStore.getItemAsync("onboardingCompleted");
//         setHasCompletedOnboarding(completed === "true");
//       } catch (error) {
//         console.error("Error fetching onboarding status:", error);
//       }
//     };
//     checkOnboarding();
//   }, []);

//   // ✅ Auth state listener (Runs only once)
//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged((user) => {
//       setUser(user);
//       setInitializing(false);
//     });
//     return subscriber;
//   }, []);

//   // ✅ Navigation logic (Waits until onboarding status is checked)
//   useEffect(() => {
//     if (initializing || hasCompletedOnboarding === null) return; // ✅ Ensure data is ready

//     if (!hasCompletedOnboarding) {
//       router.replace("/intro/Onbording");
//       return;
//     }

//     // const inAuthGroup = segment[0] === "(Dashboard)";

//     if (user) {
//       router.replace("/(Dashboard)/Home");
//     } else if (!user ) {
//       router.replace("/auth/Login");
//     }
//   }, [user, initializing, hasCompletedOnboarding]); // ✅ Runs only when data is fully loaded

//   if (initializing || hasCompletedOnboarding === null) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size={"large"} />
//       </View>
//     );
//   }

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <ProductProvider>
//         <Stack screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="index" options={{ headerShown: false }} />
//           <Stack.Screen name="intro/Onbording" options={{ headerShown: false }} />
//           <Stack.Screen name="(Dashboard)" options={{ headerShown: false }} />
//           <Stack.Screen name="auth" options={{ headerShown: false }} />
//         </Stack>
//       </ProductProvider>
//     </GestureHandlerRootView>
//   );
// }