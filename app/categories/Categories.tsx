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
  const { name } = useLocalSearchParams();

  const matchingCategory = MyListCollection.find((categoryObj) => {
    const categoryName = categoryObj.name ?? categoryObj.name;
    return (
      categoryName?.toLowerCase() ===
      (Array.isArray(name) ? name[0] : name)?.toLowerCase()
    );
  });

  // ✅ Get all products from this category once
  useEffect(() => {
    if (!matchingCategory) return;

    const items =
      matchingCategory.Categories?.flatMap(
        (subCategory) => subCategory.items
      ) || [];
    setAllItems(items); // store all category items for later filtering
  }, [matchingCategory]);

  // ✅ Set selected items based on selectedProducts context
  useEffect(() => {
    if (!matchingCategory || !selectedProducts) return;

    const allItems =
      matchingCategory.Categories?.flatMap(
        (subCategory) => subCategory.items
      ) || [];

    const listKey = Array.isArray(name) ? name[0] : name;

    const selectedNames =
      selectedProducts[listKey]?.map((product: any) => product.name) || [];

    const filteredItems = allItems.filter((item) =>
      selectedNames.includes(item.name)
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

  const SelectedImageComponent = imageMap[formattedName] || GrocerySVG;
  console.log(selectedItem, "selectedItem");

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
                    params: { myStringProp: item.name, ListName: name },
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

// import React, { useState, useCallback, useEffect, useContext } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableHighlight,
//   TouchableWithoutFeedback,
//   Dimensions,
//   FlatList,
// } from "react-native";
// import searchicon from "../../assets/images/SVG/searchiconactive.svg";
// // import searchiconBlack from "../../assets/images/searchiconnotactive.png";
// import searchiconBlack from "../../assets/images/SVG/searchiconnotactive.svg";
// import { MyListCollection } from "../../constants/Data";
// import TextInput2 from "../../components/Input";
// import ProductsPage from "@/app/products/ProductsPage";
// // import { ProductContext } from '../../Context/CardContext';
// // import ProductList from './Products';
// import Header from "../../components/Header";
// import CIrcleWithchevron from "../../components/CIrcleWithchevron";
// import { router, useLocalSearchParams } from "expo-router";
// import { Image } from "expo-image";
// import { StatusBar } from "expo-status-bar";
// import { useRouter } from "expo-router";
// import PersonalGroomingSVG from "../../assets/images/SVG/pgrommingpage.svg";
// import GrocerySVG from "../../assets/images/SVG/grocerypage.svg";
// import SpiritualSVG from "../../assets/images/SVG/spiritualpage.svg";
// import ThingsToDoSVG from "../../assets/images/SVG/thingstodopage.svg";
// import KitchenSVG from "../../assets/images/SVG/kitchenpage.svg";

// const { width, height } = Dimensions.get("window");

// interface Props {
//   ListName: string;
// }

// // const Categories = () => {
// const Categories: React.FC<Props> = ({ ListName }) => {
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const [filteredItems, setFilteredItems] = useState([]);
//   // const [pressedItem, setPressedItem] = useState(null);
//   const [pressedItem, setPressedItem] = useState("");
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [itemclicked, setItemclicked] = useState(true);
//   // const { selectedProducts } = useContext(ProductContext);

//   // Inside your component:
//   const router = useRouter();
//   const handleProductSelect = () => {
//     setItemclicked(!itemclicked);
//   };

//   // useEffect(() => {
//   //   setSelectedItem(selectedProducts[ListName])
//   // }, [selectedProducts])
//   const { name } = useLocalSearchParams();

//   const matchingCategory = MyListCollection.find(
//     (categoryObj) =>
//       categoryObj.List.name.toLowerCase() ===
//       (Array.isArray(name) ? name[0] : name)?.toLowerCase()
//   );

//   // const filterItems = useCallback(
//   //   (content) => {
//   //     const searchQuery = content.toLowerCase();
//   //     if (!searchQuery) {
//   //       return setFilteredItems([]);
//   //     }

//   //     const allItems = matchingCategory.Categories.flatMap(subCategory => subCategory.items);
//   //     const filteredItemsArray = allItems.filter(
//   //       item =>
//   //         item.name.toLowerCase().startsWith(searchQuery) ||
//   //         item.name.toLowerCase().includes(searchQuery),
//   //     );

//   //     setFilteredItems(filteredItemsArray);
//   //   },
//   //   [matchingCategory],
//   // );

//   // useFocusEffect(
//   //   React.useCallback(() => {
//   //     const backAction = () => {
//   //       onBackPress();
//   //       return true;
//   //     };

//   //     const backHandler = BackHandler.addEventListener(
//   //       'hardwareBackPress',
//   //       backAction
//   //     );

//   //     return () => backHandler.remove();
//   //   }, [onBackPress])
//   // );

//   // Ensure name is always a string
//   const formattedName =
//     (Array.isArray(name) ? name[0] : name)?.replace(/\s+/g, "").toLowerCase() +
//     "image";

//   // const imageMap: Record<string, any> = {
//   //   groceryimage: require("../../assets/images/SVG/grocerypage.svg"),
//   //   spiritualimage: require("../../assets/images/SVG/spiritualpage.svg"),
//   //   personalgroomingimage: require("../../assets/images/SVG/pgrommingpage.svg"),
//   //   thingstodoimage: require("../../assets/images/SVG/thingstodopage.svg"),
//   //   kitchenmenuimage: require("../../assets/images/SVG/kitchenpage.svg"),
//   // };
//   const imageMap: Record<string, React.FC | null> = {
//     groceryimage: GrocerySVG,
//     spiritualimage: SpiritualSVG,
//     personalgroomingimage: PersonalGroomingSVG,
//     thingstodoimage: ThingsToDoSVG,
//     kitchenmenuimage: KitchenSVG,
//   };

//   // const SelectedImageComponent =
//   // imageMap[formattedName] || imageMap.groceryimage;
//   const SelectedImageComponent = imageMap[formattedName] || GrocerySVG;

//   return (
//     <TouchableWithoutFeedback
//     // onPress={() => {
//     //   setIsSearchFocused(false);
//     //   Keyboard.dismiss();
//     // }}
//     >
//       <View style={styles.container}>
//         {/* <StatusBar
//           animated={true}
//           backgroundColor="#52C2FE"
//           // barStyle={"dark-content"}
//           // showHideTransition={statusBarTransition}
//         /> */}
//         {/* <Header onBack={router.back} title={name} /> */}
//         <Header
//           onBack={() => router.replace("/(Dashboard)/Home")}
//           title={name}
//         />

//         {/* <View style={styles.categoryContainer}> */}
//         <View
//           style={
//             // styles.categoryContainer
//             isSearchFocused
//               ? styles.serachFocused_categoryContainer
//               : styles.categoryContainer
//           }
//         >
//           {/* {!isSearchFocused && SelectedImageComponent && (
//             <Image
//               source={SelectedImageComponent}
//               style={styles.categoryImage}
//             />
//           )} */}
//           {/* remove code */}
//           {/* {!isSearchFocused && !SelectedImageComponent && (
//             <View style={styles.categoryImage}>
//               <PersonalGroomingSVG />
//             </View>
//           )}
//           {!isSearchFocused && (
//             <Text style={styles.caption2}>
//               {matchingCategory
//                 ? matchingCategory.List.description
//                 : MyListCollection[0].List.description}
//             </Text>
//           )}
//           {!isSearchFocused && SelectedImageComponent && (
//             <Image
//               source={SelectedImageComponent}
//               style={styles.categoryImage}
//             />
//           )} */}
//           {/* updated code */}
//           {!isSearchFocused && SelectedImageComponent && (
//             <View style={styles.categoryImage}>
//               <SelectedImageComponent />
//             </View>
//           )}
//           {!isSearchFocused && !SelectedImageComponent && (
//             <View style={styles.categoryImage}>
//               <PersonalGroomingSVG width={100} height={100} />
//             </View>
//           )}

//           {!isSearchFocused && (
//             <Text style={styles.caption2}>
//               {matchingCategory
//                 ? matchingCategory.List.description
//                 : MyListCollection[0].List.description}
//             </Text>
//           )}

//           {/* <View
//             style={
//               isSearchFocused
//                 ? styles.search_focused_searchContainer
//                 : styles.searchContainer
//             }
//           > */}
//           <View
//             style={[
//               styles.searchContainerBase,
//               isSearchFocused,
//               // && styles.search_focused_searchContainer,
//               !isSearchFocused && styles.searchContainer,
//             ]}
//           >
//             {/* <View style={styles.searchContainer}> */}
//             {/* <TextInput2
//               borderRadius={40}
//               bgColor={isSearchFocused ? "#FFF" : "#007AFF"}
//               placeholder={"Search items here..."}
//               fontsize={16}
//               // onChangeText={text => filterItems(text)}
//               style={styles.searchInput}
//               onFocus={() => setIsSearchFocused(true)}
//               onBlur={() => setIsSearchFocused(false)}
//             /> */}
//             <TextInput2
//               borderRadius={40}
//               placeholder={"Search items here..."}
//               fontsize={16}
//               style={[
//                 styles.searchInput,
//                 {
//                   backgroundColor: isSearchFocused ? "#FFF" : "#CBC3FB80",
//                   opacity: isSearchFocused ? 1 : 0.5,
//                 },
//               ]}
//               onFocus={() => setIsSearchFocused(true)}
//               onBlur={() => setIsSearchFocused(false)}
//             />

//             {/* <View style={styles.searchiconContainer}>
//               <Image
//                 source={isSearchFocused ? searchicon : searchiconBlack}
//                 style={styles.searchicon}
//               />
//             </View> */}
//             <View style={styles.searchiconContainer}>
//               {typeof searchicon === "function" ? (
//                 <View style={styles.searchicon}>
//                   {isSearchFocused
//                     ? React.createElement(searchicon, {
//                         width: "100%",
//                         height: "100%",
//                       })
//                     : React.createElement(searchiconBlack, {
//                         width: "100%",
//                         height: "100%",
//                       })}
//                 </View>
//               ) : (
//                 <Image
//                   source={isSearchFocused ? searchicon : searchiconBlack}
//                   style={styles.searchicon}
//                 />
//               )}
//             </View>
//           </View>
//         </View>

//         <FlatList
//           data={
//             matchingCategory
//               ? matchingCategory.Categories
//               : MyListCollection[0].Categories
//           }
//           keyExtractor={(item, index) => index.toString()}
//           showsVerticalScrollIndicator={false}
//           style={styles.subCategoriesContainer}
//           renderItem={({ item }) => (
//             <TouchableHighlight
//               onPress={() => {
//                 setPressedItem(item.name);
//                 router.push({
//                   pathname: "/products/ProductsPage",
//                   params: { myStringProp: item.name, ListName },
//                 });
//               }}
//               activeOpacity={1}
//               underlayColor="#fff"
//               style={styles.subCategoryItem}
//             >
//               <View style={styles.subCategoryContent}>
//                 <Text style={styles.subCategoryName}>{item.name}</Text>
//                 <CIrcleWithchevron chevronColor={"#A9A0F0"} />
//               </View>
//             </TouchableHighlight>
//           )}
//           // ListHeaderComponent={
//           //   filteredItems.length > 0 ? (
//           //     <ProductList products={filteredItems} ListName={ListName} onProductSelect={handleProductSelect} page="itemslist" />
//           //   ) : (
//           //     Array.isArray(selectedItem) && selectedItem.length > 0 ? (
//           //       <ProductList products={selectedItem} ListName={ListName} onProductSelect={handleProductSelect} page="itemslist" />
//           //     ) : (
//           //       null
//           //     )
//           //   )
//           // }
//         />
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// export default Categories;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#EFF9FF",
//     alignItems: "center",
//   },
//   caption2: {
//     fontFamily: "OpenSans-Regular",
//     fontSize: 13,
//     paddingVertical: "0.4%",
//     paddingHorizontal: "4%",
//     color: "#6c6c6c",
//     fontWeight: "300",
//     lineHeight: 23,
//     textAlign: "center",
//   },
//   categoryContainer: {
//     // marginTop: height * 0.08,
//     alignItems: "center",
//     width: "100%",
//     height: "38%",
//     // backgroundColor: "green",
//   },

//   // categoryImage: {
//   //   width: width * 0.4,
//   //   height: height * 0.25,
//   //   resizeMode: "contain",
//   //   backgroundColor:"red"
//   // },
//   categoryImage: {

//     width: 146.36,
//     height: 118.39,
//     position: "absolute",
//     top: 115,
//     left: 253.18,
//     alignSelf: "center",
//     resizeMode: "cover",
//       backgroundColor:"red"
//   },

//   searchContainer: {
//     // backgroundColor: "green", // Default background
//   },

//   // searchInput: {
//   //   width: "95%",
//   //   // height: "100%",
//   //   // backgroundColor: "red",
//   //   borderRadius: 40,
//   //   paddingHorizontal: "4.3%",
//   //   marginHorizontal: "2%",
//   //   // opacity: 0.5,
//   // },
//   serachFocused_categoryContainer: {
//     top: 0,
//     // backgroundColor: "red",

//     width: "100%",
//     // height: "8%",
//     // marginBottom: "3%",
//     marginTop: "2%",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   searchContainerBase: {
//     width: "95%",
//     // height: "15%",
//     // position: "relative",

//     // backgroundColor: "green",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   searchInput: {
//     width: "95%", // Ensures it remains the same in both states
//     height: 45, // Fixed height
//     borderRadius: 40,
//     paddingHorizontal: "4.3%",
//     marginHorizontal: "2%",
//     // backgroundColor: "red",
//   },

//   // subCategoriesContainer: {
//   //   marginTop: 20,
//   //   marginBottom: 80,
//   //   width: "100%",
//   //   backgroundColor:"red"
//   // },
//   subCategoriesContainer: {
//     flex: 1, // Ensures it takes all available space
//     width: "100%", // Full width
//     paddingHorizontal: 10, // Adjust as needed
//   },

//   searchiconContainer: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     width: 40,
//     aspectRatio: 1,
//     borderRadius: 100,
//     overflow: "hidden",
//     position: "absolute",
//     top: "10%",
//     right: 20,
//   },
//   searchicon: {
//     width: "100%",
//     height: "100%",
//     // paddingRight:"9%",

//     // backgroundColor: "red",
//   },
//   subCategoryItem: {
//     marginBottom: 10,
//     minHeight: 50,
//     padding: 10,
//     marginHorizontal: "2%",
//     // backgroundColor: "red",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 10,
//     borderBottomColor: "#007AFF15",
//     borderBottomWidth: 5,
//     // backgroundColor:"red"
//   },
//   subCategoryContent: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginHorizontal: 12,
//   },
//   subCategoryName: {
//     fontFamily: "OpenSans-Light",
//     fontSize: 16,
//     fontWeight: "300",
//     lineHeight: 24,
//     color: "#6C6C6C",
//   },
//   arrowRight: {
//     width: 32,
//     height: 32,
//   },
// });
