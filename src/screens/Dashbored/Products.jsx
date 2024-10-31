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

const ProductList = ({ products, page, ListName, onProductSelect = () => { } }) => {
  const { selectedProducts, updateSelectedProducts } = useContext(ProductContext);
  const [placeholderVal, setPlaceholderVal] = useState(0);

  const handleSelect = async (product) => {
    await updateSelectedProducts(ListName, product);
    onProductSelect();
  };

  useEffect(() => {
    const numProducts = products.length;
    const nearestHigherDivisibleBy3 = Math.ceil(numProducts / 3) * 3;
    setPlaceholderVal(nearestHigherDivisibleBy3 - numProducts);
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

  const renderProductCard = (item, index, isPlaceholder = false) => (
    <TouchableOpacity
      activeOpacity={1}
      key={index}
      style={[
        styles.productCard,
        isPlaceholder && styles.productCardPlaceholder,
        selectedProducts[ListName]?.some(selected => selected.name === item.name) && styles.selectedCard,
        index === 0 && styles.topLeftBorder,
        index === 2 && styles.topRightBorder,
        index === products.length - 1 && styles.bottomRightBorder,
        index === getBorderStyles(index, products.length).borderBottomRightIndex && styles.bottomLeftBorder,
        index === getBorderStyles(index, products.length).secondLineLastElement && styles.bottomRightBorder,
      ]}
      onPress={!isPlaceholder ? () => handleSelect(item) : null}
    >
      <FastImage
        source={item.imgPath}
        style={styles.productImage}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={page !== 'itemslist' ? styles.productsContainer : styles.productsContainer2}>
      {products.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.itemsContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={true}
        >
          {products.map((item, index) => renderProductCard(item, index))}
          {Array.from({ length: placeholderVal }, (_, index) => renderProductCard(products[index], index, true))}
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
    flexGrow: 1,
    margin: 3,
  },
  productCardPlaceholder: {
    opacity: 0,
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

});
