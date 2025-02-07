import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import SpiritualSVG from "../../assets/images/SVG/spiritualpage.svg";
import searchicon from "../../assets/images/searchiconactive.png";
import searchiconBlack from "../../assets/images/searchiconnotactive.png";
import arrowRight from "../../assets/images/arrownotactive.png";
import heart from "../../assets/images/heartIcon.png";
import { SvgProps } from "react-native-svg"; // Import SvgProps for type safety
import { Image } from "expo-image";
import TextInput2 from "../../components/Input";

const { width, height } = Dimensions.get("window");

const SpiritualIcon = SpiritualSVG as unknown as React.FC<SvgProps>;

const Categories = () => {
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  function filterItems(text: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <View style={styles.container}>
      {/* Static Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Categories</Text>
      </View>

      {/* Static Category Image */}
      <View style={styles.categoryContainer}>
        <View>
          {/* <SpiritualIcon width={100} height={100} /> */}
          <Image source={SpiritualIcon} style={styles.main_image} />
        </View>

        <Text style={styles.caption2}>
          Scroll to the predefined categories or Search them freely
        </Text>
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <TextInput2
            borderRadius={40}
            placeholder={"Search items here..."}
            fontsize={16}
            // onChangeText={text => filterItems(text)}
            style={[
              styles.searchInput,
              {
                backgroundColor: isSearchFocused ? "#FFF" : "#9CF6FF",
              },
            ]}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          <View style={styles.searchiconContainer}>
            <Image
              source={isSearchFocused ? searchicon : searchiconBlack}
              style={styles.searchicon}
            />
          </View>
        </View>
      </View>

      {/* Static Category List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.subCategoriesContainer}
      >
        {[
          { name: "Category 1" },
          { name: "Category 2" },
          { name: "Category 3" },
          { name: "Category 4" },
          { name: "Category 5" },
          { name: "Category 6" },
          { name: "Category 7" },
          { name: "Category 8" },
          { name: "Category 9" },
        ].map((item, index) => (
          <View key={index.toString()} style={styles.subCategoryItem}>
            <Text style={styles.subCategoryName}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF9FF",
    alignItems: "center",
  },
  header: {
    marginTop: 30,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  categoryContainer: {
    marginTop: height * 0.08,
    alignItems: "center",
    width: "100%",
    // overflow: "hidden",
  },
  caption2: {
    fontSize: 13,
    paddingVertical: 5,
    color: "#6c6c6c",
    textAlign: "center",
    // fontFamily: "Poppins-Regular",
    // fontSize: 13,
    // paddingVertical: "0.4%",
    // paddingHorizontal: "4%",
    // color: "#6c6c6c",
    // fontWeight: "300",
    // lineHeight: 23,
    // textAlign: "center",
  },
  subCategoriesContainer: {
    marginTop: 20,
    width: "95%",
  },
  subCategoryItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderBottomColor: "#007AFF15",
    borderBottomWidth: 5,
  },
  subCategoryName: {
    fontSize: 16,
    color: "#6C6C6C",
  },
  main_image: {
    width: width * 0.5,
    height: height * 0.2,
    resizeMode: "contain",
  },
  searchContainer: {
    flexDirection: "row",
    width: "95%",
    position: "relative",
    // backgroundColor: "red",
    // padding: 10,
  },
  searchicon: {
    width: "100%",
    height: "100%",
    // backgroundColor: "red",
  },

  searchiconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    aspectRatio: 1,
    borderRadius: 100,
    overflow: "hidden",
    position: "absolute",
    top: "10%",
    // backgroundColor: "red",
    right: 10,
  },
  searchInput: {
    width: "100%",
    borderRadius: 40,
    padding: 15,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#007AFF15",
  },
});
