import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { Movies } from '../types/MoviesTypes'
import FastImage from 'react-native-fast-image';
import { RootStackParamList } from '../types/NavigationTypes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';



interface MovieCarouselProps {
  movies?: Movies[]
  topic: string
  loading: boolean
}


const SearchMovie = ({ topic, movies, loading }: MovieCarouselProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, "MovieDetailScreen">>()
  return (
    <View style={styles.listContainer}>
      <Text style={styles.title}>{topic}</Text>
      {loading ? <ActivityIndicator size="small" /> :
        movies && movies.length > 0 && <FlatList
          data={movies}
          horizontal
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity style={styles.flexBox} onPress={() => { navigation.navigate('MovieDetailScreen', { id: item.id }) }}>
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

export default SearchMovie