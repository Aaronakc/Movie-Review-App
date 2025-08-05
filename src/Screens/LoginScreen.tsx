import { View, Text, StyleSheet, Image, ImageBackground, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import InputElement from '../Components/InputElement'
import ButtonElement from '../Components/ButtonElement'
import { BlurView } from '@react-native-community/blur';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NonAuthStackParamList } from '../types/NavigationTypes';

type Props = NativeStackScreenProps<NonAuthStackParamList, 'Login'>;


const LoginScreen = ({ navigation }: Props) => {
  return (
    <ImageBackground style={styles.container} source={require('../../assets/loginBackground.png')}>
      <View style={styles.darkLayer} />
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.image} />
      </View>

      <View style={styles.loginContainer}>
        {/* <BlurView blurType="dark" blurAmount={25}> */}
        {/* <BlurView
          style={styles.blurBackground}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        /> */}
        <View style={styles.innerdarkLayer} />

        <Text style={styles.title}>Login</Text>
        <Text style={styles.font}>Please sign in to continue.</Text>
        <InputElement placeholder='Username' icon={require('../../assets/person.png')} backgroundColor='#acacac99' />
        <InputElement placeholder='Password' icon={require('../../assets/lock.png')} backgroundColor='#acacac99' />
        <Text style={styles.forgotPwText}>Forgot Password?</Text>
        <ButtonElement text="Login" />
        <View style={styles.signUpRow}>
          <Text style={styles.signupText}>Don't have an account? Please </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}><Text style={{ color: "#FFB703", fontFamily: "OpenSans-Bold", fontSize: 12 }} >Sign Up </Text></TouchableOpacity>
          <Text style={styles.signupText}>
            first.
          </Text>
        </View>
        {/* </BlurView> */}
        {/* </BlurView> */}
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#002335"
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
  blurBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 40,
  },

  darkLayer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  loginContainer: {
    width: 334,
    height: 350,
    flexDirection: "column",
    alignItems: "flex-end",
    marginBottom: 20,
    marginLeft: 13,
    borderRadius: 40,
    position: 'relative',   // enable absolute children positioning
    overflow: 'hidden',
    // borderWidth: 1,
    // backgroundColor: 'rgba(205, 198, 198, 0.4)',
    backgroundColor: 'rgba(228, 209, 209, 0.4)',
    elevation: 12,
  },
  title: {
    // color: "white",
    // color: 'rgba(255, 255, 255, 0.9)',
    color: '#d3d1d1ff',


    fontFamily: "Poppins-Bold",
    letterSpacing: 1.5,
    fontWeight: "bold",
    marginRight: 130,
    fontSize: 30,
    marginTop: 10,
  },
  font: {
    // color: "white",
    color: '#d3d1d1ff',

    fontFamily: "OpenSans-SemiBold",
    marginRight: 80,
    marginTop: 5,
    marginBottom: 20,
  },
  forgotPwText: {
    color: "#FFB703",
    marginRight: 17,
    marginTop: 0,
    fontWeight: 700,
    fontFamily: "OpenSans-Bold",
    marginBottom: 15,
  },
  innerdarkLayer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: 'rgba(218, 211, 211, 0.2)',
    // backgroundColor: 'rgba(56, 55, 55, 0.2)',
    backgroundColor: 'rgba(56, 55, 55, 0.27)',
    // backgroundColor: 'rgba(255, 255, 255, 0.2)'
    borderRadius: 40,


  },

  signupText: {
    fontFamily: "OpenSans-Regular",
    fontWeight: 400,
    fontSize: 12,
    color: "white",
  },
  signUpRow: {
    marginTop: 20,
    marginRight: 50,
    flexDirection: "row",
    alignItems: "center"
  }
})

export default LoginScreen