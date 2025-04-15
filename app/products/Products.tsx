import React, { useEffect, useState, useContext, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { ProductContext } from "../../Context/CardContext";
import BottomSheetComponent from "../../components/BottomSheetComponent";

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
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  page,
  ListName,
  onProductSelect = () => {},
}) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
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

  const horizontalPadding = screenWidth * 0.04;
  const spacing = screenWidth * (6 / 360);
  const availableWidth = screenWidth - horizontalPadding * 2;
  const minCardWidth = 90;

  const numColumns = useMemo(() => {
    return Math.max(
      3,
      Math.floor((availableWidth + spacing) / (minCardWidth + spacing))
    );
  }, [availableWidth, spacing]);

  const itemWidth = (availableWidth - spacing * (numColumns - 1)) / numColumns;

  return (
    <View
      style={
        page !== "itemslist"
          ? styles.productsContainer
          : styles.productsContainer2
      }
    >
      {products.length > 0 ? (
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
              key={`placeholder-${i}`}
              style={[
                styles.productCard,
                {
                  width: itemWidth,
                  backgroundColor: "transparent", // invisible
                },
              ]}
            />
          ))}
        </ScrollView>
      ) : (
        <Text>No items available for this category.</Text>
      )}

      {page !== "itemslist" && isProductSelected && (
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
    justifyContent: "center",
  },
  productCard: {
    backgroundColor: "#F3F3FD",
    alignItems: "center",
    margin: 1,
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
});
