import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import InputElement from '../Components/InputElement'
import ButtonElement from '../Components/ButtonElement'

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/LOGO.png')} style={styles.image} />

      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.font}>Please sign in to continue.</Text>
        <InputElement placeholder='Username' icon={require('../../assets/person.png')} />
        <InputElement placeholder='Password' icon={require('../../assets/lock.png')} />
        <Text style={styles.forgotPwText}>Forgot Password?</Text>
        <ButtonElement />
        <Text style={styles.signupText}>Don't have an account? Please <Text style={{ color: "#FFB703" }}>Sign Up</Text> first.</Text>

      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#002335"
  },
  image: {
    marginLeft: 16,
    marginTop: 21,

  },
  loginContainer: {
    width: 334,
    height: 350,

    flexDirection: "column",
    alignItems: "flex-end",
    marginBottom: 20,
    marginLeft: 13,
    borderRadius: 40,
    borderWidth: 1,
    // backgroundColor: 'rgba(205, 198, 198, 0.4)',
    backgroundColor: 'rgba(228, 209, 209, 0.4)',
    elevation: 12,



  },
  title: {
    color: "white",
    fontFamily: "serif",
    fontWeight: "bold",
    marginRight: 130,
    fontSize: 30,
    marginTop: 15,


  },
  font: {
    color: "white",
    fontFamily: "serif",
    marginRight: 80,
    marginTop: 10,
  },
  forgotPwText: {
    color: "#FFB703",
    marginRight: 17,
    marginTop: 15,
    fontWeight: 700,
    fontFamily: "serif",

  },
  signupText: {
    fontFamily: "serif",
    fontSize: 12,
    marginTop: 20,
    marginRight: 50,
    color: "white",
  }
})

export default LoginScreen