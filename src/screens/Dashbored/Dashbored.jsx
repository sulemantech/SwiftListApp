import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, BackHandler, StatusBar } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Filtericon from '../../assets/images/filtericon.png';
import first from '../../assets/images/SVG/dashboardgrocery.svg';
import seconed from '../../assets/images/SVG/dashboardspiritualgoals.svg';
import third from '../../assets/images/SVG/dashboardpersonalgromming.svg';
import fourth from '../../assets/images/SVG/thingstodo.svg';
import fifth from '../../assets/images/SVG/recipe.svg';
import CardComponent from '../components/Card';
import ItemsList from './ItemsList';
import { ProductContext } from '../../Context/CardContext';
import SCREENS from '..';

const Dashbored = ({ navigation }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isListLoaded, setIsListLoaded] = useState(false); 

  const handleCardClick = title => {
    setSelectedCard(title);
  };
  const { selectedProducts , userName , changestate , setChangestate } = useContext(ProductContext);


  const handleBackPress = () => {
    setSelectedCard(null);
    return true;
  };
  const cardDataArray = [
    {
      title: 'Grocery List',
      description: 'Add needed items.',
      items: '0 Items',
      percentagetext: 'Bought 0%',
      percentage: 0,
      Picture: first,
      bgColor: '#9DF4F4',
      badgeColor: '#008B94',
    },
    {
      title: 'Spiritual Goals',
      description: 'Add your spiritual goals.',
      items: '0 Goals',
      percentagetext: 'Achieved 0%',
      percentage: 0,
      Picture: seconed,
      bgColor: '#98FBCB',
      badgeColor: '#4AA688',
    },
    {
      title: 'Personal Grooming',
      description: 'Add your grooming tasks in list.',
      items: '0 Tasks',
      percentagetext: 'Completed 0%',
      percentage: 0,
      Picture: third,
      bgColor: '#FEE5D7',
      badgeColor: '#C54B6C',
    },
    {
      title: 'Things To Do',
      description: 'Add tasks in your to do list.',
      items: '0 Items',
      percentagetext: 'Completed 0%',
      percentage: 0,
      Picture: fourth,
      bgColor: '#FFCBA1CC',
      badgeColor: '#E36A4A',
    },
    {
      title: 'Kitchen Menu',
      description: 'Add items to your list.',
      items: '0 Recipies',
      percentagetext: 'Cooked 0%',
      percentage: 0,
      Picture: fifth,
      bgColor: '#fddc8a',
      badgeColor: '#D88D1B',
    },
  ];

  
  const [cardDataFilterArray, setCardDataFilterArray] = useState(cardDataArray);

  const FilterCatagories = (name) => {
    const searchedtext = name.toLowerCase();
    if (!searchedtext) {
      return setCardDataFilterArray(cardDataArray);
    }
    setCardDataFilterArray(cardDataFilterArray.filter(item => item.title.toLowerCase().startsWith(searchedtext)));
  };

  const getListFromLocalStorage = async () => {
    setIsListLoaded(false);
    try {
      const storedList = await AsyncStorage.getItem('userLists');
      const list = storedList ? JSON.parse(storedList) : [];
      console.log('List retrieved from local storage:', list);
  
      const formattedList = list
      .map(item => ({
        ...item,
        Picture: item.Picture === 'first' ? first :
                 item.Picture === 'seconed' ? seconed :
                 item.Picture === 'third' ? third :
                 item.Picture === 'fourth' ? fourth :
                 item.Picture === 'fifth' ? fifth : item.Picture,
      }))
      .filter(item => item.title);

    const mergedData = formattedList.length > 0 ? [...cardDataArray, ...formattedList] : cardDataArray;
  
      setCardDataFilterArray(mergedData);
      setIsListLoaded(true);
      setChangestate(false)
    } catch (error) {
      console.error('Error retrieving list:', error);
    }
  };
  

  useEffect(() => {
    getListFromLocalStorage();
  }, [changestate]);



  useEffect(() => {
    if (!isListLoaded) return;
    const loadSelectedProducts = () => {
      let totalItems = 0;

      const updatedCardData = cardDataFilterArray.map((card) => {
        const itemsFromContext = selectedProducts[card.title] || [];
        const itemCount = itemsFromContext.length;

        totalItems += itemCount;

        return {
          ...card,
          items: `${itemCount} ${card.items.split(' ')[1]}`,
          itemCount,
        };
      });

      const updatedCardDataWithPercentages = updatedCardData.map(card => {
        const percentage = totalItems > 0
          ? Math.round((card.itemCount / totalItems) * 100)
          : 0;

        return {
          ...card,
          percentagetext: `${card.percentagetext.split(' ')[0]} ${percentage}%`,
          percentage,
        };
      });

      setCardDataFilterArray(updatedCardDataWithPercentages); 
    };

    loadSelectedProducts();
  }, [selectedProducts , isListLoaded]);

  return (
    <>
      {selectedCard ? (
        <ItemsList ItemName={selectedCard} ListName={selectedCard} onBackPress={handleBackPress} />
      ) : (
        <LinearGradient
          colors={['#EFF9FF', '#B2FEFA']}
          style={styles.gradientBackground}
        >
          <StatusBar
            animated={true}
            backgroundColor="#EFF9FF"
            barStyle={'dark-content'}
          // showHideTransition={statusBarTransition}
          />
          <View style={styles.container}>
            <View>
              <Text style={styles.caption}>Hello,</Text>
              <View>
                <Text style={styles.heading}>{userName} !</Text>
              </View>
              <Text style={styles.caption2}>
                Stay organized with quick access to all your essential lists!
              </Text>
            </View>
            <View style={styles.SearchANDFilter}>
              <TextInput onChangeText={(text) => { FilterCatagories(text) }} style={styles.input} />
              <Image style={styles.filterimg} source={Filtericon} />
            </View>
            <ScrollView
              style={styles.cardContainer}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps='handled'
            >

              <View style={styles.editcontainer}>
                <Text style={styles.heading}>Your Lists</Text>
                <TouchableOpacity
                  activeOpacity={0.4}
                  style={styles.skip}
                // onPress={() => navigation.navigate(SCREENS.Theme)}
                >
                  <Text style={styles.heading}>Edit</Text>
                </TouchableOpacity>
              </View>
              {cardDataFilterArray.map((data, index) => (
                <CardComponent
                  key={index}
                  data={data}
                  onPress={() => handleCardClick(data.title)}
                />
              ))}

              <TouchableOpacity onPress={() => navigation.navigate(SCREENS.Theme)} style={styles.card}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}> + </Text>
                </View>
                <Text style={styles.iconText}>Create List</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </LinearGradient>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: '5.5%',
  },
  caption: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    paddingVertical: '0.2%',
    color: '#6c6c6c',
    fontWeight: '300',
    lineHeight: 13,
    textAlign: 'left',
  },
  caption2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    paddingVertical: '0.4%',
    color: '#6c6c6c',
    fontWeight: '300',
    lineHeight: 23,
    textAlign: 'left',
  },
  heading: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    color: '#000',
    paddingVertical: '1%',
    fontWeight: '600',
    lineHeight: 16,
    textAlign: 'left',
  },
  editcontainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  SearchANDFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  filterimg: {
    width: 40,
    aspectRatio: 1,
  },
  cardContainer: {
    flexGrow: 1,
    marginBottom: 80,
    zIndex: 100,
  },
  scrollContent: {
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    height: 40.5,
    borderColor: '#52C2FE',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 0,
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    lineHeight: 40,
    textAlignVertical: 'center',
  },
  iconContainer: {
    backgroundColor: 'grey',
    borderRadius: 50,
    width: 40,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 28,
    marginBottom: 10,
    marginLeft: 1,
    color: 'white',
  },
  iconText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
    marginBottom: 6,
    marginLeft: 3,
    color: 'grey',
    marginTop: 5,
    textAlign: 'center',
  },
  card: {
    width: '98%',
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginVertical: 10,
    marginHorizontal: 'auto',
  },
});

export default Dashbored;
