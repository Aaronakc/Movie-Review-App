import { View, StyleSheet, Image, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AuthStackParamList, AuthStackScreenProps } from '../types/NavigationTypes';
import { fetchMovieDetail } from '../utils/fetchMovieDetail';
import { MovieDetail } from '../types/MoviesTypes';
import { RouteProp } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

interface MovieCardProps {
  route: RouteProp<AuthStackParamList, 'MovieDetailScreen'>;


}

const MovieDetailCard = ({ route }: MovieCardProps) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);

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
  return (

    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FastImage source={{ uri: `https://image.tmdb.org/t/p/w200${movie?.backdrop_path}` }} style={styles.image} resizeMode='cover' />
      </View>
      <FastImage source={{ uri: `https://image.tmdb.org/t/p/w200${movie?.poster_path}` }} style={styles.profileImage} resizeMode='contain' />
    </View>





  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    width: 334,
    height: 292,
    marginLeft: 13,
    marginTop: 15,
    position: "relative",
    backgroundColor: 'gray',
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

  profileImage: {
    position: 'absolute',
    top: 70,
    left: 20,
    height: 163,
    width: 106,
    borderRadius: 14
  }



});

export default MovieDetailCard;
