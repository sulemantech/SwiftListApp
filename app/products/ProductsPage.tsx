// import React, { useContext, useEffect, useMemo } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { categories } from "../../constants/Data";
// import ProductList from "./Products";
// import Header from "../../components/Header";
// import { ProductContext } from "../../Context/CardContext";

// const ProductsPage: React.FC = () => {
//   const router = useRouter();
//   const { myStringProp, ListName } = useLocalSearchParams<{
//     myStringProp: string;
//     ListName: string;
//   }>();
//   const { selectedProducts } = useContext(ProductContext);

//   // Find matching sub-category
//   const matchingSubCategory = useMemo(() => {
//     return categories
//       .flatMap((category) => category.subCategories)
//       .find((subCategory) => subCategory.name === myStringProp);
//   }, [myStringProp]);

//   // Update items based on selected products
//   const updatedItems = useMemo(() => {
//     if (!matchingSubCategory) return [];

//     return matchingSubCategory.items.map((item) => {
//       const selectedItem = selectedProducts[ListName]?.find(
//         (selected: { name: string }) => selected.name === item.name
//       );
//       return selectedItem ? { ...selectedItem, imgPath: item.imgPath } : item;
//     });
//   }, [matchingSubCategory, selectedProducts, ListName]);

//   const handleBackPress = () => {
//     router.back();
//   };

//   return (
//     <View style={styles.container}>
//       <Header
//         title={myStringProp || "Products"}
//         Rightelement={true}
//         onBack={handleBackPress}
//       />
//       {updatedItems.length > 0 ? (
//         <ProductList products={updatedItems} ListName={ListName} page={""} />
//       ) : (
//         <View style={styles.emptyContainer}>
//           <Text style={styles.emptyText}>
//             No items available for this category.
//           </Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default ProductsPage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#eff9ff",
//     paddingHorizontal: 9,
//     paddingTop: 1,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   emptyText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#555",
//     textAlign: "center",
//   },
// });
// import React, { useContext, useEffect, useMemo } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   BackHandler,
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { categories } from "../../constants/Data";
// import ProductList from "./Products";
// import Header from "../../components/Header";
// import { ProductContext } from "../../Context/CardContext";

import React, { useContext, useEffect, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  SafeAreaView,
  StatusBar
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { categories } from "../../constants/Data";
import ProductList from "./Products";
import Header from "../../components/Header";
import { ProductContext } from "../../Context/CardContext";
import { goBack } from "expo-router/build/global-state/routing";
// import { StatusBar } from "expo-status-bar";
const ProductsPage: React.FC = () => {
  const router = useRouter();
  const { myStringProp, ListName } = useLocalSearchParams<{
    myStringProp: string;
    ListName: string;
  }>();
  const { selectedProducts } = useContext(ProductContext);

  // Find matching sub-category
  const matchingSubCategory = useMemo(() => {
    return categories
      .flatMap((category) => category.subCategories)
      .find((subCategory) => subCategory.name === myStringProp);
  }, [myStringProp]);

  // Update items based on selected products
  const updatedItems = useMemo(() => {
    if (!matchingSubCategory) return [];

    return matchingSubCategory.items.map((item: any) => {
      const selectedItem = selectedProducts[ListName]?.find(
        (selected: { name: string }) => selected.name === item.name
      );
      return selectedItem ? { ...selectedItem, imgPath: item.imgPath } : item;
    });
  }, [matchingSubCategory, selectedProducts, ListName]);

  const handleBackPress = () => {
    router.back();
    return true;
  };

  // Handle Android Back Button
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Status Bar */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header
        title={myStringProp || "Products"}
        Rightelement={false}
        // onBack={handleBackPress}
        onBack={() => router.back()}
      />
      <View style={styles.divider} />
      
      {updatedItems.length > 0 ? (
        <ProductList products={updatedItems} ListName={ListName} page={""} />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No items available for this category.
          </Text>
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
    // backgroundColor:"red",
    // paddingHorizontal: 9,

    // paddingTop: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
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
    // marginVertical: 10,
    marginTop: 15,
  },
  productContainer: {
    backgroundColor: "red",
  },
});
