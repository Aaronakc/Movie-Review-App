import { Text, StyleSheet, ImageBackground, Image, View, TouchableOpacity } from 'react-native'
import React from 'react'
import InputElement from '../Components/InputElement'
import ButtonElement from '../Components/ButtonElement'
import { BlurView } from '@react-native-community/blur';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NonAuthStackParamList } from '../types/NavigationTypes'

type Props = NativeStackScreenProps<NonAuthStackParamList, 'Signup'>;

const SignUpScreen = ({ navigation }: Props) => {
  console.log("signed up screen reached")
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
        <InputElement placeholder='Username' icon={require('../../assets/person.png')} backgroundColor='#a9a8a899' />
        <InputElement placeholder='Email' icon={require('../../assets/email.png')} backgroundColor='#a9a8a899' />
        <InputElement placeholder='Password' icon={require('../../assets/lock.png')} backgroundColor='#a9a8a899' />
        <ButtonElement text="Sign Up" />
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