import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import back from '../../assets/images/back-arrow.png';
import heart from '../../assets/images/heartIcon.png';
import { useNavigation } from '@react-navigation/native';
import { categories } from './Data';
import PropTypes from 'prop-types';
import ProductList from './Products';

const Header = ({ title, onBack }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity activeOpacity={1} onPress={onBack}>
      <Image source={back} style={styles.back} />
    </TouchableOpacity>
    <Text style={styles.signInText}>{title}</Text>
    <Image source={heart} style={styles.heart} />
  </View>
);

const ProductsPage = ({ route }) => {
  const navigation = useNavigation();
  const { myStringProp, ListName } = route.params;

  const matchingSubCategory = categories
    .flatMap(category => category.subCategories)
    .find(subCategory => subCategory.name === myStringProp);

  return (
    <View style={styles.container}>
      <Header title={myStringProp} onBack={() => navigation.goBack()} />
      {matchingSubCategory ? (
        <ProductList products={matchingSubCategory.items} ListName={ListName} />
      ) : (
        <Text>No items available for this category.</Text>
      )}
    </View>
  );
};

ProductsPage.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      myStringProp: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff9ff',
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
    color: '#0c0c0c',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'OpenSans-Bold',
  },
});
