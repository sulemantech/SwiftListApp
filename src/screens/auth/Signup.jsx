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
  import Signin from '../../assets/images/Signup.png';
  import back from '../../assets/images/back-arrow.png';

  import SCREENS from '..';
  
  const SignUpScreen = ({ navigation }) => {
    const [isChecked, setIsChecked] = useState(false);
  
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.back} />
          </TouchableOpacity>
          <Text style={styles.signInText}>Sign Up</Text>
          <Text style={styles.signInText}></Text>
        </View>
  
        <View style={styles.inputbox}>
          <Image source={Signin} style={styles.signinImage} />
          <TextInput2 label={'Name'} placeholder={'Enter User Name'} />
          <TextInput2 label={'Email/PhoneNumber'} placeholder={'Enter Email Address'} />
          <TextInput2 label={'Password'} placeholder={'Enter Password'} secureTextEntry={true} />
          <TextInput2 label={'Confirm Password'} placeholder={'Re-Enter Password'} secureTextEntry={true} />
        </View>
  
        <View style={styles.containersign}>
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
  
        <View style={styles.row2}>
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>Already Have an Account? </Text>
          </View>
  
          <TouchableOpacity onPress={() => navigation.navigate(SCREENS.login)}>
            <Text style={styles.forgotPassword}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default SignUpScreen;
  
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
        width: 25,
        height: 20
      },
    signInText: {
      color: '#6c6c6c',
      fontSize: 20,
      fontFamily: 'Poppins-Regular',
    },
    inputbox: {
      width: '100%',
      flex: 0.9,
      marginTop: 7,
    },
    signinImage: {
      marginBottom: 10,
      marginHorizontal:"auto"
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
      color: "#8c8c8c",
      marginLeft: 8,
      fontFamily: 'Poppins-Regular',
    },
    forgotPassword: {
      color: '#52C2FE',
      fontSize: 14,
      fontFamily: 'Poppins-Regular',
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
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
      fontWeight: '500',
      paddingVertical: 10,
      lineHeight: 16,
      textAlign: 'center',
      color: '#fff',
    },
  });
  