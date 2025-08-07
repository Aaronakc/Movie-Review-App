import { Text, StyleSheet, ImageBackground, Image, View, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import InputElement from '../Components/InputElement'
import ButtonElement from '../Components/ButtonElement'
import { BlurView } from '@react-native-community/blur';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/NavigationTypes'
import { createUserWithEmailAndPassword, getAuth, signOut } from '@react-native-firebase/auth';


type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignUpScreen = ({ navigation }: Props) => {
  // const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const emailFormat = /^.+@.+\..+$/;




  const handleEmail = (text: string) => {
    setEmail(text.trim());
    setError('');
    setErrorMessage('');

  }
  const handlePassword = (text: string) => {
    setPassword(text.trim());
    setError('');
    setErrorMessage('');

  }
  const handleConfirmPassword = (text: string) => {
    setConfirmPassword(text.trim())
    setError('');
    setErrorMessage('');

  }
  // console.log("signed up screen reached")


  const validateSignUp = () => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      return false;

    }
    else if (!emailFormat.test(email)) {
      setError('email');
      setErrorMessage('Invalid Email Format');
      return false;
    }

    else if (password.length < 6) {
      setError('password');
      setErrorMessage('Password must be atleast 6 characters')
      return false;
    }

    else if (password !== confirmPassword) {
      setError('confirmPw')
      setErrorMessage('Password did not match')
      return false;
    }
    return true;

  }

  const handleSignup = () => {
    const isValid = validateSignUp()
    if (!isValid) {
      return;
    }
    setLoading(true)
    createUserWithEmailAndPassword(getAuth(), email, password)
    
      .then(() => {
        console.log('User account created!');
      
         navigation.navigate('Login');
        // getAuth().signOut();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      })
      .finally(() => setLoading(false))


  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <ImageBackground style={styles.container} source={require('../../assets/signupBackground.png')} >
      <View style={styles.darkLayer} />
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.image} />
      </View>

      <View style={styles.signUpContainer}>
        {/* <BlurView
          style={styles.blurBackground}
          blurType="light"
          blurAmount={15}
          reducedTransparencyFallbackColor="white"
        /> */}

        <View style={styles.innerdarkLayer} />
        <Text style={styles.title}>Sign up</Text>

        <Text style={styles.font}>Create an account to continue.</Text>
        <InputElement placeholder='Email' icon={require('../../assets/email.png')} backgroundColor='#a9a8a899' onChange={handleEmail} error={error} errorMessage={errorMessage} name='email' color='red' />
        <InputElement placeholder='Password' icon={require('../../assets/lock.png')} backgroundColor='#a9a8a899' onChange={handlePassword} error={error} errorMessage={errorMessage} name='password' color='red' />
        <InputElement placeholder='ConfirmPw' icon={require('../../assets/person.png')} backgroundColor='#a9a8a899' onChange={handleConfirmPassword} error={error} errorMessage={errorMessage} name='confirmPw' color='red' />
        <ButtonElement text="Sign Up" onPress={handleSignup} />
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Already have an account? Go to the </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login Page</Text>
          </TouchableOpacity>
        </View>
        {/* </BlurView> */}
      </View>
    </ImageBackground >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",

  },
  imageContainer: {
    width: 144.7,
    height: 42.7,
    alignItems: "center",


  },
  image: {
    width: "100%",
    height: "100%",
    marginLeft: 30,
    marginTop: 25,
  },
  darkLayer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  signUpContainer: {
    width: 334,
    // height:340,
    flexDirection: "column",
    alignItems: "flex-end",
    marginBottom: 20,
    marginLeft: 13,
    borderRadius: 40,
    paddingBottom: 30,
    // backgroundColor: 'rgba(167, 166, 166, 0.85)',
    elevation: 12,
    position: 'relative',
    overflow: 'hidden',



  },
  innerdarkLayer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(114, 114, 114, 0.27)',
    borderRadius: 40,

  },

  title: {
    color: '#c9c6c6ff',
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
    marginRight: 120,
    fontSize: 30,
    marginTop: 10,


  },
  font: {
    // color: "white",
    color: '#c9c6c6ff',
    fontFamily: "OpenSans-SemiBold",
    lineHeight: 16,
    marginRight: 70,
    marginTop: 10,
    fontWeight: "semibold",
    marginBottom: 15,
  },

  signupText: {
    color: '#c9c6c6ff',
    fontFamily: "OpenSans-Regular",
    fontSize: 12,
  },
  blurBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 40,
  },
  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginRight: 40,
  },
  loginLink: {
    color: '#f2a20fff',
    fontWeight: '900',
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
  }



})

export default SignUpScreen