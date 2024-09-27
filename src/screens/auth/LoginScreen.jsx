import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import CheckBox from '@react-native-community/checkbox';
import TextInput2 from '../components/Input';
import Signin from '../../assets/images/Signin.png';
import facebook from '../../assets/images/social-media-facebook.png';
import google from '../../assets/images/social-media-google.png';

const LoginScreen = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>↑</Text>
        </TouchableOpacity>
        <Text style={styles.signInText}>Sign In</Text>
        <Text style={styles.signInText}></Text>
      </View>

      <View style={styles.inputbox}>
        <Image source={Signin} style={styles.signinImage} />
        <TextInput2
          label={'Email/PhoneNumber'}
          placeholder={'Enter Email Address'}
        />
        <TextInput2 label={'Password'} placeholder={'Enter Password'} />
      </View>

      <View style={styles.row}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            onValueChange={setIsChecked}
            tintColors={{ true: '#52C2FE', false: '#52C2FE' }}
          />
          <Text style={styles.checkboxLabel}>Keep me signed in</Text>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containersign}>
        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerline}>
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.line} />
        </View>
      </View>

      <View style={styles.socialouterview}>
        <View style={styles.containersocial}>
          <TouchableOpacity style={styles.social}>
            <Image source={facebook} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Sign In with Facebook</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containersocial}>
          <TouchableOpacity style={styles.social}>
            <Image source={google} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Sign In with Google</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row2}>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Dont Have an Account </Text>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

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
    height: '7%',
  },
  back: {
    color: '#6c6c6c',
    transform: [{ rotate: '-90deg' }],
    fontSize: 30,
  },
  signInText: {
    color: '#6c6c6c',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  inputbox: {
    width: '100%',
    marginTop: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinImage: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#000',
    marginLeft: 8,
  },
  forgotPassword: {
    color: '#52C2FE',
    fontSize: 14,
  },
  containersign: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containersocial: {
    marginTop: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialouterview: {
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
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    fontWeight: '500',
    paddingVertical: 10,
    lineHeight: 16,
    textAlign: 'center',
    color: '#fff',
  },
  containerline: {
    alignItems: 'center',
    marginVertical: 20,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#52C2FE',
  },
  dividerText: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    color: '#52C2FE',
    fontWeight: 'bold',
  },
  social: {
    width: '100%',
    backgroundColor: '#fff', 
    borderColor: '#8C8C8C', 
    borderWidth: 1, 
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  socialButtonText: {
    color: '#8C8C8C', 
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 10, 
  },

});
