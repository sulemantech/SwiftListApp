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
import back from "../assets/images/back-arrow.png";
import seconed from "../assets/images/SVG/dashboardspiritualgoals.svg";
import third from "../assets/images/SVG/dashboardpersonalgromming.svg";
import fourth from "../assets/images/SVG/thingstodo.svg";
import fifth from "../assets/images/SVG/recipe.svg";
import TextInput2 from "./Input";
// import { ProductContext } from '../../Context/CardContext';
// import SCREENS from '..';

const Theme = ({ setIsVisible }: { setIsVisible: (value: boolean) => void }) => {
  // const { setChangestate } = useContext(ProductContext);
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(null);

  const cardDataArray = [
    {
      Picture: first,
      bgColor: "#9DF4F4",
      badgeColor: "#008B94",
    },
    {
      Picture: seconed,
      bgColor: "#98FBCB",
      badgeColor: "#4AA688",
    },
    {
      Picture: third,
      bgColor: "#FEE5D7",
      badgeColor: "#C54B6C",
    },
    {
      Picture: fourth,
      bgColor: "#FFCBA1CC",
      badgeColor: "#E36A4A",
    },
    {
      Picture: fifth,
      bgColor: "#fddc8a",
      badgeColor: "#D88D1B",
    },
  ];

  const SelectedThemeSetting = () => {
    console.log("clicked");
    // setSelectedTheme({
    //     Picture: index === 0 ? 'first'
    //         : index === 1 ? 'seconed'
    //             : index === 2 ? 'third'
    //                 : index === 3 ? 'fourth'
    //                     : index === 4 ? 'fifth'
    //                         : null,
    //     bgColor: data.bgColor,
    //     badgeColor: data.badgeColor,
    // }
    // )
  };

  const saveListToStorage = async () => {
    try {
      if (!listName || !listDescription || !selectedTheme) {
        alert("Please complete all fields and select a theme.");
        return;
      }

      const newListItem = {
        title: listName,
        description: listDescription,
        items: "0 Items",
        percentagetext: "Bought 0%",
        percentage: 0,
        // Picture: selectedTheme.Picture,
        // bgColor: selectedTheme.bgColor,
        // badgeColor: selectedTheme.badgeColor,
      };

      const storedList = await AsyncStorage.getItem("userLists");
      const currentList = storedList ? JSON.parse(storedList) : [];

      const updatedList = [...currentList, newListItem];

      await AsyncStorage.setItem("userLists", JSON.stringify(updatedList));

      setListName("");
      setListDescription("");
      setSelectedTheme(null);
      // setChangestate(true);
      // navigation.replace(SCREENS.Dashbored);
    } catch (error) {
      console.error("Error saving list to local storage:", error);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
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
        <Text style={styles.signInText}>Please Select Theme</Text>
        {cardDataArray.map((data, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            style={[
              styles.cardContainer,
              {
                backgroundColor: data.bgColor,
                //   borderWidth: selectedTheme?.Picture === (index === 0 ? 'first' : index === 1 ? 'seconed' : index === 2 ? 'third' : index === 3 ? 'fourth' : 'fifth')
                //       ? 4
                //       : 0,
                //   borderColor: selectedTheme?.Picture === (index === 0 ? 'first' : index === 1 ? 'seconed' : index === 2 ? 'third' : index === 3 ? 'fourth' : 'fifth')
                //       ? '#33a1de'
                //       : 'transparent',
                //   borderRadius: 10,
              },
            ]}
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
    marginHorizontal: 0,
    marginBottom: 30,
    gap: 6,
  },
  headerContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "6%",
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
