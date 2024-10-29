import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, BackHandler } from 'react-native';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import Filtericon from '../../assets/images/filtericon.png';
import first from '../../assets/images/SVG/dashboardgrocery.svg';
import seconed from '../../assets/images/SVG/dashboardspiritualgoals.svg';
import third from '../../assets/images/SVG/dashboardpersonalgromming.svg';
import fourth from '../../assets/images/SVG/thingstodo.svg';
import fifth from '../../assets/images/SVG/recipe.svg';
import CardComponent from '../components/Card';
import ItemsList from './ItemsList';
import { ProductContext } from '../../Context/CardContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SCREENS from '..';
const Dashbored = ({ navigation }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardClick = title => {
    setSelectedCard(title);
  };
  const { selectedProducts } = useContext(ProductContext);


  const handleBackPress = () => {
    setSelectedCard(null);
    return true;
  };

  console.log(selectedProducts)


  const [cardDataArray, setCardDataArray] = useState([
    {
      title: 'Grocery List',
      description: 'Add needed items.',
      items: '200 Items',
      storageKey: 'selectedProductsGrocery List',
      percentagetext: 'Bought 70%',
      percentage: 70,
      Picture: first,
      bgColor: '#9DF4F4',
      badgeColor: '#008B94',
    },
    {
      title: 'Spiritual Goals',
      description: 'Add your spiritual goals.',
      items: '10 Goals',
      storageKey: 'selectedProductsSpiritual Goals',
      percentagetext: 'Achieved 30%',
      percentage: 30,
      Picture: seconed,
      bgColor: '#98FBCB',
      badgeColor: '#4AA688',
    },
    {
      title: 'Personal Grooming',
      description: 'Add your grooming tasks in list.',
      items: '10 Tasks',
      storageKey: 'selectedProductsPersonal Grooming',
      percentagetext: 'Completed 80%',
      percentage: 80,
      Picture: third,
      bgColor: '#FEE5D7',
      badgeColor: '#C54B6C',
    },
    {
      title: 'Things To Do',
      description: 'Add needed items.',
      items: '15 Items',
      storageKey: 'selectedProductsThings To Do',
      percentagetext: 'Bought 50%',
      percentage: 50,
      Picture: fourth,
      bgColor: '#FFCBA1CC',
      badgeColor: '#E36A4A',
    },
    {
      title: 'Kitchen Menu',
      description: 'Add needed items.',
      items: '500 Recipies',
      storageKey: 'selectedProductsKitchen Menu',
      percentagetext: 'Cooked 70%',
      percentage: 70,
      Picture: fifth,
      bgColor: '#fddc8a',
      badgeColor: '#D88D1B',
    },
  ]);


  useEffect(() => {
    const loadSelectedProducts = () => {
      let totalItems = 0;

      const updatedCardData = cardDataArray.map((card) => {
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

      setCardDataArray(updatedCardDataWithPercentages);
    };

    loadSelectedProducts();
  }, [selectedProducts]);




  return (
    <>
      {selectedCard ? (
        <ItemsList ItemName={selectedCard} ListName={selectedCard} onBackPress={handleBackPress} />
      ) : (
        <LinearGradient
          colors={['#EFF9FF', '#B2FEFA']}
          style={styles.gradientBackground}
        >
          <View style={styles.container}>
            <View>
              <Text style={styles.caption}>Hello,</Text>
              <View>
                <Text style={styles.heading}>MetaFront!</Text>
              </View>
              <Text style={styles.caption2}>
                Stay organized with quick access to all your essential lists!
              </Text>
            </View>
            <View style={styles.SearchANDFilter}>
              <TextInput style={styles.input} />
              <Image style={styles.filterimg} source={Filtericon} />
            </View>
            <ScrollView
              style={styles.cardContainer}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
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
              {cardDataArray.map((data, index) => (
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
