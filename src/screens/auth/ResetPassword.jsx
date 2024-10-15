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
import Signin from '../../assets/images/SVG/restpassword.svg';
import SCREENS from '..';

const ResetPassword = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>

        <Text style={styles.signInText}>Password Reset</Text>
      </View>

      <View style={styles.inputbox}>
        {/* <Image source={Signin} style={styles.signinImage} /> */}
        <Signin/>

        <Text style={styles.instructions}>Enter New Password And Confirm.</Text>

        <TextInput2
        bgcolor={'#fff'}
          label={'Enter New Password'}
          placeholder={'Enter new password'}
        />
        <TextInput2
        bgcolor={'#fff'}
          label={'Confirm Password'}
          placeholder={'Confirm password'}
        />
      </View>

      <View style={styles.containersign}>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.Congratulation)}
          style={styles.signInButton}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ResetPassword;

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
    justifyContent: 'center',
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
    marginTop: 40,
    alignItems: 'center',
    gap: 20,
  },
  signinImage: {
    marginBottom: 10,
    marginHorizontal: 'auto',
  },
  instructions: {
    color: '#6c6c6c',
    width: '100%',
    fontSize: 12,
    lineHeight: 23,
    marginHorizontal: 'auto',
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
    paddingVertical: 20,
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
