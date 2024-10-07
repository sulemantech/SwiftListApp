import {Text, View, useWindowDimensions, StyleSheet} from 'react-native';
import React from 'react';
const OnboardingItem = ({item}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      <item.image />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.divder}> </Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    justifyContent: 'center',
  },
  textContainer: {
    marginTop: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '600',
    color: '#0c0c0c',

    marginBottom: 10,
    textAlign: 'center',
  },
  divder:{
    width: 54,
    height: 2,
    borderWidth: 1,
    borderColor:'#81CAED',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    color: '#6c6c6c',
    fontWeight: '300',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 23,
    paddingHorizontal: 24,
  },
});

export default OnboardingItem;
