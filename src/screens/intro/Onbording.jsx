import {
  View,
  FlatList,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState, useRef} from 'react';
import OnboardingItem from './Onbordingitem';
import pic1 from '../../assets/images/1.png';
import pic2 from '../../assets/images/2.png';
import pic3 from '../../assets/images/3.png';
import pic4 from '../../assets/images/4.png';
import pic5 from '../../assets/images/5.png';
import SCREENS from '..';

export default function Onboarding({navigation}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  // const {navigation}=props;

  const slides = [
    {
      id: '1',
      title: 'Organize Your Grocery Essentials',
      description:
        'Keep Track Of All Your Shoping needs in one place. Add , edit, and check off items effortlessly',
      image: pic1,
    },
    {
      id: '2',
      title: 'Plan Your Growming Routine',
      description:
        'stay on top of your self-care with scheduled reminders and custom groming lists.',
      image: pic2,
    },
    {
      id: '3',
      title: 'Track Your Spiritual journey',
      description:
        'Keep track of all your shopping needs in one place. Add, edit, and check off items effortlessly.',
      image: pic3,
    },
    {
      id: '4',
      title: 'Manage Your Daily To Do Tasks',
      description:
        'Simplify your day by organizing tasks with ease. Prioritize, set deadlines, and stay productive.',
      image: pic4,
    },
    {
      id: '5',
      title: 'Create Your Perfect Kitchen Menu',
      description:
        'Plan meals for the week with recipes. Organize ingredients and streamline cooking process.',
      image: pic5,
    },
  ];

  const ViewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      navigation.navigate(SCREENS.login);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.skip}
        onPress={() => navigation.navigate(SCREENS.login)}
        activeOpacity={0.7} // Add this for better feedback on touch
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        data={slides}
        renderItem={({item}) => <OnboardingItem item={item} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={ViewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              slidesRef.current.scrollToIndex({index});
              setCurrentIndex(index); // Update the currentIndex when a dot is pressed
            }}
            style={[
              styles.dotContainer,
              currentIndex === index ? styles.activeDotContainer : null,
            ]}>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor:
                    currentIndex === index ? '#52C3FF' : '#A1DEFF',
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Next/Get Started Button */}
      <TouchableOpacity onPress={handleNext} style={styles.button}>
        <Text style={styles.buttonText}>
          {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 160, // Adjust position
  },
  dotContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 12, // Increased to provide equal space around dot
    height: 12,
    margin: 0, // Keep the margin for consistent spacing between dots
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 5,
  },
  activeDotContainer: {
    borderWidth: 1, // 1px space between the dot and the border
    borderColor: '#52C3FF',
    borderRadius: 15,
    padding: 3, // Adds uniform padding around the dot
  },
  button: {
    position: 'absolute',
    width: '80%',
    bottom: 70, // Position below pagination
    backgroundColor: '#52C3FF', // Same color as active dot
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 200,
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    textAlign: 'center',
  },
  skip: {
    padding: 10, 
    position: 'absolute', // Positioning in the top right corner
    top: 20,
    right: 20,
    zIndex: 1000
  },
  skipText: {
    color: '#6c6c6c', // Text color
    fontSize: 16, 
    fontFamily: 'Poppins-Regular',
  },
});
