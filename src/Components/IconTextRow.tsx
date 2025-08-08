import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

interface IconTextRowProps{
  icon?:any;
  text?:string;
  width?:number,
  height?:number;
  fontSize?:number;
  color?:string;
}


const IconTextRow = ({icon,text,width,height,fontSize,color}:IconTextRowProps) => {
  return (
    <View style={styles.flexBox}>
      <Image source={icon} style={{width:width,height:height}}/>
      <Text style={{fontSize:fontSize,color:color}}>{text}</Text>
     
    </View>
  )
}

const styles=StyleSheet.create({
  flexBox:{
    flexDirection:"row",
    gap:8,
    alignItems:"center",
  }
})

export default IconTextRow