import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import TextInput2 from "./Input";
import DropdownComponent from "./DropDown";
import { Divider } from "@rneui/base";
import { ProductContext } from "../Context/CardContext";


interface CreateCategoryProps {
  setIsVisible: (isVisible: boolean) => void;
  categories: any;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({
  setIsVisible,
  categories,
}) => {
  const [listDescription, setListDescription] = useState<string>("");
  const data = categories.map((category: any, index: any) => ({
    label: category,
    value: (index + 1).toString(),
  }));
  const [categoryCreation, SetCategoryCreation] = useState({
    name: "",
    image: "spiritualImage",
    id: 6,
    description: "Your Current Categories.",
  });
    const { savecategoriesToAsyncStorage } = useContext(ProductContext);

    const savecategrories =()=>{
      savecategoriesToAsyncStorage(categoryCreation);
      setIsVisible(false)
    };
  

  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <View style={styles.headerContainer}>
        <Text style={styles.signInText}>Add List</Text>
        <TouchableOpacity
          style={styles.saveButton}
        >
          <Text
            onPress={savecategrories}
            style={styles.saveButtonText}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container2}>
        <Divider />
        <TextInput2
          label={"Description:"}
          placeholder={"Write your list Description"}
          value={categoryCreation.description}
          onChangeText={(text) =>
            SetCategoryCreation((prev) => ({
              ...prev,
              description: text,
            }))
          }
        />
        <DropdownComponent
          Label="List"
          Placeholder="Select a List"
          data={data}
          onChange={(item) => {
            SetCategoryCreation((prev) => ({
              ...prev,
              name: item.label,
            }));
          }}
        />
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
