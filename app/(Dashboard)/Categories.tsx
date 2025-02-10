import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
} from "react-native";
// import back from '../../assets/images/back-arrow.png';
// import heart from '../../assets/images/heartIcon.png';
// import arrowRight from '../../assets/images/arrownotactive.png';
// import arrowRightactive from '../../assets/images/arrowactive.png';
import searchicon from "../../assets/images/searchiconactive.png";
import searchiconBlack from "../../assets/images/searchiconnotactive.png";

import PersonalGroomingSVG from "../../assets/images/SVG/pgrommingpage.svg";

import { categories } from "../../constants/Data";
import TextInput2 from "../../components/Input";
// import { ProductContext } from '../../Context/CardContext';
// import ProductList from './Products';
import Header from "../../components/Header";
import CIrcleWithchevron from "../../components/CIrcleWithchevron";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

const Categories = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [pressedItem, setPressedItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemclicked, setItemclicked] = useState(true);
  // const { selectedProducts } = useContext(ProductContext);
  const handleProductSelect = () => {
    setItemclicked(!itemclicked);
  };

  // useEffect(() => {
  //   setSelectedItem(selectedProducts[ListName])
  // }, [selectedProducts])

  const matchingCategory = categories.find(
    (categoryObj) => categoryObj.category.name.toLowerCase() === name
  );

  // const filterItems = useCallback(
  //   (content) => {
  //     const searchQuery = content.toLowerCase();
  //     if (!searchQuery) {
  //       return setFilteredItems([]);
  //     }

  //     const allItems = matchingCategory.subCategories.flatMap(subCategory => subCategory.items);
  //     const filteredItemsArray = allItems.filter(
  //       item =>
  //         item.name.toLowerCase().startsWith(searchQuery) ||
  //         item.name.toLowerCase().includes(searchQuery),
  //     );

  //     setFilteredItems(filteredItemsArray);
  //   },
  //   [matchingCategory],
  // );

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const backAction = () => {
  //       onBackPress();
  //       return true;
  //     };

  //     const backHandler = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       backAction
  //     );

  //     return () => backHandler.remove();
  //   }, [onBackPress])
  // );
  const { name } = useLocalSearchParams();

  // Ensure name is always a string
  const formattedName =
    (Array.isArray(name) ? name[0] : name)?.replace(/\s+/g, "").toLowerCase() +
    "image";

  const imageMap: Record<string, any> = {
    groceryimage: require("../../assets/images/SVG/grocerypage.svg"),
    spiritualimage: require("../../assets/images/SVG/spiritualpage.svg"),
    personalgroomingimage: require("../../assets/images/SVG/pgrommingpage.svg"),
    thingstodoimage: require("../../assets/images/SVG/thingstodopage.svg"),
    kitchenmenuimage: require("../../assets/images/SVG/kitchenpage.svg"),
  };

  const SelectedImageComponent =
    imageMap[formattedName] || imageMap.groceryimage;

  return (
    <TouchableWithoutFeedback
    // onPress={() => {
    //   setIsSearchFocused(false);
    //   Keyboard.dismiss();
    // }}
    >
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#52C2FE"
          // barStyle={"dark-content"}
          // showHideTransition={statusBarTransition}
        />
        <Header onBack={router.back} title={name} />

        {/* <View style={styles.categoryContainer}> */}
        <View
          style={
            isSearchFocused
              ? styles.serachFocused_categoryContainer
              : styles.categoryContainer
          }
        >
          {!isSearchFocused && SelectedImageComponent && (
            <Image
              source={SelectedImageComponent}
              style={styles.categoryImage}
            />
          )}
          {!isSearchFocused && !SelectedImageComponent && (
            <View style={styles.categoryImage}>
              <PersonalGroomingSVG />
            </View>
          )}
          {!isSearchFocused && (
            <Text style={styles.caption2}>
              {matchingCategory
                ? matchingCategory.category.description
                : categories[0].category.description}
            </Text>
          )}
          {/* {!isSearchFocused && SelectedImageComponent && (
            <Image
              source={SelectedImageComponent}
              style={styles.categoryImage}
            />
          )} */}

          {/* <View
            style={
              isSearchFocused
                ? styles.search_focused_searchContainer
                : styles.searchContainer
            }
          > */}
          <View
            style={[
              styles.searchContainerBase,
              isSearchFocused && styles.search_focused_searchContainer,
              !isSearchFocused && styles.searchContainer,
            ]}
          >
            {/* <View style={styles.searchContainer}> */}
            {/* <TextInput2
              borderRadius={40}
              bgColor={isSearchFocused ? "#FFF" : "#007AFF"}
              placeholder={"Search items here..."}
              fontsize={16}
              // onChangeText={text => filterItems(text)}
              style={styles.searchInput}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            /> */}
            <TextInput2
              borderRadius={40}
              placeholder={"Search items here..."}
              fontsize={16}
              style={[
                styles.searchInput,
                { backgroundColor: isSearchFocused ? "#FFF" : "#9DF4F4" },
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

        <FlatList
          data={
            matchingCategory
              ? matchingCategory.subCategories
              : categories[0].subCategories
          }
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          style={styles.subCategoriesContainer}
          renderItem={({ item }) => (
            <TouchableHighlight
              // onPress={() => {
              //   setPressedItem(item.name);
              //   navigation.navigate('ProductsPage', { myStringProp: item.name, ListName: ListName });
              // }}
              activeOpacity={1}
              underlayColor="#fff"
              style={styles.subCategoryItem}
            >
              <View style={styles.subCategoryContent}>
                <Text style={styles.subCategoryName}>{item.name}</Text>
                {/* <Image source={pressedItem === item.name ? arrowRightactive : arrowRight} style={styles.arrowRight} /> */}
                <CIrcleWithchevron chevronColor={"#52C2FE"} />
              </View>
            </TouchableHighlight>
          )}
          // ListHeaderComponent={
          //   filteredItems.length > 0 ? (
          //     <ProductList products={filteredItems} ListName={ListName} onProductSelect={handleProductSelect} page="itemslist" />
          //   ) : (
          //     Array.isArray(selectedItem) && selectedItem.length > 0 ? (
          //       <ProductList products={selectedItem} ListName={ListName} onProductSelect={handleProductSelect} page="itemslist" />
          //     ) : (
          //       null
          //     )
          //   )
          // }
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF9FF",
    alignItems: "center",
  },
  caption2: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    paddingVertical: "0.4%",
    paddingHorizontal: "4%",
    color: "#6c6c6c",
    fontWeight: "300",
    lineHeight: 23,
    textAlign: "center",
  },
  categoryContainer: {
    // marginTop: height * 0.08,
    alignItems: "center",
    width: "100%",
    height: "38%",
    // backgroundColor: "green",
  },
  serachFocused_categoryContainer: {
    top: 0,
    // backgroundColor: "red",
    alignItems: "center",
    width: "100%",
    height: "8%",
    marginBottom: "3%",
  },

  categoryImage: {
    width: width * 0.4,
    height: height * 0.25,
    resizeMode: "contain",
    // backgroundColor:"red"
  },
  searchContainerBase: {
    width: "95%",
    height: "17%",
    position: "relative",
    top: 10,
    // backgroundColor: "red",
  },
  searchContainer: {
    // backgroundColor: "green", // Default background
  },
  search_focused_searchContainer: {
    width: "95%",
    height: "120%",
    // backgroundColor: "black", // Background when focused
  },
  searchInput: {
    width: "95%",
    height: "100%",
    // backgroundColor: "red",
    borderRadius: 40,
    paddingHorizontal: "4.3%",
    marginHorizontal: "2%",
  },
  subCategoriesContainer: {
    marginTop: 20,
    marginBottom: 80,
    width: "95%",
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
    right: 20,
  },
  searchicon: {
    width: "100%",
    height: "100%",
    // paddingRight:"9%",

    // backgroundColor: "red",
  },
  subCategoryItem: {
    marginBottom: 10,
    minHeight: 50,
    padding: 10,
    marginHorizontal: "2%",
    // backgroundColor: "red",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderBottomColor: "#007AFF15",
    borderBottomWidth: 5,
  },
  subCategoryContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
  },
  subCategoryName: {
    fontFamily: "Poppins-Light",
    fontSize: 16,
    fontWeight: "300",
    lineHeight: 24,
    color: "#6C6C6C",
  },
  arrowRight: {
    width: 32,
    height: 32,
  },
});
