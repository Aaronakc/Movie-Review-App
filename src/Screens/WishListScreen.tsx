import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MovieCarousel from '../Components/MovieCarousel'

const WishListScreen = () => {
  return (
    <View style={styles.container}>
      <MovieCarousel endpoint='favorite' />
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