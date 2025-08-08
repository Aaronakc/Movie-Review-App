import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { HomeTabScreenProps, RootStackParamList, RootStackScreenProps } from '../types/NavigationTypes';
import { fetchMovieDetail } from '../utils/fetchMovieDetail';
import { MovieDetail } from '../types/MoviesTypes';
import { RouteProp } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { addToWish, getAllReviews } from '../utils/firestoreDatabase';
import { Review } from '../types/ReviewTypes';
import Toast from 'react-native-toast-message';
import Loader from './Loader';

interface MovieCardProps {
  route: RouteProp<RootStackParamList, 'MovieDetailScreen'>;
  navigation?: RootStackScreenProps<'MovieDetailScreen'>["navigation"]
}

const MovieDetailCard = ({ route, navigation }: MovieCardProps) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [review, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)

  const id = route.params?.id

  useEffect(() => {
    const loadMovieDetail = async () => {
      setLoading(true)
      try {
        const movieData = await fetchMovieDetail(id)
        console.log('movie', movieData)
        setMovie(movieData)
      }
      catch (error) {
        Toast.show({ type: "error", text1: "Error", text2: 'Something went wrong', visibilityTime: 1000 })
        console.log('error from movie detail',error)

      }
      finally {
        setLoading(false)
      }

    }
    if (id) {
      loadMovieDetail()
    }

  }, [id])

  const addToWishList = async (id: string, poster_path: string) => {

    try {
      const response = await addToWish(id, poster_path)
      if (response) {
        navigation?.navigate('Home');
        Toast.show({ type: "success", text1: "success", text2: "Wishlist Added!" })
      }
      else {
        Toast.show({ type: "info", text1: "Information", text2: "Wishlist already exit!", visibilityTime: 1000 })

      }
    }
    catch (error) {
      Toast.show({ type: "error", text1: "error", text2: "Something went wrong", visibilityTime: 1000 })
      console.log('error from wishlist',error)

    }

  }


  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await getAllReviews(id)
        console.log('data', data)
        setReviews(data)
      }
      catch (error) {
        Toast.show({ type: "error", text1: "Error", text2: 'Something went wrong', visibilityTime: 1000 })
        console.log("error fetching data from review", error)

      }
    }
    loadReviews()


  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <ScrollView style={styles.mainContainer}>

      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <FastImage source={{ uri: `https://image.tmdb.org/t/p/w200${movie?.backdrop_path}` }} style={styles.image} resizeMode='cover' />
        </View>
        <FastImage source={{ uri: `https://image.tmdb.org/t/p/w200${movie?.poster_path}` }} style={styles.profileImage} resizeMode='contain' />
        <View style={styles.title}>
          <Text style={styles.titleText}>{movie?.original_title}</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 5 }}>
          <TouchableOpacity style={styles.button} onPress={() => navigation?.navigate('MovieReviewScreen', { id: id })}>
            <Text style={{ color: "white" }}>Add Review</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {
            if (movie?.id && movie?.poster_path) {
              addToWishList(movie.id, movie.poster_path)
            }
          }}>
            <Text style={{ color: "white" }}>Add to Fav</Text>
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.overViewContainer}>
        <Text style={styles.overviewText}>{movie?.overview}</Text>
      </View>



      <View style={styles.reviewContainer}>
        <Text style={styles.reviewHeading}>Reviews</Text>
        {review && review.length > 0 ? (
          review.map((item) => (
            <View key={item.id} style={styles.commentSection}>
              <Text style={styles.commentText}>
                Review by <Text style={{ color: '#FFB703' }}>{item.username}</Text>
              </Text>
              <Text style={styles.commentText}>{item.comment}</Text>
            </View>
          ))
        ) : (
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 10 }}>
            No Reviews Yet
          </Text>
        )}
      </View>

    </ScrollView>





  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,

  },
  container: {
    borderRadius: 20,
    width: 334,
    height: 292,
    marginLeft: 13,
    marginTop: 15,
    position: "relative",
    backgroundColor: "#93a6a990",
    paddingLeft: 8,
    paddingVertical: 10,
  },
  imageContainer: {
    width: 318,
    height: 150,
    borderRadius: 12,
    overflow: "hidden",


  },
  title: {
    alignItems: "flex-end",

  },
  titleText: {
    color: "white",
    fontSize: 20,
    fontWeight: 800,
    letterSpacing: 1,
    width: 200,
    height: 60,
    flexWrap: 'wrap',

  },
  detail: {
    color: "white",
    fontSize: 12,
    marginRight: 50,

  },
  image: {
    width: "100%",
    height: "100%",
  },

  movieTitle: {
    color: "white"

  },

  profileImage: {
    position: 'absolute',
    top: 70,
    left: 20,
    height: 163,
    width: 106,
    borderRadius: 14
  },
  overViewContainer: {
    width: 324,
    marginVertical: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  overviewText: {
    color: "white",
    letterSpacing: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    fontWeight: 400,

  },
  reviewContainer: {
    marginLeft: 13,
    marginTop: 10,
    flex: 1,
    paddingLeft: 3,

  },
  reviewHeading: {
    color: "white",
    fontSize: 15,
    marginLeft: 12,
    marginBottom: 5,


  },
  button: {
    backgroundColor: "#758e9290",
    marginHorizontal: 15,
    marginTop: 20,
    borderRadius: 15,
    paddingVertical: 10,
    alignItems: "center",
    flex: 1,
  },
  commentSection: {
    width: 334,
    height: 83,
    backgroundColor: "#93a6a990",
    borderRadius: 10,
    elevation: 5,
    borderColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 5,

  },
  commentText: {
    color: "white",
    fontFamily: "OpenSans-Regular",
    fontWeight: 400,
    fontSize: 15,
  },
  noReview: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10
  }



});

export default MovieDetailCard;
