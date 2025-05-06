import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import TextInput2 from "./Input";
import DropdownComponent from "./DropDown";
import ImagePickerExample from "./ImagePicker";
import { Divider } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CreateItem {
  setIsVisible: (isVisible: boolean) => void;
  ListName: string;
  CategoryName: string;
  setChangestate: any;
  changestate: any;
}
const alphabetImages = [
  { letter: "A", image: require("../assets/images/AlphabetsLetters/A.png") },
  { letter: "B", image: require("../assets/images/AlphabetsLetters/B.png") },
  { letter: "C", image: require("../assets/images/AlphabetsLetters/C.png") },
  { letter: "D", image: require("../assets/images/AlphabetsLetters/D.png") },
  { letter: "E", image: require("../assets/images/AlphabetsLetters/E.png") },
  { letter: "F", image: require("../assets/images/AlphabetsLetters/F.png") },
  { letter: "G", image: require("../assets/images/AlphabetsLetters/G.png") },
  { letter: "H", image: require("../assets/images/AlphabetsLetters/H.png") },
  { letter: "I", image: require("../assets/images/AlphabetsLetters/I.png") },
  { letter: "J", image: require("../assets/images/AlphabetsLetters/J.png") },
  { letter: "K", image: require("../assets/images/AlphabetsLetters/K.png") },
  { letter: "L", image: require("../assets/images/AlphabetsLetters/L.png") },
  { letter: "M", image: require("../assets/images/AlphabetsLetters/M.png") },
  { letter: "N", image: require("../assets/images/AlphabetsLetters/N.png") },
  { letter: "O", image: require("../assets/images/AlphabetsLetters/O.png") },
  { letter: "P", image: require("../assets/images/AlphabetsLetters/P.png") },
  { letter: "Q", image: require("../assets/images/AlphabetsLetters/Q.png") },
  { letter: "R", image: require("../assets/images/AlphabetsLetters/R.png") },
  { letter: "S", image: require("../assets/images/AlphabetsLetters/S.png") },
  { letter: "T", image: require("../assets/images/AlphabetsLetters/T.png") },
  { letter: "U", image: require("../assets/images/AlphabetsLetters/U.png") },
  { letter: "V", image: require("../assets/images/AlphabetsLetters/V.png") },
  { letter: "W", image: require("../assets/images/AlphabetsLetters/W.png") },
  { letter: "X", image: require("../assets/images/AlphabetsLetters/X.png") },
  { letter: "Y", image: require("../assets/images/AlphabetsLetters/Y.png") },
  { letter: "Z", image: require("../assets/images/AlphabetsLetters/Z.png") },
];

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

  const addItemToSubCategory = async (
    mainCategoryName: string,
    subCategoryName: string,
    newItem: { id: number; name: string; imgPath: string | null }
  ) => {
    try {
      const stored = await AsyncStorage.getItem("category_list");
      if (!stored) return;

      const categoryList = JSON.parse(stored);

      const updatedList = categoryList.map((mainCat: any) => {
        if (mainCat.name === mainCategoryName) {
          return {
            ...mainCat,
            Categories: mainCat.Categories.map((subCat: any) => {
              if (subCat.name === subCategoryName) {
                return {
                  ...subCat,
                  items: [...subCat.items, newItem],
                };
              }
              return subCat;
            }),
          };
        }
        return mainCat;
      });

      await AsyncStorage.setItem("category_list", JSON.stringify(updatedList));
      console.log("✅ Item successfully added!");
      setChangestate(changestate);
    } catch (error) {
      console.error("❌ Error while adding item:", error);
    }
  };
  const handleSaveItem = async () => {
    if (!listDescription) {
      setIsVisible(false)
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

      await addItemToSubCategory(ListName, CategoryName, newItem);
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
