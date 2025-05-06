import React, { useContext, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import circle from "../assets/images/circle.png";
import first from "../assets/images/SVG/dashboardgrocery.svg";
import seconed from "../assets/images/SVG/dashboardspiritualgoals.svg";
import third from "../assets/images/SVG/dashboardpersonalgromming.svg";
import fourth from "../assets/images/SVG/thingstodo.svg";
import fifth from "../assets/images/SVG/recipe.svg";
import TextInput2 from "./Input";
import { Divider } from "@rneui/base";
import { ProductContext } from "../Context/CardContext";

type CardDataType = {
  Picture: React.FC<any>;
  bgColor: string;
  badgeColor: string;
};

const Theme = ({
  setIsVisible,
}: {
  setIsVisible: (value: boolean) => void;
}) => {
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [selectedThemeIndex, setSelectedThemeIndex] = useState<number | null>(
    null
  ); // Store the index instead of the whole object
  const { ListStorefnc } = useContext(ProductContext);

  const cardDataArray = [
    {
      Picture: first,
      PictureName: 'first',
      bgColor: "#9DF4F4",
      badgeColor: "#008B94",
    },
    {
      Picture: seconed,
      PictureName: 'seconed',
      bgColor: "#98FBCB",
      badgeColor: "#4AA688",
    },
    {
      Picture: third,
      PictureName: 'third',
      bgColor: "#FEE5D7",
      badgeColor: "#C54B6C",
    },
    {
      Picture: fourth,
      PictureName: 'fourth',
      bgColor: "#FFCBA1CC",
      badgeColor: "#E36A4A",
    },
    {
      Picture: fifth,
      PictureName: 'fifth',
      bgColor: "#fddc8a",
      badgeColor: "#D88D1B",
    },
  ];

  const handleSave = () => {
    if (
      !listName.trim() ||
      !listDescription.trim() ||
      selectedThemeIndex === null
    ) {
      setIsVisible(false);
      return;
    }
  
    const selectedTheme = cardDataArray[selectedThemeIndex];
  
    ListStorefnc(
      listName,
      listDescription,
      selectedTheme.PictureName
    );
  
    setIsVisible(false);
  };
  

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.line}></View>
      <View style={styles.headerContainer}>
        <Text style={styles.signInText}>Add List</Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <Divider />
      <View style={styles.container2}>
        <TextInput2
          label={"Name:"}
          placeholder={"Write your list name"}
          value={listName}
          onChangeText={setListName}
        />
        <TextInput2
          label={"Description:"}
          placeholder={"Write your list Description"}
          value={listDescription}
          onChangeText={setListDescription}
        />
        <Text style={styles.signInText}>Select Background</Text>
        {cardDataArray.map((data, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            style={[
              styles.cardContainer,
              {
                backgroundColor: data.bgColor,
                borderWidth: selectedThemeIndex === index ? 4 : 0,
                borderColor:
                  selectedThemeIndex === index ? "#33a1de" : "transparent",
                borderRadius: 10,
              },
            ]}
            onPress={() => setSelectedThemeIndex(index)}
          >
            <View style={styles.contentContainer2}>
              <Image source={circle} style={styles.image2} />
              <View style={styles.image}>
                <data.Picture width={150} height={130} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    marginVertical: 20,
    gap: 20,
  },
  line: {
    marginTop: 10,
    height: 4,
    width: 65,
    borderRadius: 50,
    marginHorizontal: "auto",
    backgroundColor: "#5C5C5C",
  },
  headerContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
  cardContainer: {
    height: 148,
    width: "100%",
    borderRadius: 22,
    flex: 1,
    marginVertical: 2,
    overflow: "hidden",
    flexDirection: "row",
  },
  contentContainer2: {
    position: "relative",
    flex: 1,
    padding: 10,
  },
  image2: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "60%",
    maxWidth: "100%",
    height: "105%",
  },
  image: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  signInText: {
    color: "#5C5C5C",
    fontSize: 18,
    fontFamily: "OpenSans-Bold",
  },
  saveButton: {
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  saveButtonText: {
    color: "#5C5C5C",
    fontSize: 16,
    fontFamily: "OpenSans-Medium",
  },
});
