import { View, StyleSheet, TextInput, Image, Text } from 'react-native'
import React from 'react'


interface InputElementProps {
  placeholder: string;
  icon: any;
  backgroundColor: string;
  onChange?: (text: string) => void;
  value?: string;
  error?: string;
  errorMessage?: string;
  name?: string;
  color?: string;

}

const InputElement = ({ placeholder, icon, backgroundColor, onChange, value, error, errorMessage, name, color }: InputElementProps) => {
  let passwordNotMatched = (error == "confirmPw" && name == "password")
  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { backgroundColor: backgroundColor, borderColor: (name && error && name == error || passwordNotMatched) ? "red" : undefined }]}>
        <Image source={icon} style={styles.icon} />
        <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor='#d3d1d1ff' onChangeText={(text) => onChange?.(text)} value={value} />
      </View>
      {
        error == name ? <Text style={{ color: color}}>
          {errorMessage}
        </Text>:null
      }
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