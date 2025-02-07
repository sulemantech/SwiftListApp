import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import SpiritualSVG from "../../assets/images/SVG/spiritualpage.svg";
import { SvgProps } from "react-native-svg"; // Import SvgProps for type safety
import { Image } from "expo-image";
const { width, height } = Dimensions.get("window");

const SpiritualIcon = SpiritualSVG as unknown as React.FC<SvgProps>;

const Categories = () => {
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

        <Text style={styles.caption2}>Category Description</Text>
      </View>

      {/* Static Category List */}
      <FlatList
        data={[
          { name: "Category 1" },
          { name: "Category 2" },
          { name: "Category 3" },
          { name: "Category 4" },
          { name: "Category 5" },
          { name: "Category 6" },
          { name: "Category 7" },
          { name: "Category 8" },
          { name: "Category 9" },
        ]}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        style={styles.subCategoriesContainer}
        renderItem={({ item }) => (
          <View style={styles.subCategoryItem}>
            <Text style={styles.subCategoryName}>{item.name}</Text>
          </View>
        )}
      />
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
    // marginTop: 20,
    alignItems: "center",
    width: "100%",
    // backgroundColor: "red",
  },
  caption2: {
    fontSize: 13,
    paddingVertical: 5,
    color: "#6c6c6c",
    textAlign: "center",
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
    height: height * 0.20,
    resizeMode: "contain",
  },
});
