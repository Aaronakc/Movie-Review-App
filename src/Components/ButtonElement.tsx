import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

interface ButtonElementProps {
  text: string;
  onPress?:()=>void;
}
const ButtonElement = ({ text ,onPress}: ButtonElementProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={()=>onPress?.()}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: "89%",
    marginRight: 20,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#ce9503ff',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 0,
  },
  buttonText: {
    color: '#d3d1d1ff',
    fontSize: 16,
    fontWeight: 900,
    fontFamily: "Poppins-ExtraBold",
    letterSpacing: 1,
  },


})

export default ButtonElement