import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Movies } from '../types/MoviesTypes'
import { fetchMovies } from '../utils/fetchApi';
import FastImage from 'react-native-fast-image';
import { HomeTabScreenProps } from '../types/NavigationTypes';

interface MovieCarouselProps {
  topic?: string;
  endpoint?: string;
  navigation?: HomeTabScreenProps<'BottomHome'>["navigation"]
  searchedMovies?: Movies[]
}


const MovieCarousel = ({ topic, endpoint, navigation, searchedMovies }: MovieCarouselProps) => {

  const [movies, setMovies] = useState<Movies[]>(searchedMovies && searchedMovies.length > 0 ? searchedMovies : [])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true)
      try {
        const fetchedMovies = await fetchMovies(endpoint)
        setMovies(fetchedMovies)
        console.log(`Fetched ${topic}:`, fetchedMovies)
      } catch (error) {
        console.error(`Error fetching ${topic}:`, error)
      }
      finally {
        setLoading(false)
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
        <FlatList
          data={movies}
          horizontal
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity style={styles.flexBox} onPress={() => navigation?.navigate('MovieDetailScreen', { id: item.id })}>
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
    fontSize: 16,
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