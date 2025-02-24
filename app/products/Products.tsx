// import React, { useEffect, useState, useContext } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
// } from "react-native";
// import { Image } from "expo-image";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ProductContext } from "../../Context/CardContext";
// import BottomSheetComponent from "../../components/BottomSheetComponent";

// const { width: screenWidth } = Dimensions.get("window");

// interface Product {
//   imgPath: any;
//   name: string;
//   Quantity?: number;
//   unit?: string;
//   urgency?: boolean;
// }

// interface ProductListProps {
//   products: Product[];
//   page: string;
//   ListName: string;
//   onProductSelect?: () => void;
// }

// const ProductList: React.FC<ProductListProps> = ({
//   products,
//   page,
//   ListName,
//   onProductSelect = () => {},
// }) => {
//   const [snapIndex, setSnapIndex] = useState<number>(0);
//   const { selectedProducts, updateSelectedProducts } =
//     useContext(ProductContext);
//   const [selectedProduct, setSelectedProduct] =
//     useState<string>("Select a Product");
//   const [placeholderVal, setPlaceholderVal] = useState<number>(products.length);
//   const [isProductSelected, setIsProductSelected] = useState<boolean>(false);

//   const handleSelect = async (product: Product) => {
//     setSelectedProduct(product.name);
//     try {
//       await updateSelectedProducts(ListName, product);
//       onProductSelect();
//     } catch (error) {
//       console.error("Error handling product selection:", error);
//     }
//   };

//   useEffect(() => {
//     setIsProductSelected(
//       selectedProducts[ListName]?.some(
//         (selected: Product) => selected.name === selectedProduct
//       ) || false
//     );
//   }, [selectedProduct, selectedProducts, ListName]);

//   useEffect(() => {
//     const calculatePlaceholder = (num: number) => {
//       return num % 3 === 0 ? 0 : 3 - (num % 3);
//     };
//     setPlaceholderVal(calculatePlaceholder(products.length));
//   }, [products.length]);

//   return (
//     <View
//       style={
//         page !== "itemslist"
//           ? styles.productsContainer
//           : styles.productsContainer2
//       }
//     >
//       {products.length > 0 ? (
//         <ScrollView
//           contentContainerStyle={[
//             styles.itemsContainer,
//             {
//               paddingBottom:
//                 page !== "itemslist" ? (snapIndex === 0 ? 100 : 400) : 0,
//             },
//           ]}
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//         >
//           {products.map((item, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.productCard,
//                 selectedProducts[ListName]?.some(
//                   (selected: Product) => selected.name === item.name
//                 ) && styles.selectedCard,
//               ]}
//               onPress={() => handleSelect(item)}
//             >
//               <Image
//                 source={item.imgPath}
//                 style={styles.productImage}
//                 contentFit="cover"
//               />
//               <Text
//                 style={styles.productName}
//                 numberOfLines={1}
//                 ellipsizeMode="tail"
//               >
//                 {item.name}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       ) : (
//         <Text>No items available for this category.</Text>
//       )}
//       {page !== "itemslist" && isProductSelected && (
//         <BottomSheetComponent
//           selecteditem={selectedProduct}
//           ListName={ListName}
//           setIsProductSelected={setIsProductSelected}
//           setSnapIndex={setSnapIndex}
//           snapIndex={snapIndex}
//         />
//       )}
//     </View>
//   );
// };

// export default ProductList;

// const styles = StyleSheet.create({
//   productsContainer: { marginTop: 10, paddingHorizontal: 10, flex: 1 },
//   productsContainer2: { marginBottom: 10 },
//   itemsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     alignItems: "flex-start",
//   },
//   productCard: {
//     backgroundColor: "#4AA688",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 6,
//     width: screenWidth * 0.28,
//     margin: 3,
//   },
//   selectedCard: { backgroundColor: "#E36A4A" },
//   productImage: { width: screenWidth * 0.18, height: screenWidth * 0.14 },
//   productName: {
//     marginTop: 10,
//     fontSize: 11,
//     textAlign: "center",
//     color: "white",
//   },
// });

import React, { useEffect, useState, useContext } from "react";
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
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
  page?: string;
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
  const lastIndex = products.length - 1;

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

  const secondLineLastElement =
    lastIndex % 3 === 2
      ? lastIndex - 3
      : lastIndex % 3 === 1
      ? lastIndex - 2
      : null;

  const paddingBottom =
    page !== "itemslist"
      ? snapIndex === 0
        ? 100
        : snapIndex === 1
        ? 180
        : 400
      : 0;

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
          contentContainerStyle={[styles.itemsContainer, { paddingBottom }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {products.map((item, index) => (
            <TouchableOpacity
              activeOpacity={1}
              key={index}
              style={[
                styles.productCard,
                selectedProducts[ListName]?.some(
                  (selected: { name: string }) => selected.name === item.name
                ) && styles.selectedCard,
                index === 0 && styles.topLeftBorder,
                index === 2 && styles.topRightBorder,
                products.length === 1 && styles.borderRadiusmain,
                products.length === 2 &&
                  index === 1 &&
                  styles.topRightBorder &&
                  styles.topRightBorder,
                index === products.length - 1 && styles.bottomRightBorder,
                index ===
                  getBorderStyles(index, products.length)
                    .borderBottomRightIndex && styles.bottomLeftBorder,
                index ===
                  getBorderStyles(index, products.length)
                    .secondLineLastElement && styles.bottomRightBorder,
              ]}
              onPress={() => handleSelect(item)}
            >
              <Image
                source={item.imgPath}
                style={styles.productImage}
                contentFit="cover"
              />
              <Text style={styles.productName} ellipsizeMode="tail">
                {item.name}
              </Text>
              {(item.Quantity || item.unit || item.urgency) && (
                <Text
                  style={styles.productName2}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {`${item?.Quantity ? item.Quantity : ""}${
                    item?.unit ? "-" + item.unit : ""
                  } ${item?.urgency ? "  Urgent" : ""}`}
                </Text>
              )}
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
  productsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "space-between",
  },
  productsContainer2: {
    marginBottom: 10,
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  productCard: {
    backgroundColor: "#4AA688",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    width: screenWidth * 0.28,
    maxWidth: screenWidth * 0.32,
    aspectRatio: 1,
    flexGrow: 1,
    margin: 3,
  },

  selectedCard: {
    backgroundColor: "#E36A4A",
  },
  productImage: {
    width: screenWidth * 0.18,
    height: screenWidth * 0.14,
  },
  productName: {
    fontFamily: "Poppins-Regular",
    marginTop: 10,
    fontSize: 11,
    textAlign: "center",
    color: "white",
  },
  productName2: {
    fontFamily: "Poppins-Regular",
    marginTop: 2,
    fontSize: 11,
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
