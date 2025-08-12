import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Endpoint, Movies, MoviesPayload } from '../types/MoviesTypes'
import { fetchMovies } from '../utils/fetchApi';
import FastImage from 'react-native-fast-image';
import { BottomTabParamList, HomeTabScreenProps } from '../types/NavigationTypes';
import Toast from 'react-native-toast-message';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getMovies } from '../redux/asyncActions';


interface MovieCarouselProps {
  topic?: string;
  endpoint?: Endpoint;
  navigation?: HomeTabScreenProps<keyof BottomTabParamList>["navigation"] 
  
  searchedMovies?: Movies[]
}


const MovieCarousel = ({ topic, endpoint, navigation, searchedMovies }: MovieCarouselProps) => {
  const { movies, loading} = useAppSelector(state => state.movie)
  const categorizedMovie = endpoint ? movies[endpoint] : []
  const dispatch = useAppDispatch()

  // console.log(movies)

  useEffect(() => {
    const loadMovies = async () => {
      try {
        if (endpoint) {
          if(movies[endpoint].length > 0) {
            return;
          }
          await dispatch(getMovies(endpoint))
        }

      }
      catch (error) {
        console.log(error)
        Toast.show({ type: "error", text1: "Error", text2: "Something went wrong!", visibilityTime: 1000 })
      }
    }
    if (endpoint) {
      loadMovies()
    }

  }, [endpoint])


  return (

    <View style={styles.listContainer}>
      <Text style={styles.title}>{topic}</Text>
      {loading ? <ActivityIndicator size="small" /> :
        categorizedMovie.length > 0 && <FlatList
          data={categorizedMovie}
          horizontal
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity style={styles.flexBox} onPress={() => navigation?.navigate('MovieDetailScreen', { endpoint,id: item.id })}>
                <FastImage
                  source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
                  style={styles.image}
                />
                <View style={{ flex: 1 }}>

                  <Text numberOfLines={1} ellipsizeMode='tail' style={styles.movieTitle} >{(item.title)}</Text>
                </View>

              </TouchableOpacity>

            </>
          )}
          showsHorizontalScrollIndicator={false}
        />
      }
    </View>

  )
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 160,
    borderRadius: 8,
    marginRight: 12,

  },
  listContainer: {
    width: 384,
    height: 235,


  },
  flexBox: {
    width: 120,
    height: 213,
    flexDirection: "column",
    marginHorizontal: 10,

  },
  title: {
    marginLeft: 13,
    color: "white",
    fontFamily: "Poppins-SemiBold",
    fontWeight: 600,
    marginBottom: 10,
    fontSize: 18,
  },

  movieTitle: {
    color: "white",
    fontFamily: "Poppins-Regular",
    fontWeight: 400,
    fontSize: 14,
    paddingTop: 5,

  }

})

export default MovieCarousel