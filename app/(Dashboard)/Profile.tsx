import { View, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { COLORS } from "@/constants";
import Header from "../../components/Header";

const Profile = () => {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Header
          title={"Profile"}
          Rightelement={true}
          onBack={handleBackPress}
        />
      </View>
      <View style={styles.content}>
        <Header
          title={"Profile"}
          Rightelement={true}
          onBack={handleBackPress}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginTop: 30,
  },
  content: {
    flex: 1, // Fills remaining space
    justifyContent: "center",
    alignItems: "center",
  },
});
