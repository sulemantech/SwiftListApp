/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
} from 'react-native';
import back from '../../assets/images/back-arrow.png';
import heart from '../../assets/images/heartIcon.png';
import arrowRight from '../../assets/images/down-arrow.png';
import searchicon from '../../assets/images/search.png';
import searchiconBlack from '../../assets/images/search-black.png';
import GrocerySVG from '../../assets/images/SVG/grocerypage.svg';
import SpiritualSVG from '../../assets/images/SVG/spiritualpage.svg';
import PersonalGroomingSVG from '../../assets/images/SVG/pgrommingpage.svg';
import ThingsToDoSVG from '../../assets/images/SVG/thingstodopage.svg';
import KitchenMenuSVG from '../../assets/images/SVG/kitchenpage.svg';
import { categories } from './Data';
import TextInput2 from '../components/Input';
import SCREENS from '..';
import ProductList from './Products';

// Get the screen dimensions
const { width, height } = Dimensions.get('window');

const ItemsList = ({ ItemName, onBackPress }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const navigation = useNavigation();

  const matchingCategory = categories.find(
    categoryObj =>
      categoryObj.category.name.toLowerCase() === ItemName.toLowerCase(),
  );

  const filterItems = useCallback(
    (
      content,
      selectedCategory = matchingCategory?.category.name,
      selectedSubCategory = null,
    ) => {
      const searchQuery = content.toLowerCase();

      // Check if the search query is empty
      if (!searchQuery) {
        return setFilteredItems([]); // Set to empty if input is cleared
      }

      const category = categories.find(
        cat =>
          cat.category.name.toLowerCase() === selectedCategory?.toLowerCase(),
      );
      if (!category) {
        return setFilteredItems([]);
      }

      let subCategories = category.subCategories;
      if (selectedSubCategory) {
        const subCategory = subCategories.find(
          subCat =>
            subCat.name.toLowerCase() === selectedSubCategory?.toLowerCase(),
        );
        if (subCategory) {
          subCategories = [subCategory];
        } else {
          return setFilteredItems([]);
        }
      }

      const allItems = subCategories.flatMap(subCategory => subCategory.items);
      const filteredItemsArray = allItems.filter(
        item =>
          item.name.toLowerCase().startsWith(searchQuery) ||
          item.name.toLowerCase().includes(searchQuery),
      );

      setFilteredItems(filteredItemsArray);
    },
    [matchingCategory],
  );

  const imageMap = {
    groceryImage: GrocerySVG,
    spiritualImage: SpiritualSVG,
    personalGroomingImage: PersonalGroomingSVG,
    thingsToDoImage: ThingsToDoSVG,
    kitchenMenuImage: KitchenMenuSVG,
  };
  const SelectedImageComponent = imageMap[matchingCategory?.category.image];

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsSearchFocused(false);
        Keyboard.dismiss();
      }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onBackPress}>
            <Image source={back} style={styles.back} />
          </TouchableOpacity>
          <Text style={styles.signInText}>{ItemName}</Text>
          <Image source={heart} style={styles.heart} />
        </View>

        {matchingCategory && (
          <View style={styles.categoryContainer}>
            {!isSearchFocused && SelectedImageComponent && (
              <SelectedImageComponent style={styles.categoryImage} />
            )}
            {!isSearchFocused && (
              <Text style={styles.caption2}>
                {matchingCategory.category.description}
              </Text>
            )}

            <View style={styles.searchContainer}>
              <TextInput2
                borderRadius={40}
                bgColor={isSearchFocused ? '#007AFF26' : '#fff'}
                placeholder={'Search items here...'}
                fontsize={16}
                onChangeText={text => filterItems(text)}
                style={styles.searchInput}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <View
                style={[
                  styles.searchiconContainer,
                  { backgroundColor: isSearchFocused ? '#fff' : '#FFC41F' },
                ]}>
                <Image
                  source={isSearchFocused ? searchiconBlack : searchicon}
                  style={styles.searchicon}
                />
              </View>
            </View>
          </View>
        )}
        {matchingCategory && (
          <FlatList
            data={matchingCategory.subCategories}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            style={styles.subCategoriesContainer}
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() =>
                  navigation.navigate(SCREENS.ProductsPage, {
                    myStringProp: item.name,
                  })
                }
                activeOpacity={0.2}
                underlayColor="#52C2FE"
                style={styles.subCategoryItem}>
                <View style={styles.subCategoryContent}>
                  <Text style={styles.subCategoryName}>{item.name}</Text>
                  <Image source={arrowRight} style={styles.arrowRight} />
                </View>
              </TouchableHighlight>
            )}
            ListHeaderComponent={filteredItems.length > 0 ? <ProductList products={filteredItems} page={'itemslist'} /> : null}
          />
        )}

      </View>
    </TouchableWithoutFeedback>
  );
};

export default ItemsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF9FF',
    alignItems: 'center',
  },
  caption2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    paddingVertical: '0.4%',
    paddingHorizontal: '4%',
    color: '#6c6c6c',
    fontWeight: '300',
    lineHeight: 23,
    textAlign: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    paddingVertical: 7,
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
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
  categoryContainer: {
    marginTop: height * 0.08, // Responsive margin-top
    alignItems: 'center',
    width: '100%',
  },
  categoryImage: {
    width: width * 0.4,
    height: height * 0.25,
    resizeMode: 'contain',
  },
  searchContainer: {
    height: 80,
    width: '90%',
    position: 'relative',
  },
  searchInput: {
    width: '100%',
  },
  subCategoriesContainer: {
    marginTop: 20,
    marginBottom: 80,
    width: '95%',
  },
  searchiconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC41F',
    width: '11.5%',
    height: '50%',
    borderRadius: 100,
    overflow: 'hidden',
    position: 'absolute',
    top: '30%',
    right: 10,
  },
  searchicon: {
    width: '60%',
    height: '60%',
  },
  subCategoryItem: {
    marginBottom: 10,
    minHeight: 50,
    padding: 10,
    marginHorizontal: '2%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderBottomColor: '#007AFF15',
    borderBottomWidth: 5,
  },
  subCategoryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  subCategoryName: {
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 24,
    color: '#6C6C6C',
  },
  arrowRight: {
    width: 30,
    height: 30,
    transform: [{ rotate: '-90deg' }],
  },
});
