import React from "react";
import { BottomSheet, ListItem } from "@rneui/themed";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CreateList from "./CreateList";
import CreateCategory from "./CreateCategory";
import CreateItem from "./CreateItem";

type BottomSheetComponentProps = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  CompName: string;
  categories:any
};

const { height: screenHeight } = Dimensions.get("window");

const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({
  isVisible,
  setIsVisible,
  CompName,
  categories
}) => {
  const list = [
    { title: "List Item 1" },
    { title: "List Item 2" },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  const renderContent = () => {
    switch (CompName) {
      case "item":
        return (
          <View style={styles.contentWrapper}>
            <CreateItem setIsVisible={setIsVisible} categories={categories}/>

          </View>
        );
      case "category":
        return (
          <View style={styles.contentWrapper}>
            <CreateCategory setIsVisible={setIsVisible} categories={categories}/>
          </View>
        );
      case "list":
        return (
          <View style={styles.contentWrapper}>
            <CreateList setIsVisible={setIsVisible}  />
          </View>
        );
      default:
        return (
          <>
            <Text>Content Goes Here</Text>
          </>
        );
    }
  };

  return (
    <SafeAreaProvider>
      <BottomSheet
        containerStyle={{
          height: screenHeight * 0.9, // 90% height
          marginTop: screenHeight * 0.1, // Push it from the top
        }}
        isVisible={isVisible}
      >
        {renderContent()}
      </BottomSheet>
    </SafeAreaProvider>
  );
};

export default BottomSheetComponent;

const styles = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: 20,
    backgroundColor: "#F3F3FD",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  doneButton: {
    marginTop: 20,
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  doneButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
