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
        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.buttonText}>Sign Up</Text>
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
    color: '#6c6c6c',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
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
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#8c8c8c',
    fontFamily: 'Poppins-Regular',
    marginRight: 5,
  },
  forgotPassword: {
    color: '#52C2FE',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  containersign: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButton: {
    width: '100%',
    backgroundColor: '#52C2FE',
    borderRadius: 30,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16,
    textAlign: 'center',
    color: '#fff',
  },
});
