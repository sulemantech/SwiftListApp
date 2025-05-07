import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import TextInput2 from "./Input";
import DropdownComponent from "./DropDown";
import ImagePickerExample from "./ImagePicker";
import { Divider } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { alphabetImages } from "@/constants/images";
import { addItemToSubCategory } from "./AddItemFunction";

interface CreateItem {
  setIsVisible: (isVisible: boolean) => void;
  ListName: string;
  CategoryName: string;
  setChangestate: any;
  changestate: any;
}

const CreateItem: React.FC<CreateItem> = ({
  setIsVisible,
  ListName,
  CategoryName,
  setChangestate,
  changestate,
}) => {
  const [listDescription, setListDescription] = useState<string>("");
  const firstLetter = listDescription.trim().charAt(0).toUpperCase();
  const matchingImage = alphabetImages.find(
    (item) => item.letter === firstLetter
  );

  const handleSaveItem = async () => {
    if (!listDescription) {
      setIsVisible(false);
      return;
    }

    try {
      const stored = await AsyncStorage.getItem("category_list");
      if (!stored) return;

      const categoryList = JSON.parse(stored);

      let maxId = 0;

      categoryList.forEach((mainCat: any) => {
        if (mainCat.name === ListName) {
          mainCat.Categories.forEach((subCat: any) => {
            if (subCat.name === CategoryName) {
              subCat.items.forEach((item: any) => {
                if (typeof item.id === "number" && item.id > maxId) {
                  maxId = item.id;
                }
              });
            }
          });
        }
      });

      const newItem = {
        id: maxId ? maxId + 1 : 1,
        name: listDescription,
        imgPath: matchingImage ? matchingImage.image : null,
      };

      await addItemToSubCategory(
        ListName,
        CategoryName,
        newItem,
        changestate,
        setChangestate
      );
      setIsVisible(false);
    } catch (error) {
      console.error("❌ Error while saving item:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <View style={styles.headerContainer}>
        <Text style={styles.signInText}>Add Item</Text>
        <TouchableOpacity style={styles.saveButton}>
          <Text onPress={handleSaveItem} style={styles.saveButtonText}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
      <Divider />
      {listDescription && matchingImage && (
        <View
          style={[styles.productCard, { alignItems: "center", marginTop: 10 }]}
        >
          <Image
            source={matchingImage.image}
            style={{ width: 60, height: 60, resizeMode: "contain" }}
          />
          <Text style={{ marginTop: 5, color: "#ffffff" }}> {firstLetter}</Text>
        </View>
      )}

      <View style={styles.container2}>
        <TextInput2
          label={"Name:"}
          placeholder={"Enter item Name"}
          value={listDescription}
          onChangeText={setListDescription}
        />
        {/* <DropdownComponent Label="Select List" Placeholder="Select" data={categories} />
        <DropdownComponent Label="Select category" Placeholder="Select" data={categories} /> */}
        {/* <View>
          <Text>Add Icon</Text>
          <ImagePickerExample />
        </View> */}
      </View>
    </View>
  );
};

export default CreateItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productCard: {
    backgroundColor: "#A9A0F0",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
    width: 100,
    borderRadius: 10,
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
