import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import TextInput2 from "./Input";
import images from "../constants/images";
import DropdownComponent from "./DropDown";
import { Divider } from "@rneui/base";
import { ProductContext } from "../Context/CardContext";
const { Sampledata } = images;

interface CreateCategoryProps {
  setIsVisible: (isVisible: boolean) => void;
  categories: any;
  ListName:any
}

const CreateCategory: React.FC<CreateCategoryProps> = ({
  setIsVisible,
  categories,
  ListName
}) => {
  const [listDescription, setListDescription] = useState<string>("");
  const data = categories.map((category: any, index: any) => ({
    label: category,
    value: (index + 1).toString(),
  }));
  const [categoryCreation, SetCategoryCreation] = useState({
    name: ListName,
    image: "spiritualImage",
    id: 0,
    description: "Your Current Categories.",
    Categories: { id: 0, name: "", items: [] },
  });
  const { savecategoriesToAsyncStorage, changestate, setChangestate } =
    useContext(ProductContext);

  const savecategrories = () => {
    setChangestate(!changestate);
    savecategoriesToAsyncStorage(categoryCreation);
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <View style={styles.headerContainer}>
        <Text style={styles.signInText}>Add List</Text>
        <TouchableOpacity style={styles.saveButton}>
          <Text onPress={savecategrories} style={styles.saveButtonText}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <Divider />
        <TextInput2
          label={"Name:"}
          placeholder={"Write your Category Name"}
          value={categoryCreation.Categories.name}
          onChangeText={(text) =>
            SetCategoryCreation((prev) => ({
              ...prev,
              Categories: {
                ...prev.Categories,
                name: text,
              },
            }))
          }
        />
        {/* <DropdownComponent
          Label="List"
          Placeholder="Select a List"
          data={data}
          onChange={(item) => {
            SetCategoryCreation((prev) => ({
              ...prev,
              name: item.label,
            }));
          }}
        /> */}
      </View>
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
    paddingVertical: 10,
  },
  line: {
    marginTop: 10,
    width: 65,
    height: 4,
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
