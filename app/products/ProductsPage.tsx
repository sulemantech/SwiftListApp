import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MyListCollection } from "../../constants/Data";
import ProductList from "./Products";
import Header from "../../components/Header";
import { ProductContext } from "../../Context/CardContext";
import CreateButton from "@/components/CreateButton";
const { width, height } = Dimensions.get("window");

const ProductsPage: React.FC = () => {
  const router = useRouter();
  const [cardTitles, setCardTitles] = useState<string[]>([]);
  const [isBlur, setIsBlur] = useState(false);
  const { categoryName, ListName, CategoryID, ListID } =
    useLocalSearchParams() as {
      categoryName: string;
      ListName: string;
      CategoryID: any;
      ListID: any;
    };
  const selectedProducts = useContext(ProductContext)?.selectedProducts;
  const CategoryIDInNum = Number(CategoryID);
  const ListIDInNum = Number(ListID);

  // Adjust for inconsistent structure of MyListCollection
  const allCategories = useMemo(() => {
    return MyListCollection.flatMap((list) => list.Categories ?? []);
  }, []);

  const matchingSubCategory = useMemo(() => {
    // Step 1: First find the correct list
    const matchingList = MyListCollection.find(
      (list) => list.id === ListIDInNum // this is the main list/category ID
    );

    // Step 2: Then find the category **within that list**
    const subCategory = matchingList?.Categories?.find(
      (cat) => cat.id === CategoryIDInNum
    );
    return subCategory;
  }, [CategoryIDInNum, ListIDInNum]);

  const updatedItems = useMemo(() => {
    if (!selectedProducts || !matchingSubCategory) return [];

    return matchingSubCategory.items.map((item: any) => {
      const selectedItem = selectedProducts[ListIDInNum]?.find(
        (selected: { id: number }) => selected.id === item.id
      );
      return selectedItem
        ? { ...selectedItem, imgPath: item.imgPath, id: item.id }
        : item;
    });
  }, [matchingSubCategory, selectedProducts, ListName]);

  const handleBackPress = () => {
    router.back();
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => backHandler.remove();
  }, []);
  const CreateList = () => {
    setIsBlur((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        title={categoryName || "Products"}
        Rightelement={false}
        onBack={handleBackPress}
      />
      <View style={styles.divider} />

      {updatedItems.length > 0 ? (
        <ProductList
          products={updatedItems}
          ListName={categoryName}
          categoryName={ListName}
          page={""}
          ListID={ListIDInNum}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No items available for this List.
          </Text>
          {isBlur && <CreateButton screen="item" categories={cardTitles} />}
          <TouchableOpacity
            onPress={() => CreateList()}
            style={styles.fixedAddButton}
          >
            <Text style={styles.icon}> {isBlur ? " × " : " + "} </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProductsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
    marginTop: 15,
  },
  fixedAddButton: {
    position: "absolute",
    bottom: height * 0.1,
    right: width * 0.055,
    backgroundColor: "#A9A0F0",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    aspectRatio: 1,
    zIndex: 999,
  },
  icon: {
    fontFamily: "OpenSans-Light",
    fontSize: width * 0.12,
    color: "white",
    textAlign: "center",
    lineHeight: 60,
  },
});
