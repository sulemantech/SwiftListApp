import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import TextInput2 from '../components/Input';
import Signin from '../../assets/images/SVG/signin.svg';
import facebook from '../../assets/images/social-media-facebook.png';
import google from '../../assets/images/social-media-google.png';
import back from '../../assets/images/back-arrow.png';
import SCREENS from '..';

const LoginScreen = ({navigation}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.signInText}>Sign In</Text>
        <Text style={styles.signInText}> </Text>
      </View>

      <View style={styles.inputbox}>
        {/* <Image source={Signin} style={styles.signinImage} /> */}
        <Signin />
        <TextInput2
          bgcolor={'#fff'}
          label={'Email/Phone Number'}
          placeholder={'Enter Email Address'}
        />
        <TextInput2
          bgcolor={'#fff'}
          label={'Password'}
          placeholder={'Enter Password'}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            onValueChange={setIsChecked}
            tintColors={{true: '#52C2FE', false: '#52C2FE'}}
          />
          <Text style={styles.checkboxLabel}>Keep me signed in</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.ForgotPassword)}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containersign}>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => navigation.navigate(SCREENS.Dashbored)}>
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
          <View style={styles.social}>
            <TouchableOpacity style={styles.innersocial}>
              <Image source={facebook} style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>
                Continue with Facebook
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containersocial}>
          <View style={styles.social}>
            <TouchableOpacity style={styles.innersocial}>
              <Image source={google} style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.row2}>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Don't Have an Account?</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.signup)}>
          <Text style={styles.forgotPassword}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 70,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: '5.5%',
    fontFamily: 'Poppins-Regular',
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
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flexDirection: 'column',
    width: '100%',
  },
  signinImage: {
    marginBottom: 10,
    marginHorizontal: 'auto',
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
  socialIcon: {
    width: 35,
    height: 35,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    height: 60,
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
    paddingVertical: 10,
    lineHeight: 6,
    textAlign: 'center',
    color: '#fff',
  },
  containerline: {
    alignItems: 'center',
    marginVertical: 20,
    fontFamily: 'Poppins-Regular',
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
    fontFamily: 'Poppins-Regular',
  },
  social: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#8C8C8C',
    borderWidth: 1,
    borderRadius: 30,
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  innersocial: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  socialButtonText: {
    color: '#8C8C8C',
    fontSize: 13,
    width: 200,
    overflow: 'hidden',
    fontWeight: '500',
    marginLeft: 10,
    fontFamily: 'Poppins-Medium',
  },
});
