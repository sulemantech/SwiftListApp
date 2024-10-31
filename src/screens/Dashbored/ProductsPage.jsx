import React, { useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { categories } from './Data';
import PropTypes from 'prop-types';
import ProductList from './Products';
import Header from '../components/Header';

const ProductsPage = ({ route }) => {
  const navigation = useNavigation();
  const { myStringProp, ListName } = route.params;

  const matchingSubCategory = categories
    .flatMap(category => category.subCategories)
    .find(subCategory => subCategory.name === myStringProp);

  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );
    return () => {
      backHandler.remove();
    };
  }, []);


  return (
    <View style={styles.container}>
      <Header title={myStringProp} Rightelement={true} onBack={handleBackPress} />
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
      ListName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff9ff',
  },
});
