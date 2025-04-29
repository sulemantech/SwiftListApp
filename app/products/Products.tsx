import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProductContext } from "../../Context/CardContext";
import BottomSheetComponent from "../../components/BottomSheetComponent";
import { images } from "@/constants";
import { Image } from "expo-image";

interface Product {
  id: number;
  imgPath: any;
  name: string;
  Quantity?: number;
  unit?: string;
  urgency?: boolean;
}

interface ProductListProps {
  products: Product[];
  page?: string;
  ListName: any;
  ListID: any;
  categoryName:any;
  onProductSelect?: () => void;
  showBottomSheet?: boolean; // 🆕 optional prop
}

const getBorderStyles = (index: number, lastIndex: number) => {
  const borderBottomRightIndex =
    lastIndex % 3 === 1
      ? lastIndex - 1
      : lastIndex % 3 === 2
      ? lastIndex - 2
      : lastIndex % 3 === 0
      ? lastIndex - 3
      : null;

  const secondLineLastElement =
    lastIndex % 3 === 2
      ? lastIndex - 3
      : lastIndex % 3 === 1
      ? lastIndex - 2
      : null;

  return {
    borderBottomRightIndex,
    secondLineLastElement,
  };
};

const ProductList: React.FC<ProductListProps> = ({
  products,
  page,
  ListName,
  categoryName,
  ListID,
  onProductSelect = () => {},
  showBottomSheet = true,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const { selectedProducts, updateSelectedProducts } =
    useContext(ProductContext);
  // const [selectedProducts, setselectedProducts] = useState<{
  //   [key: string]: Product[];
  // }>({});
  const [selectedProduct, setSelectedProduct] =
    useState<string>("Select a Product");
  const [placeholderVal, setPlaceholderVal] = useState<number>(products.length);
  const [isProductSelected, setIsProductSelected] = useState<boolean>(false);
  console.log(products)
  // useEffect(() => {
  //   console.log(selectedProduct);
  //   setselectedProducts(selectedProducts);
  // }, []);
  const handleSelect = async (product: Product) => {
    const currentList = selectedProducts[ListID] || [];
    const isAlreadySelected = currentList.some(
      (item: Product) => item.id === product.id
    );

    const updatedList = isAlreadySelected
      ? currentList.filter((item: Product) => item.id !== product.id)
      : [...currentList, product];

    const updatedLocalItems = {
      ...selectedProducts,
      [ListID]: updatedList,
    };

    // setselectedProducts(updatedLocalItems);
    setSelectedProduct(product.name);
    updateSelectedProducts(ListID, product);
    onProductSelect();
  };
  // useEffect(() => {
  //   setLocalItems(selectedProducts);
  // }, [selectedProducts]);

  useEffect(() => {
    const isFound = selectedProducts[ListID]?.some(
      (selected: Product) => selected.name === selectedProduct
    );

    setIsProductSelected(isFound);
  }, [selectedProduct, selectedProducts, ListName]);

  useEffect(() => {
    const calculatePlaceholderVal = (length: number): number => {
      return length % 3 === 0 ? 0 : 3 - (length % 3);
    };
    setPlaceholderVal(calculatePlaceholderVal(products.length));
  }, [products.length]);

  const mobileReferenceWidth = 360;
  const tabletReferenceWidth = 768;

  let itemSize;
  if (screenWidth <= tabletReferenceWidth) {
    itemSize = screenWidth / 4;
  } else {
    const scaleFactor = screenWidth / tabletReferenceWidth;
    const minItemSize = 90;
    itemSize = Math.max(minItemSize, scaleFactor * minItemSize);
  }

  // 🟢 Fix applied: 3 columns enforced for mid-range screen widths (e.g., 360-500)
  const gap = screenWidth <= 480 ? 3 : screenWidth <= 768 ? 8 : 12;
  const sidePadding = 16;
  const availableWidth = screenWidth - sidePadding * 2.5;
  const minColumns = screenWidth >= 360 && screenWidth < 500 ? 3 : 0;
  const numColumnsRaw = Math.floor((availableWidth + gap) / (itemSize + gap));
  const numColumns = Math.max(numColumnsRaw, minColumns);
  const itemWidth = (availableWidth - gap * (numColumns - 1)) / numColumns;
  const fontSize = itemWidth * 0.12;
  const marginTop = itemWidth * 0.04;

  return (
    <View
      style={[
        page !== "itemslist"
          ? styles.productsContainer
          : styles.productsContainer2,
        {
          paddingHorizontal: sidePadding,
          paddingBottom: isProductSelected && page !== "itemslist" ? 0 : 0,
        },
      ]}
    >
      {products.length > 0 && (
        <ScrollView
          contentContainerStyle={[styles.itemsContainer]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {products.map((item, index) => {
            const isSelected = selectedProducts[ListID]?.some(
              (selected: { name: string }) => selected.name === item.name
            );

            const { borderBottomRightIndex, secondLineLastElement } =
              getBorderStyles(index, products.length);

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                onPress={() => handleSelect(item)}
                style={[
                  styles.productCard,
                  {
                    width: itemWidth,
                    marginBottom: gap,
                    marginRight: (index + 1) % numColumns === 200 ? 0 : gap,
                  },
                  isSelected && styles.selectedCard,
                  index === 0 && styles.topLeftBorder,
                  index === 2 && styles.topRightBorder,
                  products.length === 1 && styles.borderRadiusmain,
                  products.length === 2 && index === 1 && styles.topRightBorder,
                  index === products.length - 1 && styles.bottomRightBorder,
                  index === borderBottomRightIndex && styles.bottomLeftBorder,
                  index === secondLineLastElement && styles.bottomRightBorder,
                ]}
              >
                {/* <item.imgPath
                  width={itemWidth * 0.6}
                  height={itemWidth * 0.6}
                  color={isSelected ? "#FFFFFF" : "#A9A0F0"}
                /> */}
                <Image source={item.imgPath} style={styles.image}/>

                <Text
                  style={[
                    styles.productName,
                    {
                      fontSize: fontSize,
                      marginTop: itemWidth * 0.04,
                      color: '#FFFFFF',
                    },
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
                {(item.Quantity || item.unit || item.urgency) && (
                  <Text
                    style={[
                      styles.productName2,
                      {
                        fontSize: itemWidth * 0.1,
                        marginTop: itemWidth * 0.02,
                      },
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {`${item.Quantity || ""}${
                      item.unit ? "-" + item.unit : ""
                    } ${item.urgency ? "Urgent" : ""}`}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
          {/* {Array.from({ length: placeholderVal }).map((_, i) => (
            <View
              key={placeholderVal - i}
              style={[
                styles.productCard,
                {
                  width: itemWidth,
                  backgroundColor: "transparent",
                  marginBottom: gap,
                  marginRight: (i + 1) % numColumns === 0 ? 0 : gap,
                },
              ]}
            />
          ))} */}
          {/* <TouchableOpacity
            style={{
              backgroundColor: "#A9A0F0",
              paddingVertical: 10,
              borderRadius: 8,
              marginTop: 20,
              alignItems: "center",
            }}
            onPress={() => {
              updateSelectedProducts(ListID, selectedProducts[ListID]);
            }}
          >
            <Text style={{ color: "#FFF", fontFamily: "Poppins-Medium" }}>
              Done
            </Text>
          </TouchableOpacity> */}
        </ScrollView>
      )}
      {showBottomSheet && page !== "itemslist" && isProductSelected && (
        <BottomSheetComponent
          selecteditem={selectedProduct}
          ListName={categoryName}
          setIsProductSelected={setIsProductSelected}
        />
      )} 
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  productsContainer: {
    marginVertical: 10,
    flex: 1,
  },
  productsContainer2: {
    marginVertical: 10,
    flex: 1,
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  productCard: {
    backgroundColor: "#BFBFBF",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
  },
  selectedCard: {
    backgroundColor: "#A9A0F0",
    zIndex: 1,
  },
  productName: {
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    // color:"red",
  },
  productName2: {
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    color: "white",
  },
  image:{
    width:70,
    aspectRatio:1
  },

  topLeftBorder: {
    borderTopLeftRadius: 8,
  },
  topRightBorder: {
    borderTopRightRadius: 8,
  },
  borderRadiusmain: {
    borderRadius: 8,
  },
  bottomRightBorder: {
    borderBottomRightRadius: 8,
  },
  bottomLeftBorder: {
    borderBottomLeftRadius: 8,
  },
  noItems: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#A9A0F0",
  },
});
