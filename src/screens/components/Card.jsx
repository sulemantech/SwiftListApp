import React from 'react';
import * as Progress from 'react-native-progress';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import circle from '../../assets/images/circle.png';

const CardComponent = ({ onPress, data = {} }) => {
  const {
    title,
    description,
    items,
    percentagetext,
    percentage,
    image,
    bgColor,
    badgeColor,
  } = data;

  const percent = percentage / 100;

  return (
    <TouchableOpacity style={[styles.cardContainer, { backgroundColor: bgColor }]} onPress={onPress}>
      <View style={[styles.contentContainer]}>
        <Text style={[styles.title, { color: badgeColor }]}>{title}</Text>
        <Text style={[styles.description, { color: badgeColor }]}>
          {description}
        </Text>
        <Text style={[styles.badge, { backgroundColor: badgeColor }]}>
          {items}
        </Text>
        <Text style={[styles.percentage, { color: badgeColor }]}>
          {percentagetext}
        </Text>
        <View style={[styles.progressview]}>
          <Progress.Bar progress={percent} borderWidth={0} color={badgeColor} animated={true} />
        </View>
      </View>
      <View style={[styles.contentContainer2]}>
        <Image source={circle} style={[styles.image2]} />
        {image && <Image source={image} style={[styles.image]} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 148,
    width: '100%',
    borderRadius: 22,
    flex: 1,
    marginVertical: 10,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 2,
    alignItems: 'flex-start',
    flex: 1,
    marginLeft: 15,
  },
  contentContainer2: {
    position: 'relative',
    flex: 1,
    padding: 10,
  },
  title: {
    fontFamily: 'Open Sans',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    textAlign: 'left',
  },
  description: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '300',
    lineHeight: 15,
    textAlign: 'left',
  },
  badge: {
    color: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 2,
    textAlign: 'center',
    borderRadius: 20,
  },
  percentage: {
    color: '#000',
  },
  image: {
    position: 'absolute',
    right: -0,
    bottom: 0,
    width: '90%',
    height: '105%',
  },
  image2: {
    position: 'absolute',
    right: -0,
    top: 0,
    width: '90%',
    height: '105%',
  },
  progressview: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
});

export default CardComponent;
