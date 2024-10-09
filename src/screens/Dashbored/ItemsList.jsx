/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableHighlight,
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
import {categories} from './Data';
import TextInput2 from '../components/Input';
import SCREENS from '..';

const ItemsList = ({ItemName, onBackPress}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigation = useNavigation();

  const [filteredCategory, setFilteredCategory] = useState(
    categories.find(
      categoryObj =>
        categoryObj.category.name.toLowerCase() === ItemName.toLowerCase(),
    ),
  );
  const matchingCategory = categories.find(
    categoryObj =>
      categoryObj.category.name.toLowerCase() === ItemName.toLowerCase(),
  );

  const filterItems = content => {
    const filteredSubCategories = matchingCategory.subCategories.filter(
      subCategory =>
        subCategory.name.toLowerCase().startsWith(content.toLowerCase()),
    );
    setFilteredCategory({
      ...matchingCategory,
      subCategories: filteredSubCategories,
    });
  };

  const imageMap = {
    groceryImage: GrocerySVG,
    spiritualImage: SpiritualSVG,
    personalGroomingImage: PersonalGroomingSVG,
    thingsToDoImage: ThingsToDoSVG,
    kitchenMenuImage: KitchenMenuSVG,
  };
  const SelectedImageComponent = imageMap[filteredCategory.category.image];

  return (
    <View style={styles.container}>
      {/* Header with Back Button and Title */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBackPress}>
          <Image source={back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.signInText}>{ItemName}</Text>
        <Image source={heart} style={styles.heart} />
      </View>

      {/* Category Image */}
      {filteredCategory && (
        <View style={styles.categoryContainer}>
          <View>
            {SelectedImageComponent ? (
              <SelectedImageComponent style={styles.categoryImage} />
            ) : null}
          </View>

          <Text style={styles.caption2}>
            {filteredCategory.category.description}
          </Text>
          <View style={styles.searchContainer}>
            <TextInput2
              borderRadius={40}
              bgColor={isSearchFocused ? '#007AFF26' : '#fff'}
              placeholder={'Search items here...'}
              fontsize={16}
              onChangeText={text => {
                filterItems(text);
              }}
              style={styles.searchInput}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <View
              style={[
                styles.searchiconContainer,
                isSearchFocused
                  ? {backgroundColor: '#fff'}
                  : {backgroundColor: '#FFC41F'},
              ]}>
              <Image
                source={isSearchFocused ? searchiconBlack : searchicon}
                style={styles.searchicon}
              />
            </View>
          </View>
        </View>
      )}

      {/* List of Subcategories */}
      {filteredCategory && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.subCategoriesContainer}>
          {filteredCategory.subCategories.map((subCategory, index) => (
            <TouchableHighlight
              onPress={() =>
                navigation.navigate(SCREENS.Products, {
                  myStringProp: subCategory.name,
                })
              }
              activeOpacity={0.2}
              underlayColor="#52C2FE"
              key={index}
              style={styles.subCategoryItem}>
              <View style={styles.subCategoryContent}>
                <Text style={styles.subCategoryName}>{subCategory.name}</Text>
                <Image source={arrowRight} style={styles.arrowRight} />
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
      )}
    </View>
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
    paddingHorizontal: '5.5%',
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
    color: '#6c6c6c',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  categoryContainer: {
    marginTop: 80,
    alignItems: 'center',
    width: '100%',
  },
  categoryImage: {
    width: 150,
    height: 125,
    resizeMode: 'contain',
  },
  categoryTitle: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
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
    width: '90%',
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
    top: 30,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    // shadowColor: '#007AFF',
    // shadowOffset: {width: 0, height: 10},
    // shadowOpacity: 0.4,
    // shadowRadius: 0,
    // elevation: 10,
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
    // marginBottom: 10,
    lineHeight: 24,
    color: '#6C6C6C',
  },
  arrowRight: {
    width: 30,
    height: 30,
    transform: [{rotate: '-90deg'}],
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  itemName: {
    marginTop: 5,
    fontSize: 16,
  },
});
