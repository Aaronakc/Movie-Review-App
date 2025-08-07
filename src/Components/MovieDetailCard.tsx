import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { HomeTabScreenProps, RootStackParamList, RootStackScreenProps } from '../types/NavigationTypes';
import { fetchMovieDetail } from '../utils/fetchMovieDetail';
import { MovieDetail } from '../types/MoviesTypes';
import { RouteProp } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { getAllReviews } from '../utils/firestoreDatabase';
import { Review } from '../types/ReviewTypes';

interface MovieCardProps {
  route: RouteProp<RootStackParamList, 'MovieDetailScreen'>;
  navigation?: RootStackScreenProps<'MovieDetailScreen'>["navigation"]


}

const MovieDetailCard = ({ route, navigation }: MovieCardProps) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [review, setReviews] = useState<Review[]>([])

  const id = route.params?.id

  useEffect(() => {
    const loadMovieDetail = async () => {
      try {
        const movieData = await fetchMovieDetail(id)
        console.log('movie', movieData)
        setMovie(movieData)
      }
      catch (error) {
        console.log(error)

      }

    }
    if (id) {
      loadMovieDetail()
    }

  }, [id])


  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await getAllReviews(id)
        console.log('data', data)
        setReviews(data)
      }
      catch (error) {
        console.log("error fetching data", error)

      }
    }
    loadReviews()


  }, [])
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <FastImage source={{ uri: `https://image.tmdb.org/t/p/w200${movie?.backdrop_path}` }} style={styles.image} resizeMode='cover' />
        </View>
        <FastImage source={{ uri: `https://image.tmdb.org/t/p/w200${movie?.poster_path}` }} style={styles.profileImage} resizeMode='contain' />
        {/* <View style={movieDetail}>
          <Text >{movie?.original_title}</Text>
        </View> */}
      </View>





      <View>
        <TouchableOpacity style={styles.button} onPress={() => navigation?.navigate('MovieReviewScreen', { id: id })}>
          <Text style={{ color: "white" }}>Add Review</Text>
        </TouchableOpacity>
      </View>



      <View style={styles.reviewContainer}>
        <Text style={styles.reviewHeading}>Reviews</Text>
        <FlatList
          data={review}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentSection}>
              <Text style={styles.commentText}>Review by <Text style={{ color: "#FFB703" }}>{item.username}</Text></Text>
              <Text style={styles.commentText}> {item.comment}</Text>
            </View>
          )}
        />

      </View>

    </View>





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
  reviewContainer: {
    marginLeft: 13,
    marginTop: 10,
    flex: 1,



  },
  reviewHeading: {
    color: "white",
    fontSize: 15,

  },
  button: {
    backgroundColor: "orange",
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
  },
  commentSection: {
    width: 334,
    height: 83,
    backgroundColor: "#93a6a990",
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginVertical: 5,

  },
  commentText: {
    color: "white",
    fontFamily: "OpenSans-Regular",
    fontWeight: 400,


  }



});

export default MovieDetailCard;
