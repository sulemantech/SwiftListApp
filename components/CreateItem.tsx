import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import TextInput2 from "./Input";
import DropdownComponent from "./DropDown";
import ImagePickerExample from "./ImagePicker";

interface CreateItem {
  setIsVisible: (isVisible: boolean) => void;
}

const CreateItem: React.FC<CreateItem> = ({ setIsVisible }) => {
  const [listDescription, setListDescription] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.signInText}>Add Item</Text>
        <TouchableOpacity style={styles.saveButton}>
          <Text
            onPress={() => setIsVisible(false)}
            style={styles.saveButtonText}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput2
        label={"Name:"}
        placeholder={"Enter item Name"}
        value={listDescription}
        onChangeText={setListDescription}
      />
      <DropdownComponent Label="Select List" Placeholder="Select" />
      <DropdownComponent Label="Select category" Placeholder="Select" />
      <View>
        <Text>Add Icon</Text>
        <ImagePickerExample />
      </View>
    </View>
  );
};

export default CreateItem;

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
