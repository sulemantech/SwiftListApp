import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TextInput2 from '../components/Input'; // Your custom text input component
import Filtericon from '../../assets/images/filtericon.png';
import first from '../../assets/images/1st.png';
import seconed from '../../assets/images/2nd.png';
import third from '../../assets/images/3rd.png';
import CardComponent from '../components/Card';
import ItemsList from './ItemsList';

const Dashbored = () => {
  const [selectedCard, setSelectedCard] = useState(null); 
  const handleCardClick = title => {
    setSelectedCard(title);
  };
  const handleBackPress = () => {
    setSelectedCard(null); 
  };

  // const Tab = createBottomTabNavigator();
  const cardDataArray = [
    {
      title: 'Grocery',
      description: 'Add needed items.',
      items: '200 Items',
      percentagetext: 'Bought 70%',
      percentage: 70,
      image: first,
      bgColor: '#9DF4F4',
      badgeColor: '#008B94',
    },
    {
      title: 'Spiritual Goals',
      description: 'Add your spiritual goals.',
      items: '10 Goals',
      percentagetext: 'Achieved 30%',
      percentage: 30,
      image: seconed,
      bgColor: '#98FBCB',
      badgeColor: '#4AA688',
    },
    {
      title: 'Personal Grooming',
      description: 'Add your grooming tasks in list.',
      items: '10 Tasks',
      percentagetext: 'Completed 80%',
      percentage: 80,
      image: third,
      bgColor: '#FEE5D7',
      badgeColor: '#C54B6C',
    },
    {
      title: 'Things To Do',
      description: 'Add needed items.',
      items: '200 Items',
      percentagetext: 'Bought 70%',
      percentage: 20,
      image: first,
      bgColor: '#FFCBA1CC',
      badgeColor: '#E36A4A',
    },
    {
      title: 'Kitchen Menu',
      description: 'Add needed items.',
      items: '200 Items',
      percentagetext: 'Bought 70%',
      percentage: 40,
      image: seconed,
      bgColor: '#98FBCB',
      badgeColor: '#FF5733',
    },
  ];
  // const [filteredCategory, setFilteredCategory] = useState();

  return (
    <>
      {selectedCard ? (
        // If a card is selected, show the DetailView
        <ItemsList ItemName={selectedCard} onBackPress={handleBackPress}  />
      ) : (
        <View style={styles.container}>
          <View>
            <Text style={styles.caption}>Hello,</Text>
            <Text style={styles.heading}>MetaFront!</Text>
            <Text style={styles.caption2}>
              Stay organized with quick access to all your essential lists!
            </Text>
          </View>
          <View style={styles.SearchANDFilter}>
            <TextInput2 bgcolor={'#fff'} style={styles.searchInput} />
            <Image style={styles.filterimg} source={Filtericon} />
          </View>
          <ScrollView
            style={styles.cardContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false} // Optional: to hide the scroll indicator
          >
            {cardDataArray.map((data, index) => (
              <CardComponent
                key={index}
                data={data}
                onPress={() => handleCardClick(data.title)}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#EFF9FF',
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
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#6c6c6c',
    paddingVertical: '1%',
    fontWeight: '600',
    lineHeight: 16,
    textAlign: 'left',
  },
  SearchANDFilter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  filterimg: {
    height: 60,
    width: 60,
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  cardContainer: {
    flexGrow: 1,
    marginBottom: 80,
    zIndex: 100,
  },
  scrollContent: {
    alignItems: 'flex-start',
  },
});

export default Dashbored;
