import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList, RootStackScreenProps } from '../types/NavigationTypes';
import { addReview } from '../utils/firestoreDatabase';

type MovieReviewRouteProp = RouteProp<RootStackParamList, 'MovieReviewScreen'>;
const MovieReviewScreen = ({navigation}:RootStackScreenProps<'MovieReviewScreen'>) => {
  const [comment, setComment] = useState('');

  const route = useRoute<MovieReviewRouteProp>();
  const id = route.params?.id


  const handleSubmit = async () => {
    try {
      await addReview(id, comment)
      navigation.goBack()
    }
    catch (error) {
      console.log('error while adding comment', error)
    }

  }
  return (
    <View style={styles.container}>
      <Text>Comment</Text>
      <TextInput placeholder="add comment" style={styles.input} onChangeText={(text) => setComment(text)} />
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 15,

  },
  input: {
    borderWidth: 0.5,
    marginTop: 5,

  }
})

export default MovieReviewScreen