import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { WishListMoviesFireStore } from '../types/WishListMovies';
import Toast from 'react-native-toast-message';
import { getAllWishLists } from '../utils/firestoreDatabase';
import Loader from './Loader';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { deleteWishList, fetchWishListMovies } from '../redux/asyncActions';



const ImageGallery = () => {

  const { wishlistmovies, loading, error } = useAppSelector(state => state.wishlist)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const loadWishList = async () => {
      await dispatch(fetchWishListMovies())
    }
    loadWishList()

  }, [])

  const handleDelete = (movieId: string) => {
    Alert.alert('Delete',
      'Do you wana delete this movie from wishlist?',
      [
        { text: "Cancel", style: 'cancel' },
        {
          text: "Delete",
          onPress: async () => {
            const response = await dispatch(deleteWishList(movieId))
            if (response.payload) {
              Toast.show({ type: 'success', text1: 'Deleted successfully', visibilityTime: 1000 })
            }
            else {
              Toast.show({ type: 'error', text1: 'failed to Deleted ', visibilityTime: 1000 })

            }
          }
        }

      ]
    )

  }

  useEffect(() => {
    if (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: error });
    }
  }, [error])

  if (loading) {
    return <Loader />
  }

  return (
    <View style={styles.container}>

      <FlatList
        style={styles.flatlistContainer}
        data={wishlistmovies}
        numColumns={4}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => handleDelete(item.movieId)}>
            <Image source={{ uri: item?.imgLink }} style={styles.image} />
          </TouchableOpacity>
        }
        keyExtractor={item => item?.movieId.toString()}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 30,

  },
  image: {
    objectFit: "cover",
    width: 70,
    height: 110,
    borderRadius: 8,
    margin: 7,

  },
  flatlistContainer: {
    paddingTop: 0,

  },


})
export default ImageGallery