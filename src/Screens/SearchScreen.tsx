import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MovieCarousel from '../Components/MovieCarousel'
import { searchMovie } from '../utils/FilterMovie'

const SearchScreen = () => {
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
      <TextInput style={styles.input} placeholder="Search" placeholderTextColor={"white"} onChangeText={(text) => setSearch(text)} />
      {
        results.length > 0
        &&
        <MovieCarousel topic="Search" searchedMovies={results} />
      }
      {/* <MovieCarousel topic="Trending" endpoint='trending' /> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002335",

  },
  input: {
    borderWidth: 0.8,
    borderColor: "white",
    backgroundColor: "gray",
    marginHorizontal: 30,
    marginTop: 10,
    borderRadius: 10,
    paddingLeft: 10,

  }

})

export default SearchScreen