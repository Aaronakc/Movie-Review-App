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
    <ScrollView style={styles.mainContainer}>

      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <FastImage source={{ uri: `https://image.tmdb.org/t/p/w200${movie?.backdrop_path}` }} style={styles.image} resizeMode='cover' />
        </View>
        <FastImage source={{ uri: `https://image.tmdb.org/t/p/w200${movie?.poster_path}` }} style={styles.profileImage} resizeMode='contain' />
        <View style={styles.title}>
          <Text style={styles.titleText}>{movie?.original_title}</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={() => navigation?.navigate('MovieReviewScreen', { id: id })}>
            <Text style={{ color: "white" }}>Add Review</Text>
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
