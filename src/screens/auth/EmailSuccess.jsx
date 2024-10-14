import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import back from '../../assets/images/back-arrow.png';
import Signin from '../../assets/images/SVG/emailsent.svg';
import SCREENS from '..';

const EmailSuccess = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.signInText}> </Text>
      </View>

      <View style={styles.inputbox}>
        {/* <Image source={Signin} style={styles.signinImage} /> */}
        <Signin />
        <Text style={styles.instructions}>
          Email has been sent to your email address. Please check your inbox for
          the email and follow the instructions.
        </Text>
      </View>

      <View style={styles.containersign}>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate(SCREENS.ResetPassword)}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailSuccess;

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
    marginTop: 7,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  signinImage: {
    marginBottom: 10,
  },
  instructions: {
    color: '#6c6c6c',
    fontSize: 12,
    lineHeight: 23,
    fontFamily: 'Poppins-Regular',
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
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
  },
});
