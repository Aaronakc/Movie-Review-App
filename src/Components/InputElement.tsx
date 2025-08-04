import { View, StyleSheet, TextInput, Image } from 'react-native'
import React from 'react'


interface InputElementProps {
  placeholder: string;
  icon: any;
  backgroundColor:string;
}

const InputElement = ({ placeholder, icon,backgroundColor }: InputElementProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer,{backgroundColor:backgroundColor}]}>
        <Image source={icon} style={styles.icon} />
        <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor='#d3d1d1ff' />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    marginBottom: 15,
    // marginTop: 15,
    marginLeft: 17,
    marginRight: 17,

  },
  inputContainer: {
    flexDirection: "row",
    // backgroundColor: "gray",
    borderRadius: 14,
    borderWidth: 0.2,
    borderColor: "white",
    alignItems: "center",
    gap: 5,
  },
  input: {
    // borderWidth: 0.25,
    borderColor: "white",
    width: 300,
    height: 40,
    fontFamily: "serif",
    // borderRadius: 14,

  },
  icon: {
    marginLeft: 20,


  }

})

export default InputElement