import React, { useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

const { width: screenWidth } = Dimensions.get('window');

const ProductList = ({  products, page , ListName }) => {
  console.log(ListName , " In ItemsList")
  console.log(products)
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [placeholderval, setPlaceholderval] = useState(products.length);

  const handleSelect = async (product) => {
    try {
      const isSelected = selectedProducts.some(selected => selected.name === product.name);
      const newSelectedProducts = isSelected
        ? selectedProducts.filter(selected => selected.name !== product.name)
        : [...selectedProducts, { name: product.name, imgPath: product.imgPath }];

      setSelectedProducts(newSelectedProducts);

      await AsyncStorage.setItem(`selectedProducts${ListName}`, JSON.stringify(newSelectedProducts));
    } catch (error) {
      console.error('Failed to save selected products:', error);
    }
  };


  useEffect(() => {
    const loadSelectedProducts = async () => {
      try {
        const storedProducts = await AsyncStorage.getItem(`selectedProducts${ListName}`);
        if (storedProducts) {
          setSelectedProducts(JSON.parse(storedProducts));
        }
      } catch (error) {
        console.error('Failed to load selected products:', error);
      }
    };

    loadSelectedProducts();
  }, []);

  useEffect(() => {
    const number = products.length;

    const calculateValue = (num) => {
      if (num % 3 === 0) {
        return 0;
      } else {
        const nearestHigherDivisibleBy3 = num + (3 - (num % 3));
        return nearestHigherDivisibleBy3 - number;
      }
    };

    const result = calculateValue(number);
    setPlaceholderval(result);
  }, [products.length]);

  return (
    <View style={page !== 'itemslist' ? styles.productsContainer : styles.productsContainer2}>
      {products.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.itemsContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={true}
        >
          {products.map((item, index) => (
            <TouchableOpacity
              activeOpacity={1}
              key={index}
              style={[
                styles.productCard,
                selectedProducts.some(selected => selected.name === item.name) && styles.selectedCard, // Check if product is selected
              ]}
              onPress={() => handleSelect(item)} // Pass the product object instead of index
            >
              <FastImage
                source={item.imgPath}
                style={styles.productImage}
                resizeMode={FastImage.resizeMode.cover}
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
          {products.length > 0 && (
            <>
              {products.slice(0, placeholderval).map((item, index) => (
                <TouchableOpacity
                  activeOpacity={0}
                  key={index}
                  style={[styles.productCard2]}
                >
                  <FastImage
                    source={item.imgPath}
                    style={styles.productImage}
                    resizeMode={FastImage.resizeMode.cover}
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
            </>
          )}
        </ScrollView>
      ) : (
        <Text>No items available for this category.</Text>
      )}
    </View>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      imgPath: PropTypes.any, // imgPath should be a string representing Firebase storage path
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductList;

const styles = StyleSheet.create({
  productsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  productsContainer2: {
    marginBottom: 10,
  },
  itemsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  productCard: {
    backgroundColor: '#4AA688',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    width: screenWidth * 0.28,
    maxWidth: screenWidth * 0.32,
    aspectRatio: 1,
    borderRadius: 5,
    flexGrow: 1,
    margin: 3,
  },
  productCard2: {
    opacity: 0,
    backgroundColor: '#4AA688',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    width: screenWidth * 0.28,
    maxWidth: screenWidth * 0.32,
    aspectRatio: 1,
    borderRadius: 5,
    flexGrow: 1,
    margin: 3,
  },
  selectedCard: {
    backgroundColor: '#E36A4A',
  },
  productImage: {
    width: screenWidth * 0.18,
    height: screenWidth * 0.14,
  },
  productName: {
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
    fontSize: 11,
    lineHeight: 16.5,
    textAlign: 'center',
    color: 'white',
  },
});
