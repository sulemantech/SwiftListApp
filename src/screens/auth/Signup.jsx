import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import TextInput2 from '../components/Input';
import Signin from '../../assets/images/SVG/signup.svg';
import back from '../../assets/images/back-arrow.png';

import SCREENS from '..';

const SignUpScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.signInText}>Sign Up</Text>
        <Text style={styles.signInText}> </Text>
      </View>

      <View style={styles.inputbox}>
        {/* <Image source={Signin} style={styles.signinImage} /> */}
        <Signin/>
        <TextInput2 bgcolor={'#fff'} label={'Name'} placeholder={'Enter User Name'} />
        <TextInput2
        bgcolor={'#fff'}
          label={'Email/Phone Number'}
          placeholder={'Enter Email Address'}
        />
        <TextInput2
        bgcolor={'#fff'}
          label={'Password'}
          placeholder={'Enter Password'}
          secureTextEntry={true}
        />
        <TextInput2
        bgcolor={'#fff'}
          label={'Confirm Password'}
          placeholder={'Re-Enter Password'}
          secureTextEntry={true}
        />
      </View>

      <View style={styles.containersign}>
        <TouchableOpacity
          style={styles.signInButton}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row2}>
        <Text style={styles.checkboxLabel}>Already Have an Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.login)}>
          <Text style={styles.forgotPassword}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#fff',
    paddingHorizontal: '5%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    top: 0,
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
    marginVertical: 30,
    alignSelf: 'center',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal:'auto',
    width: '70%',
  },
  checkboxLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Light',
    color: '#8c8c8c',
    marginLeft: 8,
  },
  forgotPassword: {
    color: '#52C2FE',
    fontFamily: 'Poppins-Light',
    fontSize: 12,
  },
  containersign: {
    marginTop: 10,
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButton: {
    width: '100%',
    height:50,
    backgroundColor: '#52C2FE',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    // paddingVertical: 10,
    lineHeight: 16,
    textAlign: 'center',
    color: '#fff',
  },
});
