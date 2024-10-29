import React, { useEffect, useState, useContext } from 'react';
import FastImage from 'react-native-fast-image';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

import { ProductContext } from '../../Context/CardContext';

const { width: screenWidth } = Dimensions.get('window');

const ProductList = ({ products, page, ListName, onProductSelect = () => {} }) => {
  const { selectedProducts, updateSelectedProducts  , clearSelectedProducts } = useContext(ProductContext);
  const [placeholderVal, setPlaceholderVal] = useState(products.length);
  // clearSelectedProducts();
console.log(ListName)
  const handleSelect = async (product) => {
    await updateSelectedProducts(ListName, product);
    onProductSelect();
  };

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
    setPlaceholderVal(result);
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
                selectedProducts[ListName]?.some(selected => selected.name === item.name) && styles.selectedCard,
              ]}
              onPress={() => handleSelect(item)} 
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
              {products.slice(0, placeholderVal).map((item, index) => (
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
      imgPath: PropTypes.any,
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
