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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductContext } from '../../Context/CardContext';
import BottomSheetComponent from '../components/BottomSheetComponent';

const { width: screenWidth } = Dimensions.get('window');

const ProductList = ({ products, page, ListName, onProductSelect = () => { } }) => {
  const { selectedProducts, updateSelectedProducts, clearSelectedProducts } = useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState('Select a Product');
  const [placeholderVal, setPlaceholderVal] = useState(products.length);


  const handleSelect = async (product) => {
    try {
      await updateSelectedProducts(ListName, product);
      onProductSelect();
    } catch (error) {
      console.error('Error handling product selection:', error);
    }
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
  const getBorderStyles = (index, lastIndex) => {
    const borderBottomRightIndex = lastIndex % 3 === 1 ? lastIndex - 1 :
      lastIndex % 3 === 2 ? lastIndex - 2 : lastIndex % 3 === 0 ? lastIndex - 3 : null;

    const secondLineLastElement = lastIndex % 3 === 2 ? lastIndex - 3 :
      lastIndex % 3 === 1 ? lastIndex - 2 : null;

    return {
      borderBottomRightIndex,
      secondLineLastElement,
    };
  };


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
                index === 0 && styles.topLeftBorder,
                index === 2 && styles.topRightBorder,
                products.length === 1 && styles.borderRadiusmain,
                index === products.length - 1 && styles.bottomRightBorder,
                index === getBorderStyles(index, products.length).borderBottomRightIndex && styles.bottomLeftBorder,
                index === getBorderStyles(index, products.length).secondLineLastElement && styles.bottomRightBorder,
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
              {(item.Quantity || item.unit || item.urgancy) && <Text
                style={styles.productName2}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {`${item?.Quantity}-${item?.unit} ${item?.urgancy && ', Urgant'}`}
              </Text>}
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
      {page !== 'itemslist' && <BottomSheetComponent selecteditem={selectedProduct} ListName={ListName} />}
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
    // borderRadius: 5,
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
    // borderRadius: 5,
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
  productName2: {
    fontFamily: 'Poppins-Regular',
    marginTop: 2,
    fontSize: 11,
    lineHeight: 16.5,
    textAlign: 'center',
    color: 'white',
  },
  topRightBorder: {
    borderTopRightRadius: 5,
  },
  topLeftBorder: {
    borderTopLeftRadius: 5,
  },
  bottomRightBorder: {
    borderBottomRightRadius: 5,
  },
  bottomLeftBorder: {
    borderBottomLeftRadius: 5,
  },
  borderRadiusmain: {
    borderRadius: 5,
  }
});