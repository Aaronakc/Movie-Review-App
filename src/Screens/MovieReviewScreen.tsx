import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList, RootStackScreenProps } from '../types/NavigationTypes';
import { addReview } from '../utils/firestoreDatabase';
import { fetchMovieDetail } from '../utils/fetchMovieDetail';
import { MovieDetail } from '../types/MoviesTypes';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';

type MovieReviewRouteProp = RouteProp<RootStackParamList, 'MovieReviewScreen'>;
const MovieReviewScreen = ({ navigation }: RootStackScreenProps<'MovieReviewScreen'>) => {
  const [comment, setComment] = useState('');
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  const route = useRoute<MovieReviewRouteProp>();
  const id = route.params?.id


  const handleSubmit = async () => {
    try {
      await addReview(id, comment)
      navigation.goBack()
    }
    catch (error) {
      Toast.show({ type: "error", text1: "Error", text2: 'Something went wrong', visibilityTime: 1000 })
      console.log('error while adding comment', error)
    }

  }

  useEffect(() => {
    const loadMovieDetail = async () => {
      try {
        const movieData = await fetchMovieDetail(id)
        setMovie(movieData)
      }
      catch (error) {
        Toast.show({ type: "error", text1: "Error", text2: 'Something went wrong', visibilityTime: 1000 })
        console.log('error from loading movie',error)

      }

    }
    if (id) {
      loadMovieDetail()
    }

  }, [id])
  return (
    <View style={styles.container}>
      <View style={styles.innerWrapper}>

        <View style={styles.imageContainer}>
          <FastImage source={{ uri: `https://image.tmdb.org/t/p/w200${movie?.poster_path}` }} style={styles.image} resizeMode='contain' />
        </View>

        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back.png')} />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{movie?.title}</Text>
        </View>


        <TextInput placeholder="Write down your review..." placeholderTextColor={"white"} style={styles.input} onChangeText={(text) => setComment(text)} />

        <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
          <Text style={styles.btnText}>Publish</Text>
        </TouchableOpacity>


      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#002335",
    flex: 1,
  },
  innerWrapper: {
    position: "relative",
    overflow: "hidden",

  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    marginTop: 40,
    width: 335,
    height: 308,
    marginLeft: 12,
    borderRadius: 20,
    backgroundColor: "#80868790",
    textAlignVertical: "top",
    paddingLeft: 20,
    paddingTop: 30,



  },
  imageContainer: {
    width: 122,
    height: 130,
    borderRadius: 12,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 230,
    top: 20,
    borderRadius: 20,

  },
  titleContainer: {
    position: "absolute",
    top: 100,
    left: 21,
    width: 180,
    letterSpacing: 1,
  },
  titleText: {
    fontFamily: "Poppins-SemiBold",
    fontWeight: 800,
    fontSize: 20,
    color: "white",

  },
  backBtn: {
    position: "absolute",
    top: 28,
    left: 26,
  },
  submitBtn: {
    width: 104,
    height: 36,
    marginTop: 15,
    backgroundColor: "#FFB703",
    marginLeft: 240,
    borderRadius: 13,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    paddingTop: 8,
    fontFamily: "Poppins-Bold",
    fontWeight: 700,
  }
})

export default MovieReviewScreen