import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { WishListMovies } from '../types/WishListMovies';
import { fetchWishlistMovies } from '../utils/fetchWishlistMov';
import Toast from 'react-native-toast-message';



const ImageGallery = () => {

  const [wishlistMovies, setWishListMovies] = useState<WishListMovies[]>([])

  useEffect(() => {
    const loadWishList = async () => {
      try {
        const movies = await fetchWishlistMovies();
        setWishListMovies(movies)
      }
      catch (error) {
        Toast.show({ type: "error", text1: "Error", text2: `${error}` })
      }
    }
    loadWishList()

  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.flexBox}>
        <Text style={styles.titleText}>WishList</Text>
        <Image source={require('../../assets/wishlistIcon.png')} />
      </View>

      <FlatList
        style={styles.flatlistContainer}
        data={wishlistMovies}
        numColumns={4}
        renderItem={({ item }) => <Image source={{ uri: `https://image.tmdb.org/t/p/w200${item?.poster_path}` }} style={styles.image} />}
        keyExtractor={item => item.id.toString()}
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
  flexBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },
  image: {
    objectFit: "cover",
    width: 75,
    height: 110,
    borderRadius: 8,
    margin: 4,

  },
  flatlistContainer: {
    paddingTop: 40,

  },
  titleText: {
    color: "white",
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
    fontWeight: 600,
  }

})
export default ImageGallery