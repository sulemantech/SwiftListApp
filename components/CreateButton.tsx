import React, { useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import IconWithCircle from "./IconWithCircle";
import CreatingCompBottomSheet from "./CreatingCompBottomSheet";

const { width, height } = Dimensions.get("window");

interface CreateButtonProps {
  categories: any;
  screen: "list" | "item" | "category";
}

const CreateButton = ({ categories, screen }: CreateButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [compName, setCompName] = useState("");
  const openSheet = (name: any) => {
    setIsVisible(true);
    setCompName(name);
    console.log("Opening sheet...", name);
  };

  const renderButton = (
    onPress: () => void,
    text: string,
    color: string,
    icon: any
  ) => (
    <TouchableOpacity onPress={onPress}>
      <IconWithCircle
        text={text}
        textColor="#333"
        circleColor={color}
        circleSize={60}
        imageSource={icon}
        imageSize={35}
      />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.buttonContainer}>
        {screen === "item" &&
          renderButton(
            () => openSheet("item"),
            "Add Item",
            "#89B8EC",
            require("../assets/icons/item.png")
          )}

        {screen === "list" &&
          renderButton(
            () => openSheet("category"),
            "Add Category",
            "#74B0AE",
            require("../assets/icons/category.png")
          )}

        {screen === "list" &&
          renderButton(
            () => openSheet("list"),
            "Add List",
            "#FFBC71",
            require("../assets/icons/List.png")
          )}
      </View>

      {/* Wrap the bottom sheet in a full-screen absolute View */}
      <View style={[StyleSheet.absoluteFill]}>
        <CreatingCompBottomSheet
          CompName={compName}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          categories={categories}
        />
      </View>
    </>
  );
};

export default CreateButton;

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: height * 0.2,
    right: width * 0.1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    gap: 10,
  },
});
