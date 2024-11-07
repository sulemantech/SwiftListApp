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
  const [snapIndex, setSnapIndex] = useState(0);
  const { selectedProducts, updateSelectedProducts, clearSelectedProducts } = useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState('Select a Product');
  const [placeholderVal, setPlaceholderVal] = useState(products.length);
  const [isProductSelected, setIsProductSelected] = useState(false);


  const handleSelect = async (product) => {
    setSelectedProduct(product.name)
    try {
      await updateSelectedProducts(ListName, product);
      onProductSelect();
    } catch (error) {
      console.error('Error handling product selection:', error);
    }
  };

  useEffect(() => {
    const isFound = selectedProducts[ListName]?.some(selected => selected.name === selectedProduct);
    setIsProductSelected(isFound);
  }, [selectedProduct, selectedProducts, ListName]);


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
  const paddingBottom = snapIndex === 0 ? 100 : snapIndex === 1 ? 180 : snapIndex === 2 ? 400 : 400;

  return (
    <View style={page !== 'itemslist' ? styles.productsContainer : styles.productsContainer2}>
      {products.length > 0 ? (
        <ScrollView
          contentContainerStyle={[styles.itemsContainer, { paddingBottom }]}
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
                products.length === 2 && index === 1 && styles.topRightBorder && styles.topRightBorder,
                index === products.length - 1 && styles.bottomRightBorder,
                index === getBorderStyles(index, products.length).borderBottomRightIndex && styles.bottomLeftBorder,
                index === getBorderStyles(index, products.length).secondLineLastElement && styles.bottomRightBorder,
              ]}
              onPress={() => handleSelect(item)}
            >
              <FastImage
                source={item.imgPath}
                style={[styles.productImage, (item.Quantity || item.unit || item.urgency) && styles.scaledimg]}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text
                style={[styles.productName, (item.Quantity || item.unit || item.urgency) && styles.textscale]}
                // numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
              {(item.Quantity || item.unit || item.urgency) && <Text
                style={[styles.productName2, (item.Quantity || item.unit || item.urgency) && styles.textscale]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {`${item?.Quantity ? item.Quantity : ''}${item?.unit && '-' + item?.unit} ${item?.urgency ? '  Urgent' : ''}`}
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
      {(page !== 'itemslist' && isProductSelected) && <BottomSheetComponent
        selecteditem={selectedProduct}
        ListName={ListName}
        setIsProductSelected={setIsProductSelected}
        setSnapIndex={setSnapIndex}
        snapIndex={snapIndex}
      />}
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
  },
  productCard: {
    backgroundColor: '#4AA688',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    width: screenWidth * 0.28,
    maxWidth: screenWidth * 0.32,
    aspectRatio: 1,
    // borderRadius:8,
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
    // borderRadius:8,
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
    borderTopRightRadius: 8,
  },
  topLeftBorder: {
    borderTopLeftRadius: 8,
  },
  bottomRightBorder: {
    borderBottomRightRadius: 8,
  },
  bottomLeftBorder: {
    borderBottomLeftRadius: 8,
  },
  borderRadiusmain: {
    borderRadius: 8,
  },
  scaledimg: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.12,
  },
  textscale: {
    fontFamily: 'Poppins-Regular',
    marginTop: 6,
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 12,
    color: 'white',
  }
});