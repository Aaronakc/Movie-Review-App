import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { WishListMoviesFireStore } from '../types/WishListMovies';
import Toast from 'react-native-toast-message';
import { getAllWishLists } from '../utils/firestoreDatabase';
import Loader from './Loader';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchWishListMovies } from '../redux/asyncActions';



const ImageGallery = () => {

  // const [wishlistMovies, setWishListMovies] = useState<WishListMoviesFireStore[]>([])
  // const [loading, setLoading] = useState<boolean>(false)

  const {wishlistmovies,loading}=useAppSelector(state=>state.wishlist)
  const dispatch=useAppDispatch()

  useEffect(() => {
    const loadWishList = async () => {
       await dispatch(fetchWishListMovies())
      
      // setLoading(true)
      // try {
      //   const movies = await getAllWishLists();
      //   if (movies) {
      //     setWishListMovies(movies)

      //   }
      // }
      // catch (error) {
      //   Toast.show({ type: "error", text1: "Error", text2: 'Something went wrong', visibilityTime: 1000 })
      //   console.log('error from loading wish', error)
      // }
      // finally {
      //   setLoading(false)

      // }
    }
    loadWishList()

}, [])

  if (loading) {
    return <Loader />
  }

  return (
    <View style={styles.container}>

      <FlatList
        style={styles.flatlistContainer}
        data={wishlistmovies}
        numColumns={4}
        renderItem={({ item }) => <Image source={{ uri: item?.imgLink }} style={styles.image} />}
        keyExtractor={item => item?.movieId.toString()}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 21,
    paddingTop: 30,

  },
  image: {
    objectFit: "cover",
    width: 75,
    height: 110,
    borderRadius: 8,
    margin: 4,

  },
  flatlistContainer: {
    paddingTop: 0,

  },


})
export default ImageGallery