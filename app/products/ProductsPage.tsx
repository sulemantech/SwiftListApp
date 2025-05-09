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
  const { storedCategories, changestate, setChangestate } =
    useContext(ProductContext);
  const CategoryIDInNum = Number(CategoryID);
  const ListIDInNum = Number(ListID);

  const allCategories = useMemo(() => {
    return MyListCollection.flatMap((list) => list.Categories ?? []);
  }, []);

  const matchingSubCategory = useMemo(() => {
    const localList = MyListCollection.find(
      (list) => Number(list.id) === Number(ListIDInNum)
    );

    const storedList = storedCategories.find(
      (list: any) => Number(list.id) === Number(ListIDInNum)
    );

    const localCategory = localList?.Categories?.find(
      (cat) => Number(cat.id) === Number(CategoryIDInNum)
    );

    const storedCategory = storedList?.Categories?.find(
      (cat: any) => Number(cat.id) === Number(CategoryIDInNum)
    );

    const mergedItems = [
      ...(localCategory?.items || []),
      ...(storedCategory?.items || []),
    ];

    if (!localCategory && !storedCategory) {
      console.warn("⚠️ No matching subcategory found for ID:", CategoryIDInNum);
      return undefined;
    }

    const result = {
      ...(localCategory || storedCategory),
      items: mergedItems,
    };

    return result;
  }, [CategoryIDInNum, ListIDInNum, storedCategories]);

  const updatedItems = useMemo(() => {
    if (!matchingSubCategory) return [];

    return matchingSubCategory.items.map((item: any) => item);
  }, [matchingSubCategory]);

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
        </View>
      )}
      {/* {isBlur && (
        <CreateButton
          screen="item"
          categories={cardTitles}
          ListName={ListName}
          CategoryName={categoryName}
          setChangestate={setChangestate}
          changestate={setChangestate}
        />
      )} */}
      {ListIDInNum > 5 && (
        <TouchableOpacity
          onPress={() => CreateList()}
          style={styles.fixedAddButton}
        >
          <Text style={styles.icon}> {isBlur ? " ✕ " : " + "} </Text>
        </TouchableOpacity>
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
