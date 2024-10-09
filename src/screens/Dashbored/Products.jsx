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
import back from '../../assets/images/back-arrow.png';
import heart from '../../assets/images/heartIcon.png';
import { useNavigation } from '@react-navigation/native';
import { categories } from './Data';
import PropTypes from 'prop-types';

const { width: screenWidth } = Dimensions.get('window');

const Header = ({ title, onBack }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={onBack}>
      <Image source={back} style={styles.back} />
    </TouchableOpacity>
    <Text style={styles.signInText}>{title}</Text>
    <Image source={heart} style={styles.heart} />
  </View>
);

const Products = ({ route }) => {
  const navigation = useNavigation();
  const { myStringProp } = route.params;

  const matchingSubCategory = categories
    .flatMap(category => category.subCategories)
    .find(subCategory => subCategory.name === myStringProp);

  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <View style={styles.container}>
      <Header title={myStringProp} onBack={() => navigation.goBack()} />

      <View style={styles.productsContainer}>
        {matchingSubCategory ? (
          <FlatList
            data={matchingSubCategory.items}
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
                  selectedIndex === index && styles.selectedCard,
                ]}
                onPress={() => setSelectedIndex(index)}>
                <Image source={item.imgPath} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
          />
        ) : (
          <Text>No items available for this category.</Text>
        )}
      </View>
    </View>
  );
};

Products.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      myStringProp: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF9FF',
    alignItems: 'center',
  },
  headerContainer: {
    paddingVertical: 7,
    paddingHorizontal: '5.5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    zIndex: 1,
  },
  back: {
    width: 27,
    height: 20,
  },
  heart: {
    width: 30,
    height: 30,
  },
  signInText: {
    color: '#6c6c6c',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  productsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    flex: 1,
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
    borderRadius: 5,
    margin: 3,
  },
  selectedCard: {
    backgroundColor: '#E36A4A',
  },
  productImage: {
    width: 80,
    height: 80,
  },
  productName: {
    marginTop: 5,
    fontSize: 14,
    color: '#fff',
  },
});
