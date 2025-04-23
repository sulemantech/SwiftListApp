import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
} from "react-native";
import searchicon from "../../assets/images/SVG/searchiconactive.svg";
import searchiconBlack from "../../assets/images/SVG/searchiconnotactive.svg";
import { MyListCollection } from "../../constants/Data";
import TextInput2 from "../../components/Input";
import Header from "../../components/Header";
import CIrcleWithchevron from "../../components/CIrcleWithchevron";
import {
  useRouter,
  useLocalSearchParams,
  ExternalPathString,
} from "expo-router";
import { Image } from "expo-image";
import PersonalGroomingSVG from "../../assets/images/SVG/pgrommingpage.svg";
import GrocerySVG from "../../assets/images/SVG/grocerypage.svg";
import SpiritualSVG from "../../assets/images/SVG/spiritualpage.svg";
import ThingsToDoSVG from "../../assets/images/SVG/thingstodopage.svg";
import KitchenSVG from "../../assets/images/SVG/kitchenpage.svg";
import ProductList from "../products/Products";
import { ProductContext } from "@/Context/CardContext";

const { width, height } = Dimensions.get("window");

interface Props {
  ListName: string;
}

const Categories: React.FC<Props> = ({ ListName }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Tracks search input text
  const [filteredItems, setFilteredItems] = useState<any[]>([]); // ✅ Stores matching items during search
  const [allItems, setAllItems] = useState<any[]>([]); // ✅ Stores all products across subcategories
  const [pressedItem, setPressedItem] = useState("");
  const [selectedItem, setSelectedItem] = useState<any[]>([]); // original selected items
  const [itemclicked, setItemclicked] = useState(true);

  const router = useRouter();
  const { selectedProducts } = useContext(ProductContext);
  const { name , id } = useLocalSearchParams();
  const currentID = Number(id)

  const matchingCategory = MyListCollection.find((categoryObj) => {
    const categoryID = categoryObj.id;
    return (
      categoryID == Number(id)
    );
  });

  // ✅ Get all products from this category once
  // useEffect(() => {
  //   if (!matchingCategory) return;

  //   const items =
  //     matchingCategory.Categories?.flatMap(
  //       (subCategory) => subCategory.items
  //     ) || [];
  //   }, [matchingCategory]);
    
    // ✅ Set selected items based on selectedProducts context
    useEffect(() => {
      if (!matchingCategory || !selectedProducts) return;
      
      const allItems =
      matchingCategory.Categories?.flatMap(
        (subCategory) => subCategory.items
      ) || [];
      setAllItems(allItems);

    const selectedNames =
      selectedProducts[currentID]?.map((product: any) => product.id) || [];

    const filteredItems = allItems.filter((item) =>
      selectedNames.includes(item.id)
    );

    const uniqueItems = filteredItems.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.name === item.name)
    );

    setSelectedItem(uniqueItems); // used when searchQuery is empty
  }, [selectedProducts, matchingCategory]);

  // ✅ Filter logic based on searchQuery
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredItems([]); // show selected items if query is empty
      return;
    }

    const filtered = allItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredItems(filtered); // update search results
  }, [searchQuery, allItems]);
  const formattedName =
    (Array.isArray(name) ? name[0] : name)?.replace(/\s+/g, "").toLowerCase() +
    "image";

  const imageMap: Record<string, React.ElementType | null> = {
    groceryimage: GrocerySVG,
    spiritualimage: SpiritualSVG,
    personalgroomingimage: PersonalGroomingSVG,
    thingstodoimage: ThingsToDoSVG,
    kitchenmenuimage: KitchenSVG,
  };
    useEffect(()=>{
      console.log(selectedItem , " -=-=-=-=-=--==-=-=-=-=-=-=-=----------------")
    },[selectedItem])

  const SelectedImageComponent = imageMap[formattedName] || GrocerySVG;

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Header
          // onBack={() => router.replace("/(Dashboard)/Home")}
          onBack={() => router.back()}
          title={name}
        />
        <View style={styles.divider} />

        {/* ✅ Banner section (image + description) shown only when not searching */}
        <View
          style={
            isSearchFocused
              ? styles.serachFocused_categoryContainer
              : styles.categoryContainer
          }
        >
          {!isSearchFocused && SelectedImageComponent && (
            <View style={styles.categoryWrapper}>
              <View style={styles.categoryImage}>
                <SelectedImageComponent />
              </View>
              <View style={styles.captionContainer}>
                <Text style={styles.caption2}>
                  {matchingCategory
                    ? matchingCategory.description
                    : MyListCollection[0].description}
                </Text>
              </View>
            </View>
          )}

          {!isSearchFocused && !SelectedImageComponent && (
            <View style={styles.categoryImage}>
              <PersonalGroomingSVG width={100} height={100} />
            </View>
          )}

          {/* {!isSearchFocused && (
            <Text style={styles.caption2}>
              {matchingCategory
                ? matchingCategory.List.description
                : MyListCollection[0].List.description}
            </Text>
          )} */}
        </View>

        {/* ✅ Search Input */}
        <View
          style={[
            styles.searchContainerBase,
            !isSearchFocused && styles.searchContainer,
          ]}
        >
          {/* <TextInput2
            borderRadius={40}
            placeholder={"Search items here..."}
            placeholderTextColor={"black"}
            fontsize={16}
            style={[
              styles.searchInput,
              {
                backgroundColor: isSearchFocused ? "#FFF" : "#CBC3FB80",
                opacity: isSearchFocused ? 1 : 0.5,
                borderColor: isSearchFocused ? "red" : "red",
              },
            ]}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          /> */}
          <TextInput2
            borderRadius={40}
            placeholder={"Search items here..."}
            placeholderTextColor={"black"}
            fontsize={13}
            style={
              isSearchFocused ? styles.searchInputFocused : styles.searchInput
            }
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />

          {/* ✅ Search icon toggle */}
          <View style={styles.searchiconContainer}>
            {typeof searchicon === "function" ? (
              <View style={styles.searchicon}>
                {isSearchFocused
                  ? React.createElement(searchicon, {
                      width: "100%",
                      height: "100%",
                    })
                  : React.createElement(searchiconBlack, {
                      width: "100%",
                      height: "100%",
                    })}
              </View>
            ) : (
              <Image
                source={isSearchFocused ? searchicon : searchiconBlack}
                style={styles.searchicon}
              />
            )}
          </View>
        </View>

        {/* ✅ Optional message if nothing matches */}
        {searchQuery.trim() && filteredItems.length === 0 && (
          <Text style={{ textAlign: "center", color: "gray", marginTop: 10 }}>
            No matching items found.
          </Text>
        )}

        {/* ✅ Product list (filtered or selected) + subcategories */}
        <FlatList
          data={
            matchingCategory
              ? matchingCategory.Categories
              : MyListCollection[0].Categories
          }
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          style={styles.subCategoriesContainer}
          // 🛠 Updated renderItem here to support color change
          renderItem={({ item }) => {
            const isSelected = pressedItem === item.name; // ✅ check if this item is pressed/selected

            return (
              <TouchableHighlight
                onPress={() => {
                  setPressedItem(item.name); // ✅ set pressed item name
                  router.push({
                    pathname: "/products/ProductsPage" as ExternalPathString,
                    params: { categoryName : item.name, ListName: name , CategoryID : item.id , ListID : currentID},
                  });
                }}
                activeOpacity={1}
                underlayColor="#fff"
                style={styles.subCategoryItem}
              >
                <View style={styles.subCategoryContent}>
                  <Text style={styles.subCategoryName}>{item.name}</Text>
                  {/* 🛠 Updated CIrcleWithchevron color based on selected item */}
                  <CIrcleWithchevron
                    chevronColor={isSelected ? "#A9A0F0" : "#F3F3FD"}
                    isSelected={isSelected} // 🛠 New prop to control inside chevron color
                  />
                </View>
              </TouchableHighlight>
            );
          }}
          ListHeaderComponent={
            <ProductList
              products={searchQuery.trim() ? filteredItems : selectedItem}
              ListName={name}
              ListID={currentID}
              page=""
              showBottomSheet={!searchQuery.trim()} // 🟢 Add this line
            />
          }
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#EFF9FF",
    backgroundColor: "#FFFFFF",

    alignItems: "center",
    justifyContent: "center",
  },
  categoryWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    // height: "90%",
    marginTop: 15,
    // backgroundColor:"red"
  },
  caption2: {
    fontFamily: "OpenSans-Regular",
    fontSize: 13,
    // paddingVertical: "2%",
    paddingHorizontal: "4%",
    marginTop: 15,
    color: "#6c6c6c",
    fontWeight: "300",
    lineHeight: 23,
    textAlign: "center",
  },
  categoryContainer: {
    // marginTop: height * 0.08,
    // justifyContent:"center",
    alignItems: "center",
    width: "100%",
    // height: "38%",
    // backgroundColor: "green",
  },
  categoryImage: {
    width: 146.36,
    height: 118.39,
    resizeMode: "cover",
  },

  searchContainer: {
    // borderColor: "#CBC3FB80",
    alignItems: "center",
    justifyContent: "center",
  },

  // searchInput: {
  //   width: "95%",
  //   // height: "100%",
  //   // backgroundColor: "red",
  //   borderRadius: 40,
  //   paddingHorizontal: "4.3%",
  //   marginHorizontal: "2%",
  //   // opacity: 0.5,
  // },
  serachFocused_categoryContainer: {
    top: 0,
    // backgroundColor: "red",

    width: "100%",
    // height: "8%",
    // marginBottom: "3%",
    marginTop: "2%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },

  // searchContainerBase: {
  //   width: "95%",
  //   marginBottom: 10,
  //   // height: "15%",
  //   // position: "relative",

  //   // backgroundColor: "green",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  searchContainerBase: {
    width: "90%", // Adjusted width to leave equal space on both sides
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 29.62,
  },
  // searchInput: {
  //   width: "95%", // Ensures it remains the same in both states
  //   height: 45, // Fixed height
  //   borderRadius: 40,
  //   paddingHorizontal: "4.3%",
  //   marginHorizontal: "2%",
  //   // backgroundColor: "red",
  // },
  searchInput: {
    width: "100%", // Full width inside the search container
    height: 45,
    borderRadius: 40,
    paddingHorizontal: 15, // Ensures equal left/right padding
    backgroundColor: "#CBC3FB80",
    opacity: 0.5,
    borderWidth: 1,
    borderColor: "transparent",
  },

  // subCategoriesContainer: {
  //   marginTop: 20,
  //   marginBottom: 80,
  //   width: "100%",
  //   backgroundColor:"red"
  // },
  subCategoriesContainer: {
    flex: 1, // Ensures it takes all available space
    width: "100%", // Full width
    // paddingHorizontal: 10, // Adjust as needed
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
    right: 10,
  },
  searchicon: {
    width: "100%",
    height: "100%",
    // paddingRight:"9%",

    // backgroundColor: "red",
  },
  subCategoryItem: {
    // marginTop: 1,
    marginBottom: 10,
    minHeight: 50,
    padding: 10,
    // marginHorizontal: "6%",
    paddingHorizontal: "5.5%",
    // backgroundColor: "red",
    // backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderBottomColor: "#E7E7E7",

    borderBottomWidth: 1,
    // backgroundColor:"red"
  },
  subCategoryContent: {
    top: -3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    // backgroundColor: "red",
  },
  subCategoryName: {
    fontFamily: "OpenSans-Medium",
    fontSize: 16,
    lineHeight: 24,
    color: "#5C5C5C",
  },
  arrowRight: {
    width: 32,
    height: 32,
  },
  captionContainer: {
    width: "80%", // Ensures it is wider than the image
    alignItems: "center",
    marginTop: 10, // Ensures it's below the image
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
    // marginVertical: 10,
    marginTop: 21,
  },
  searchInputFocused: {
    backgroundColor: "#FFF", // Focused background color
    opacity: 1, // Full opacity
    borderColor: "#A9A0F0", // Border color on focus
    width: "99%",
    top: -1.5,
  },
});

