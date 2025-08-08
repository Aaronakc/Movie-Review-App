import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import MovieCarousel from '../Components/MovieCarousel'
import { searchMovie } from '../utils/FilterMovie'
import IconTextRow from '../Components/IconTextRow'
import { HomeTabScreenProps } from '../types/NavigationTypes'

const SearchScreen = ({ navigation }: HomeTabScreenProps<'Search'>) => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])


  const handleSearch = async () => {
    try {

      if (search) {
        const res = await searchMovie(search)
        // console.log(res)
        if (res) {
          setResults(res)
        }
      }
      else if (!search.trim()) {
        setResults([])
      }
    }
    catch (error) {

    }
  }
  // console.log(results)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput style={styles.input} placeholder="Search.." placeholderTextColor={"white"} onChangeText={(text) => setSearch(text)} />
        {
          results.length > 0
          &&
          <MovieCarousel topic="Search" searchedMovies={results} />
        }

      </View>
      <Image source={require('../../assets/searchIcon.png')} style={styles.searchIcon} />


      <View style={{ marginTop: 40, marginLeft: 3 }}>
        <MovieCarousel topic="Trending this month" endpoint='trending' />
      </View>

      <View style={styles.backgroundWrapper}>
        <IconTextRow icon={require('../../assets/movieIcon.png')} text='BROWSE ALL MOVIES' width={61} height={61} fontSize={16} color='white' />
      </View>

      <TouchableOpacity onPress={() => {
        navigation.navigate('BottomHome')
        console.log('reached home screen')
      }} style={styles.touchableContainer} >
        <Image source={require('../../assets/forwardArrow.png')} style={styles.arrow} />
      </TouchableOpacity>


      <View style={{ marginTop: 60, marginLeft: 3 }}>
        <MovieCarousel topic="Upcoming movies" endpoint='upcoming' />
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002335",

  },
  searchIcon: {
    width: 24,
    height: 24,
    marginTop: -35,
    marginLeft: 290,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 0.3,
    borderColor: "white",
    backgroundColor: "gray",
    opacity: 0.8,
    marginHorizontal: 30,
    marginTop: 35,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 50,

  },
  backgroundWrapper: {
    backgroundColor: "gray",
    opacity: 0.8,
    width: 334,
    height: 83,
    borderRadius: 14,
    marginLeft: 13,
    paddingLeft: 23,
    paddingTop: 11,
    paddingBottom: 11,

  },
  touchableContainer: {
    width: 22,
    height: 22,
    marginTop: -55,
    marginLeft: 300,
  },
  arrow: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  }


})

export default SearchScreen