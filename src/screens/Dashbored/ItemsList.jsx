import React, { useState, useCallback, useEffect } from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import back from '../../assets/images/back-arrow.png';
import heart from '../../assets/images/heartIcon.png';
import arrowRight from '../../assets/images/arrownotactive.png';
import arrowRightactive from '../../assets/images/arrowactive.png';
import searchicon from '../../assets/images/searchiconactive.png';
import searchiconBlack from '../../assets/images/searchiconnotactive.png';
import GrocerySVG from '../../assets/images/SVG/grocerypage.svg';
import SpiritualSVG from '../../assets/images/SVG/spiritualpage.svg';
import PersonalGroomingSVG from '../../assets/images/SVG/pgrommingpage.svg';
import ThingsToDoSVG from '../../assets/images/SVG/thingstodopage.svg';
import KitchenMenuSVG from '../../assets/images/SVG/kitchenpage.svg';
import { categories } from './Data';
import TextInput2 from '../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import SCREENS from '..';
import ProductList from './Products';

// Get the screen dimensions
const { width, height } = Dimensions.get('window');

const ItemsList = ({ ItemName, ListName , onBackPress }) => {
  console.log(ListName , " In ItemsList")
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [pressedItem, setPressedItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
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

      if (!searchQuery) {
        return setFilteredItems([]);
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

  const retrieveItemsFromAsyncStorage = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(`selectedProducts${ListName}`);
      const items = jsonValue ? JSON.parse(jsonValue) : [];
      console.log(`selectedProducts${ListName}`, items);
      setSelectedItem(items);
    } catch (e) {
      console.error('Error reading from AsyncStorage:', e);
    }
  }, []); 

  useEffect(() => {
    retrieveItemsFromAsyncStorage();
  }, [retrieveItemsFromAsyncStorage]);



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
      {/* Add LinearGradient around the entire view */}
      <LinearGradient
        colors={['#EFF9FF', '#EFF9FF']} // Apply your linear gradient colors here
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity activeOpacity={1} onPress={onBackPress}>
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
                bgColor={isSearchFocused ? '#FFF' : '#007AFF26'}
                placeholder={'Search items here...'}
                fontsize={16}
                onChangeText={text => filterItems(text)}
                style={styles.searchInput}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <View
                style={[styles.searchiconContainer]}>
                <Image
                  source={isSearchFocused ? searchicon : searchiconBlack}
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
                onPress={() => {
                  setPressedItem(item.name);
                  navigation.navigate('ProductsPage', { myStringProp: item.name , ListName : ListName });
                }}
                activeOpacity={1}
                underlayColor="#fff"
                style={styles.subCategoryItem}
              >
                <View style={styles.subCategoryContent}>
                  <Text style={styles.subCategoryName}>{item.name}</Text>
                  <Image source={pressedItem === item.name ? arrowRightactive : arrowRight} style={styles.arrowRight} />
                </View>
              </TouchableHighlight>
            )}
            ListHeaderComponent={
              filteredItems.length > 0 ? (
                <ProductList products={filteredItems} ListName={ListName} page="itemslist" />
              ) : (
                Array.isArray(selectedItem) && selectedItem.length > 0 ? (
                  <ProductList products={selectedItem} ListName={ListName} page="itemslist" />
                ) : (
                  null
                )
              )
            }
          />

        )}
      </LinearGradient>
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
    marginTop: height * 0.08,
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
    width: 40,
    aspectRatio: 1,
    borderRadius: 100,
    overflow: 'hidden',
    position: 'absolute',
    top: '33%',
    right: 10,
  },
  searchicon: {
    width: '100%',
    height: '100%',
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
    width: 32,
    height: 32,
  },
});
