import { View, StyleSheet, ScrollView, FlatList, Image, Text } from 'react-native'
import React from 'react'
import {  HomeTabScreenProps } from '../types/NavigationTypes';
import MovieCarousel from '../Components/MovieCarousel';

const HomeScreen = ({ navigation }: HomeTabScreenProps<'BottomHome'>) => {

  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Welcome back, <Text style={styles.innerText} >Dilhara</Text>!</Text>
        <Text style={styles.subTitle}>Review or log film you've watched...</Text>
      </View>
      <MovieCarousel topic="Now Playing" endpoint='now_playing' navigation={navigation} />
      <MovieCarousel topic="Popular" endpoint='popular' navigation={navigation} />
      <MovieCarousel topic="Top Rated" endpoint='top_rated' navigation={navigation} />
      <MovieCarousel topic="Upcoming" endpoint='upcoming' navigation={navigation} />
    </ScrollView>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002335",
  },
  textContainer: {
    marginLeft: 12,
    marginBottom: 15,
    marginTop: 15,

  },
  heading: {
    fontWeight: 700,
    color: "white",
    fontSize: 20,
  },
  innerText: {
    color: "#FFCA45",
    fontFamily: "Poppins-Bold",

  },
  subTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Poppins-Regular",
  }


})

export default HomeScreen