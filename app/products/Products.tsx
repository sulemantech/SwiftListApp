import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProductContext } from "../../Context/CardContext";
import BottomSheetComponent from "../../components/BottomSheetComponent";

const { width: screenWidth } = Dimensions.get("window");

interface Product {
  imgPath: any;
  name: string;
  Quantity?: number;
  unit?: string;
  urgency?: boolean;
}

interface ProductListProps {
  products: Product[];
  page: string;
  ListName: string;
  onProductSelect?: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  page,
  ListName,
  onProductSelect = () => {},
}) => {
  const [snapIndex, setSnapIndex] = useState<number>(0);
  const { selectedProducts, updateSelectedProducts } =
    useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] =
    useState<string>("Select a Product");
  const [placeholderVal, setPlaceholderVal] = useState<number>(products.length);
  const [isProductSelected, setIsProductSelected] = useState<boolean>(false);

  const handleSelect = async (product: Product) => {
    setSelectedProduct(product.name);
    try {
      await updateSelectedProducts(ListName, product);
      onProductSelect();
    } catch (error) {
      console.error("Error handling product selection:", error);
    }
  };

  useEffect(() => {
    setIsProductSelected(
      selectedProducts[ListName]?.some(
        (selected: Product) => selected.name === selectedProduct
      ) || false
    );
  }, [selectedProduct, selectedProducts, ListName]);

  useEffect(() => {
    const calculatePlaceholder = (num: number) => {
      return num % 3 === 0 ? 0 : 3 - (num % 3);
    };
    setPlaceholderVal(calculatePlaceholder(products.length));
  }, [products.length]);

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
          contentContainerStyle={[
            styles.itemsContainer,
            {
              paddingBottom:
                page !== "itemslist" ? (snapIndex === 0 ? 100 : 400) : 0,
            },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {products.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.productCard,
                selectedProducts[ListName]?.some(
                  (selected: Product) => selected.name === item.name
                ) && styles.selectedCard,
              ]}
              onPress={() => handleSelect(item)}
            >
              <Image
                source={item.imgPath}
                style={styles.productImage}
                contentFit="cover"
              />
              <Text
                style={styles.productName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
            </TouchableOpacity>
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
  productsContainer: { marginTop: 10, paddingHorizontal: 10, flex: 1 },
  productsContainer2: { marginBottom: 10 },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  productCard: {
    backgroundColor: "#4AA688",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    width: screenWidth * 0.28,
    margin: 3,
  },
  selectedCard: { backgroundColor: "#E36A4A" },
  productImage: { width: screenWidth * 0.18, height: screenWidth * 0.14 },
  productName: {
    marginTop: 10,
    fontSize: 11,
    textAlign: "center",
    color: "white",
  },
});
