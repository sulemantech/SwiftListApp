import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProductContext } from "../../Context/CardContext";
import BottomSheetComponent from "../../components/BottomSheetComponent";
import { images } from "@/constants";

interface Product {
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
  onProductSelect?: () => void;
  showBottomSheet?: boolean; // 🆕 optional prop
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  page,
  ListName,
  onProductSelect = () => {},
  showBottomSheet = true, // 🆕 default to true
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const { selectedProducts, updateSelectedProducts } =
    useContext(ProductContext);
  const [snapIndex, setSnapIndex] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] =
    useState<string>("Select a Product");
  const [placeholderVal, setPlaceholderVal] = useState<number>(products.length);
  const [isProductSelected, setIsProductSelected] = useState<boolean>(false);

  const handleSelect = async (product: Product) => {
    setSelectedProduct(product.name);
    await updateSelectedProducts(ListName, product);
    onProductSelect();
  };

  useEffect(() => {
    const isFound = selectedProducts[ListName]?.some(
      (selected: Product) => selected.name === selectedProduct
    );
    setIsProductSelected(isFound);
  }, [selectedProduct, selectedProducts, ListName]);

  useEffect(() => {
    const number = products.length;
    const calculateValue = (num: number): number => {
      if (num % 3 === 0) return 0;
      const nearestHigherDivisibleBy3 = num + (3 - (num % 3));
      return nearestHigherDivisibleBy3 - number;
    };
    setPlaceholderVal(calculateValue(number));
  }, [products.length]);

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
  const availableWidth = screenWidth - sidePadding * 2;
  const minColumns = screenWidth >= 360 && screenWidth < 500 ? 3 : 0;
  const numColumnsRaw = Math.floor((availableWidth + gap) / (itemSize + gap));
  const numColumns = Math.max(numColumnsRaw, minColumns);
  const itemWidth = (availableWidth - gap * (numColumns - 1)) / numColumns;

  return (
    <View
      style={[
        page !== "itemslist"
          ? styles.productsContainer
          : styles.productsContainer2,
        { paddingHorizontal: sidePadding },
      ]}
    >
      {products.length > 0 && (
        <ScrollView
          contentContainerStyle={[styles.itemsContainer]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {products.map((item, index) => {
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
                    marginRight: (index + 1) % numColumns === 0 ? 0 : gap,
                  },
                  selectedProducts[ListName]?.some(
                    (selected: { name: string }) => selected.name === item.name
                  ) && styles.selectedCard,
                  index === 0 && styles.topLeftBorder,
                  index === 2 && styles.topRightBorder,
                  products.length === 1 && styles.borderRadiusmain,
                  products.length === 2 && index === 1 && styles.topRightBorder,
                  index === products.length - 1 && styles.bottomRightBorder,
                  index === borderBottomRightIndex && styles.bottomLeftBorder,
                  index === secondLineLastElement && styles.bottomRightBorder,
                ]}
              >
                <item.imgPath
                  width={itemWidth * 0.6}
                  height={itemWidth * 0.6}
                  color={
                    selectedProducts[ListName]?.some(
                      (selected: { name: string }) =>
                        selected.name === item.name
                    )
                      ? "#FFFFFF"
                      : "#A9A0F0"
                  }
                />
                <Text
                  style={[
                    styles.productName,
                    {
                      fontSize: itemWidth * 0.12,
                      marginTop: itemWidth * 0.04,
                      color: selectedProducts[ListName]?.some(
                        (selected: { name: string }) =>
                          selected.name === item.name
                      )
                        ? "#FFFFFF"
                        : "#A9A0F0",
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
          {Array.from({ length: placeholderVal }).map((_, i) => (
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
          ))}
        </ScrollView>
      )}
      {showBottomSheet && page !== "itemslist" && isProductSelected && (
        <BottomSheetComponent
          selecteditem={selectedProduct}
          ListName={ListName}
          setIsProductSelected={setIsProductSelected}
          setSnapIndex={setSnapIndex}
          snapIndex={snapIndex}
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
    marginHorizontal: 10,
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  productCard: {
    backgroundColor: "#F3F3FD",
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
