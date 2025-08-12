import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { HomeTabScreenProps, RootStackParamList, RootStackScreenProps } from '../types/NavigationTypes';
import { fetchMovieDetail } from '../utils/fetchMovieDetail';
import { Endpoint, MovieDetail } from '../types/MoviesTypes';
import { RouteProp } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { addToWish, deleteReview, getAllReviews, updateReview } from '../utils/firestoreDatabase';
import { Review } from '../types/ReviewTypes';
import Toast from 'react-native-toast-message';
import Loader from './Loader';
import { getAuth } from '@react-native-firebase/auth';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addWishList, deleteFromReview, editReview, getReviews } from '../redux/asyncActions';


interface MovieCardProps {
  route: RouteProp<RootStackParamList, 'MovieDetailScreen'>;
  navigation?: RootStackScreenProps<'MovieDetailScreen'>["navigation"]
}

const MovieDetailCard = ({ route, navigation }: MovieCardProps) => {
  const [movieFromApi, setMovieFromApi] = useState<MovieDetail | null>(null);
  const [editId, setEditId] = useState('')
  const [editedText, setEditedText] = useState('')



  const dispatch = useAppDispatch()
  const id = route.params?.id
  let endpoint = route.params ? route.params.endpoint : "now_playing"
  let movie: MovieDetail | undefined;
  const { movies } = useAppSelector(state => state.movie)
  const { reviewmovies } = useAppSelector(state => state.review)
  if (endpoint && id) {
    let categorizedMovies = endpoint && movies[endpoint]
    let item = categorizedMovies.find(movie => movie.id == id)

    if (item) {
      movie = item
    }
  }

  useEffect(() => {
    const loadMovieDetail = async () => {
      try {
        const movieData = await fetchMovieDetail(id)
        // console.log('movie', movieData)
        setMovieFromApi(movieData)
      }
      catch (error) {
        Toast.show({ type: "error", text1: "Error", text2: 'Something went wrong', visibilityTime: 1000 })
        console.log('error from movie detail', error)

      }
    }
    if (!endpoint && id) {
      loadMovieDetail()
    }

  }, [id])


  const addToWishList = async (id: string, poster_path: string) => {
    try {
      const response = await dispatch(addWishList({ movieId: id, img_path: poster_path }))

      if (response.payload) {
        Toast.show({ type: "success", text1: "success", text2: "Wishlist Added!" ,visibilityTime:800})
      }
      else {
        Toast.show({ type: "info", text1: "Information", text2: "Wishlist already exit!", visibilityTime: 1000 })
      }

    }
    catch (error) {
      Toast.show({ type: "error", text1: "Information", text2: "Something went wrong!", visibilityTime: 1000 })
      console.log(error)
    }

  }


  const handleDeleteComment = async (reviewId: string) => {
    try {
      const response = await dispatch(deleteFromReview(reviewId))
      if (response.payload) {
        Toast.show({ type: "success", text1: "Deleted successfully", visibilityTime: 1000 })
      } else {
        Toast.show({ type: "error", text1: "Delete failed", visibilityTime: 1000 })
      }
    } catch (error) {
      console.log('Error while deleting comment:', error)
      Toast.show({ type: "error", text1: "Error", text2: "Something went wrong", visibilityTime: 1000 })
    }
  }


  const handleEditComment = (reviewId: string, newComment: string) => {
    setEditId(reviewId)
    setEditedText(newComment)
  }

  const handleSaveComment = async () => {
    try {
      const response = await dispatch(editReview({ reviewId: editId, newComment: editedText }))
      if (response.payload) {
        setEditId('')
        setEditedText('')
        Toast.show({ type: "success", text1: "success", text2: "Review Edited!" ,visibilityTime:800})
      }
      else {
        Toast.show({ type: "error", text1: "Error", text2: "failed to edit!", visibilityTime: 1000 })
      }


    }
    catch (error) {
      console.log(error)
      Toast.show({ type: "error", text1: "Error", text2: "Something went wrong!", visibilityTime: 1000 })

    }

  }


  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = dispatch(getReviews(id))
      }
      catch (error) {
        console.log(error)
        Toast.show({ type: "error", text1: "Error", text2: "Something went wrong!", visibilityTime: 1000 })
      }

    }
    loadReviews()


  }, [])

  // if (loading) {
  //   return <Loader />
  // }

  return (
    <ScrollView style={styles.mainContainer}>

      {
        movie && !movieFromApi ?
          <>
            <View style={styles.container}>
              <View style={styles.imageContainer}>
                <FastImage source={{ uri: `https://image.tmdb.org/t/p/w200${movie?.backdrop_path}` }} style={styles.image} resizeMode='cover' />
              </View>
              <FastImage source={{ uri: `https://image.tmdb.org/t/p/w200${movie?.poster_path}` }} style={styles.profileImage} resizeMode='contain' />
              <View style={styles.title}>
                <Text style={styles.titleText}>{movie?.original_title}</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 5 }}>
                <TouchableOpacity style={styles.button} onPress={() => navigation?.navigate('MovieReviewScreen', { id: id, endpoint })}>
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
          </>
          :
          <>
            <View style={styles.container}>
              <View style={styles.imageContainer}>
                <FastImage source={{ uri: `https://image.tmdb.org/t/p/w200${movieFromApi?.backdrop_path}` }} style={styles.image} resizeMode='cover' />
              </View>
              <FastImage source={{ uri: `https://image.tmdb.org/t/p/w200${movieFromApi?.poster_path}` }} style={styles.profileImage} resizeMode='contain' />
              <View style={styles.title}>
                <Text style={styles.titleText}>{movieFromApi?.original_title}</Text>
              </View>

              <View style={{ flexDirection: "row", gap: 5 }}>
                <TouchableOpacity style={styles.button} onPress={() => navigation?.navigate('MovieReviewScreen', { id: id, endpoint })}>
                  <Text style={{ color: "white" }}>Add Review</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => {
                  if (movieFromApi?.id && movieFromApi?.poster_path) {
                    addToWishList(movieFromApi.id, movieFromApi.poster_path)
                  }
                }}>
                  <Text style={{ color: "white" }}>Add to Fav</Text>
                </TouchableOpacity>
              </View>
            </View>


            <View style={styles.overViewContainer}>
              <Text style={styles.overviewText}>{movieFromApi?.overview}</Text>
            </View>
          </>
      }




      <View style={styles.reviewContainer}>
        <Text style={styles.reviewHeading}>Reviews</Text>
        {reviewmovies && reviewmovies.length > 0 ? (
          reviewmovies.map((item) => (
            <View key={item.id} style={styles.commentSection}>
              <Text style={styles.commentText}>
                Review by <Text style={{ color: '#FFB703' }}>{item.username}</Text>

              </Text>

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                {editId == item.id ? <TextInput value={editedText} onChangeText={(text) => setEditedText(text)} style={styles.input} /> :
                  <>
                    <View style={{}}>
                      <Text style={styles.commentText}>{item.comment}</Text>
                    </View>
                  </>
                }
                {item.userId === getAuth().currentUser?.uid &&
                  <>
                    <View style={styles.iconFlexBox}>
                      {
                        editId == item.id ?
                          <>
                            <TouchableOpacity onPress={() => handleSaveComment()}>
                              <Text style={{ color: "white" }}>save</Text>
                            </TouchableOpacity>
                          </>
                          :
                          <TouchableOpacity onPress={() => handleEditComment(item.id, item.comment)}>
                            <Image source={require('../../assets/editIcon.png')} style={styles.iconImage} />
                          </TouchableOpacity>
                      }
                      <TouchableOpacity onPress={() => handleDeleteComment(item.id)}>
                        <Image source={require('../../assets/deleteIcon.png')} style={styles.iconImage} />
                      </TouchableOpacity>

                    </View>
                  </>
                }
              </View>
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
  },
  iconImage: {
    width: 15,
    height: 15,
  },
  iconFlexBox: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",

  },
  input: {
    borderWidth: 0.1,
    borderColor: "white",
    flex: 1,
    marginTop: 3,
    paddingLeft: 10,
    paddingRight: 20,
    marginRight: 3,
    borderRadius: 20,
  }



});

export default MovieDetailCard;
