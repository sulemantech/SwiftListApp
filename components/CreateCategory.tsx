import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import TextInput2 from "./Input";
import DropdownComponent from "./DropDown";

interface CreateCategoryProps {
  setIsVisible: (isVisible: boolean) => void;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({ setIsVisible }) => {
  const [listDescription, setListDescription] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.signInText}>Add List</Text>
        <TouchableOpacity
          //  onPress={saveListToStorage}
          style={styles.saveButton}
        >
          <Text
            onPress={() => setIsVisible(false)}
            style={styles.saveButtonText}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput2
        label={"Description:"}
        placeholder={"Write your list Description"}
        value={listDescription}
        onChangeText={setListDescription}
      />
      <DropdownComponent />
    </View>
  );
};

export default CreateCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  back: {
    width: 25,
    height: 20,
  },
  signInText: {
    color: "#0c0c0c",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "OpenSans-Bold",
  },
  saveButton: {
    // backgroundColor: '#008B94',
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    // marginTop: 20,
  },
  saveButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
  },
});
