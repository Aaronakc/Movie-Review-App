import { View, StyleSheet, ScrollView, FlatList, Image, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth, signOut } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList, HomeTabScreenProps, NonAuthStackParamList } from '../types/NavigationTypes';
import { fetchMovies } from '../utils/fetchApi';
import { Movies } from '../types/MoviesTypes';
import MovieCarousel from '../Components/MovieCarousel';

const HomeScreen = ({ navigation }: HomeTabScreenProps<'BottomHome'>) => {

  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
      <Text style={styles.heading}>Welcome back, <Text style={styles.innerText} >Dilhara</Text>!</Text>
      <Text style={styles.subTitle}>Review or log film you've watched...</Text>
      </View>
      <MovieCarousel topic="Now Playing" endpoint='now_playing' />
      <MovieCarousel topic="Popular" endpoint='popular' />
      <MovieCarousel topic="Top Rated" endpoint='top_rated' />
      <MovieCarousel topic="Upcoming" endpoint='upcoming' />
    </ScrollView>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#002335",
  },
  textContainer:{
    marginLeft:12,
    marginBottom:15,
    marginTop:15,

  },
  heading:{
    fontWeight:700,
    color:"white",
    fontSize:20,
  },
  innerText:{
    color:"#FFCA45",
    fontFamily:"Poppins-Bold",

  },
  subTitle:{
    color:"#FFFFFF",
    fontSize:12,
    fontFamily:"Poppins-Regular",
  }


})

export default HomeScreen