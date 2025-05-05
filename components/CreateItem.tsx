import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import TextInput2 from "./Input";
import DropdownComponent from "./DropDown";
import ImagePickerExample from "./ImagePicker";
import { Divider } from "@rneui/base";

interface CreateItem {
  setIsVisible: (isVisible: boolean) => void;
  categories:any
}

const CreateItem: React.FC<CreateItem> = ({ setIsVisible ,categories }) => {
  const [listDescription, setListDescription] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
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
      <Divider />
      <View style={styles.container2}>
        <TextInput2
          label={"Name:"}
          placeholder={"Enter item Name"}
          value={listDescription}
          onChangeText={setListDescription}
        />
        <DropdownComponent Label="Select List" Placeholder="Select" data={categories} />
        <DropdownComponent Label="Select category" Placeholder="Select" data={categories} />
        <View>
          <Text>Add Icon</Text>
          <ImagePickerExample />
        </View>
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
    paddingVertical: 10,
  },
  line: {
    marginTop: 10,
    height: 4,
    width: 65,
    borderRadius: 50,
    marginHorizontal: "auto",
    backgroundColor: "#5C5C5C",
  },
  back: {
    width: 25,
    height: 20,
  },
  container2: {
    marginVertical: 20,
    gap: 6,
  },
  signInText: {
    color: "#5C5C5C",
    fontSize: 18,
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
    color: "#5C5C5C",
    fontSize: 16,
    fontFamily: "OpenSans-Medium",
  },
});
