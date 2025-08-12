import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ImageGallery from '../Components/ImageGallery'

const WishListScreen = () => {
  return (
    <View style={styles.container}>
      <ImageGallery />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002335",
  }
})

export default WishListScreen