import React, { useState } from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import TextInput2 from '../components/Input';
// import Signin from '../../assets/images/SVG/forgotpassword.svg';
// import back from '../../assets/images/back-arrow.png';
// import SCREENS from '..';
// import CustomModal from '../components/Modal';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const [modalMessage, setModalMessage] = useState(''); // Message to display in the modal

  // const handlePasswordReset = async () => {
  //   if (!email.trim()) {
  //     setModalMessage('Please enter a valid email address.');
  //     setModalVisible(true);
  //     return;
  //   }

  //   try {
  //     await auth().sendPasswordResetEmail(email);
  //     setModalMessage('A password reset link has been sent to your email. Please check your inbox.');
  //     setModalVisible(true);
  //     navigation.navigate(SCREENS.EmailSuccess); // Navigate to success screen
  //   } catch (error) {
  //     console.error('Password reset error:', error.message);
  //     setModalMessage('Failed to send password reset email. Please try again.');
  //     setModalVisible(true);
  //   }
  // };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.signInText}>Forgot Password</Text>
        <Text style={styles.signInText}></Text>
      </View>

      <View style={styles.inputbox}>
        <Signin />
        <Text style={styles.instructions}>
          Please enter your email address. You will receive a link to create a
          new password via email.
        </Text>

        <TextInput2
          bgcolor={'#fff'}
          label={'Email'}
          placeholder={'Enter email address'}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.containersign}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={handlePasswordReset}
          style={styles.signInButton}
        >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View> */}

      {/* Custom Modal for alerts */}
      {/* <CustomModal 
        isVisible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        title="Password Reset"
        description={modalMessage} 
      /> */}
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
