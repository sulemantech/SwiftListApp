import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import back from '../../assets/images/back-arrow.png';
import Signin from '../../assets/images/SVG/passwordchanged.svg';
import SCREENS from '..';

const Congratulation = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.signInText}> </Text> */}
      </View>

      <View style={styles.inputbox}>
        {/* <Image source={Signin} style={styles.signinImage} /> */}
        <Signin />
        <Text style={styles.instructions}>
          Congratulation! Your password has been reset!
        </Text>
      </View>

      <View style={styles.containersign}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.signInButton}
          // onPress={() => navigation.navigate(SCREENS.login)}
          >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Congratulation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: '5%',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '10%',
  },
  back: {
    width: 25,
    height: 20,
  },
  signInText: {
    color: '#0c0c0c',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'OpenSans-Bold',
  },
  inputbox: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 20,
    marginTop: 40,
  },
  signinImage: {
    marginBottom: 10,
  },
  instructions: {
    color: '#6c6c6c',
    fontSize: 12,
    width: '100%',
    lineHeight: 23,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '300',
    textAlign: 'left',
    marginBottom: 10,
  },
  containersign: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButton: {
    width: '100%',
    backgroundColor: '#52C2FE',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
  },
});
