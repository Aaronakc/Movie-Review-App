import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const ButtonElement = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: "95%",
    marginRight: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FFB703',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: "serif",
  },


})

export default ButtonElement