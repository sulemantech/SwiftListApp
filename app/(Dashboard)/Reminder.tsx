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
import { CardWithCounter } from "@/components/CardWithCouter";

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

  const renderItem = ({ item }: { item: (typeof list)[0] }) => (
    <ListItem containerStyle={styles.item} onPress={item.onPress}>
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{item.title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );

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
          {/* <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          /> */}
          <View style={styles.item}>
            <Button onPress={() => setIsVisible(false)}>Close</Button>
            <CardWithCounter/>
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
