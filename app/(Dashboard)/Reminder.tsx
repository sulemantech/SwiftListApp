import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { BottomSheet, Button, ListItem } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { COLORS } from "@/constants";

const Reminder = () => {
  const [isVisible, setIsVisible] = useState(false);

  const list = [
    { title: "Buy groceries", onPress: () => handleItemPress("Buy groceries") },
    { title: "Walk the dog", onPress: () => handleItemPress("Walk the dog") },
    { title: "Call mom", onPress: () => handleItemPress("Call mom") },
    { title: "Do laundry", onPress: () => handleItemPress("Do laundry") },
  ];

  const handleItemPress = (title: string) => {
    console.log("Selected:", title);
    setIsVisible(false);
  };


  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Button
          title="Open Bottom Sheet"
          onPress={() => setIsVisible(true)}
          buttonStyle={styles.button}
        />

        <BottomSheet
          isVisible={isVisible}
          onBackdropPress={() => setIsVisible(false)}
        >
          <View style={styles.item}>
            <Button onPress={() => setIsVisible(false)}>Close</Button>
          </View>
        </BottomSheet>
      </View>
    </SafeAreaProvider>
  );
};

export default Reminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.primary || "#007BFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  item: {
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    color: "#333",
  },
});
