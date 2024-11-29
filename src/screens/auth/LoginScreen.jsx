import React, { useContext, useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import TextInput2 from '../components/Input';
import Signin from '../../assets/images/SVG/signin.svg';
import facebook from '../../assets/images/social-media-facebook.png';
import google from '../../assets/images/social-media-google.png';
import back from '../../assets/images/back-arrow.png';
import SCREENS from '..';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { ProductContext } from '../../Context/CardContext';

const LoginScreen = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { setUserName, isAuthenticated } = useContext(ProductContext);

  // useEffect(() => {
  GoogleSignin.configure({
    webClientId: '685029163622-b51etimc1vcq6o4elp3qp26achvil27v.apps.googleusercontent.com',
  });
  // }, []);

  async function onGoogleButtonPress() {
    try {
      setLoading(true);
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const signInResult = await GoogleSignin.signIn();
      const idToken = signInResult?.data?.idToken;
      const accessToken = signInResult?.data?.accessToken;
      if (!idToken) {
        throw new Error('No ID token found');
      }
      const googleCredential = auth.GoogleAuthProvider.credential(idToken, accessToken);
      await auth().signInWithCredential(googleCredential);
      const user = auth().currentUser;
      if (user) {
        const username = user.displayName || 'User';
        setUserName(username);
      }
      navigation.replace(SCREENS.Dashbored);
    } catch (error) {
      console.error('Google Sign-in error: ', error);
      Alert.alert('Error', 'Google Sign-In failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleSignIn = async () => {
    // Reset error messages
    setEmailError('');
    setPasswordError('');

    if (email === '') {
      setEmailError('Please fill in the email field.');
    }
    if (password === '') {
      setPasswordError('Please fill in the password field.');
    }
    if (email === '' || password === '') {
      return;
    }

    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      const user = auth().currentUser;
      if (user) {
        const username = user.displayName || 'User';
        setUserName(username);
      }
      navigation.replace(SCREENS.Dashbored);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  const onSignInButtonPress = () => {
    handleSignIn();
  };

  return (
    <ScrollView contentContainerStyle={styles.container} pointerEvents={loading ? "none" : "auto"} keyboardShouldPersistTaps="handled">
      <StatusBar animated={true} backgroundColor="#FFF" barStyle={'dark-content'} />
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.goBack()}>
          <Image source={back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.signInText}>Sign In</Text>
        <Text style={styles.signInText}></Text>
      </View>
      <View style={styles.inputbox}>
        <Signin />
        <TextInput2
          bgcolor={'#fff'}
          label={'Email/Phone Number'}
          placeholder={'Enter email address'}
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setEmailError(''); // Clear error as user types
          }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput2
          bgcolor={'#fff'}
          label={'Password'}
          placeholder={'Enter Password'}
          secureTextEntry={true}
          value={password}
          onChangeText={(value) => {
            setPassword(value);
            setPasswordError(''); // Clear error as user types
          }}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
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

        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate(SCREENS.ForgotPassword)}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containersign}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.signInButton}
          onPress={onSignInButtonPress}
          disabled={loading}
        >
          {!loading && <Text style={styles.buttonText}>Sign In</Text>}
          {loading && <View><ActivityIndicator size="large" color="#fff" /></View>}
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
            <TouchableOpacity activeOpacity={1} style={styles.innersocial}>
              <Image source={facebook} style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>
                Continue with Facebook
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containersocial}>
          <View style={styles.social}>
            <TouchableOpacity activeOpacity={1} style={styles.innersocial} onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
              disabled={loading}>
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

        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate(SCREENS.signup)}>
          <Text style={styles.forgotPassword}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )} */}
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
  },
  forgotPassword: {
    color: '#52C2FE',
    fontFamily: 'Poppins-Light',
    fontSize: 12,
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
    height: 50,
    backgroundColor: '#52C2FE',
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    flexDirection: 'row',  // Ensures horizontal alignment of the content
  },

  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  socialButtonText: {
    marginLeft: 10,
    fontFamily: 'Poppins-Regular',
    color: '#8C8C8C',
    fontSize: 12,
  },
  errorText: {
    color: 'red',
    width: '100%',
    fontSize: 12,
    paddingLeft: 16,
    marginTop: -8,
    textAlign: 'left',
    fontFamily: 'Poppins-Medium',
  },
});
