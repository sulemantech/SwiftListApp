// ProductList.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const { width: screenWidth } = Dimensions.get('window');

const ProductList = ({ products, page }) => {
  // Use an array to track the selected items' indices
  const [selectedIndices, setSelectedIndices] = useState([]);

  // Toggle the selection of an item
  const handleSelect = index => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter(i => i !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  return (
    <View style={page !== 'itemslist' ? styles.productsContainer : styles.productsContainer2}>
      {products.length > 0 ? (
        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.itemsContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={3}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.productCard,
                selectedIndices.includes(index) && styles.selectedCard,
              ]}
              onPress={() => handleSelect(index)}
            >
              <Image source={item.imgPath} style={styles.productImage} />
              <Text
                style={styles.productName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyboardShouldPersistTaps="handled"
        />
      ) : (
        <Text>No items available for this category.</Text>
      )}
    </View>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      imgPath: PropTypes.any.isRequired,
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
    justifyContent: 'flex-start',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  productCard: {
    backgroundColor: '#4AA688',
    alignItems: 'center',
    padding: 15,
    width: screenWidth * 0.3,
    minWidth: 115,
    aspectRatio: 1,
    borderRadius: 5,
    margin: 3,
  },
  selectedCard: {
    backgroundColor: '#E36A4A', // This is the color when selected
  },
  productImage: {
    width: 80,
    height: 80,
  },
  productName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    fontWeight: '300',
    lineHeight: 16.5,
    textAlign: 'center',
    color: 'white',
  },
});
