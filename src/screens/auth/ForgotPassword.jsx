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
import Signin from '../../assets/images/SVG/forgotpassword.svg';
import back from '../../assets/images/back-arrow.png';
import SCREENS from '..';

const ForgotPassword = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.signInText}>Forgot Password</Text>
        <Text style={styles.signInText}> </Text>
      </View>

      <View style={styles.inputbox}>
        {/* <Image source={Signin} style={styles.signinImage} /> */}
        <Signin />

        <Text style={styles.instructions}>
          Please Enter Your Email Address. You will receive a link to create a
          new Password via email.
        </Text>

        <TextInput2
          bgcolor={'#fff'}
          label={'Email/PhoneNumber'}
          placeholder={'Enter Email Address'}
        />
      </View>

      <View style={styles.containersign}>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.EmailSuccess)}
          style={styles.signInButton}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    paddingHorizontal: '5%',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
    marginTop: 50,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  signinImage: {
    marginBottom: 10,
    marginHorizontal: 'auto',
  },
  instructions: {
    color: '#6c6c6c',
    fontSize: 12,
    width: '100%',
    lineHeight: 23,
    fontFamily: 'Poppins-Regular',
    fontWeight: '300',
    textAlign: 'left',
    marginBottom: 10,
  },
  containersign: {
    marginTop: 10,
    width: '100%',
    fontFamily: 'Poppins-Regular',
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
