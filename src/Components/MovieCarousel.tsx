import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Endpoint, } from '../types/MoviesTypes'
import FastImage from 'react-native-fast-image';
import { BottomTabParamList, HomeTabScreenProps } from '../types/NavigationTypes';
import Toast from 'react-native-toast-message';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getMovies } from '../redux/asyncActions';



interface MovieCarouselProps {
  topic?: string;
  endpoint?: Endpoint;
  navigation?: HomeTabScreenProps<keyof BottomTabParamList>["navigation"]


}


const MovieCarousel = ({ topic, endpoint, navigation }: MovieCarouselProps) => {
  const { movies, loading, error, totalPages } = useAppSelector(state => state.movie)
  const categorizedMovie = endpoint ? movies[endpoint] : []
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)




  // console.log(movies)
  // console.log(totalPages)

  useEffect(() => {
    setPage(1)
    const loadMovies = async () => {
      try {
        if (endpoint && !loadingMore) {
          if (movies[endpoint].length > 0) {
            return;
          }
          await dispatch(getMovies({ endpoint, page }))
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

  const handleEndReached = async () => {
    if (!endpoint || loadingMore) return;
    if (page >= (totalPages[endpoint] || 1)) return;
    setLoadingMore(true)
    try {
      await dispatch(getMovies({ endpoint, page: page + 1 }));
      setPage(prev => prev + 1);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to load more movies' });
    } finally {
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    if (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: error });
    }
  }, [error])


  return (

    <View style={styles.listContainer}>
      <Text style={styles.title}>{topic}</Text>
      {loading && !loadingMore && categorizedMovie.length == 0 ? <ActivityIndicator size="small" /> :
        categorizedMovie.length > 0 && <FlatList
          data={categorizedMovie}
          horizontal
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={styles.flexBox} onPress={() => navigation?.navigate('MovieDetailScreen', { endpoint, id: item.id })}>
              <FastImage
                source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
                style={styles.image}
              />
              <View style={{ flex: 1 }}>

                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.movieTitle} >{(item.title)}</Text>
              </View>

            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={
            loadingMore ? (
              <View style={styles.loader}>
                <ActivityIndicator size="small" color="white" />
              </View>
            ) : null
          }


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

  },
  loader: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center'

  }

})

export default MovieCarousel