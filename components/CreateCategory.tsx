import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import TextInput2 from "./Input";
import images from "../constants/images";
import DropdownComponent from "./DropDown";
import { Divider } from "@rneui/base";
import { ProductContext } from "../Context/CardContext";
const { Sampledata } = images;

// remove ListName from props
interface CreateCategoryProps {
  setIsVisible: (isVisible: boolean) => void;
  categories: any;
  setIsBlur: any;
  isBlur: any;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({
  setIsVisible,
  categories,
  isBlur,
  setIsBlur,
}) => {
  const [listDescription, setListDescription] = useState<string>("");
  const [errors, setErrors] = useState({
    categoryName: "",
    listName: "",
  });

  const data = categories.map((category: any, index: any) => ({
    label: category,
    value: (index + 1).toString(),
  }));
  const [categoryCreation, SetCategoryCreation] = useState({
    name: "",
    image: "spiritualImage",
    id: 0,
    description: "Your Current Categories.",
    Categories: { id: 0, name: "", items: [] },
  });
  const { savecategoriesToAsyncStorage, changestate, setChangestate } =
    useContext(ProductContext);

  const savecategrories = () => {
    let hasError = false;
    let newErrors = {
      categoryName: "",
      listName: "",
    };

    if (categoryCreation.Categories.name.trim() === "") {
      newErrors.categoryName = "Category name is required.";
      hasError = true;
    }

    if (categoryCreation.name.trim() === "") {
      newErrors.listName = "Please select a list.";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    setChangestate(!changestate);
    setIsBlur(!isBlur);
    savecategoriesToAsyncStorage(categoryCreation);
    setIsVisible(false);
  };

  const Close = () => {
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <View style={styles.headerContainer}>
        <Text style={styles.signInText}>Add Category</Text>
        <View style={styles.containerCross}>
          <TouchableOpacity style={styles.saveButton}>
            <Text onPress={savecategrories} style={styles.saveButtonText}>
              Save
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text onPress={Close} style={styles.saveButtonText}>
              ❌
            </Text>
          </TouchableOpacity>
        </View>
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
          style={[
            {
              borderWidth: 1,
              borderColor: errors.categoryName ? "red" : "#ccc",
              borderRadius: 8,
              padding: 8,
            },
          ]}
        />
        {errors.categoryName ? (
          <Text style={{ color: "red", marginLeft: 10 }}>
            {errors.categoryName}
          </Text>
        ) : null}

        <DropdownComponent
          Label="List"
          Placeholder="Select a List"
          data={data}
          error={errors.listName}
          onChange={(item: any) => {
            SetCategoryCreation((prev) => ({
              ...prev,
              name: item.label,
            }));
            setErrors((prev) => ({ ...prev, listName: "" }));
          }}
        />
        {errors.listName ? (
          <Text style={{ color: "red", marginLeft: 10 }}>
            {errors.listName}
          </Text>
        ) : null}
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
  containerCross: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: 20,
    padding: 10,
    gap: 20, // gives space between buttons if supported
    alignItems: "center",
  },
});
