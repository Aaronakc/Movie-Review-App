import { View, StyleSheet, ScrollView, Text } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '../types/NavigationTypes';
import MovieDetailCard from '../Components/MovieDetailCard';

const MovieDetailScreen = ({ route, navigation }: RootStackScreenProps<'MovieDetailScreen'>) => {
  return (
    <View style={styles.container}>
      <MovieDetailCard route={route} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002335",
  },
});

export default MovieDetailScreen;
