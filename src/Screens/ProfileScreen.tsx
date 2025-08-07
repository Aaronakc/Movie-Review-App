import { View, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { getAuth, signOut } from '@react-native-firebase/auth'
import { HomeTabScreenProps } from '../types/NavigationTypes'
import ProfileCard from '../Components/ProfileCard'
import MovieCarousel from '../Components/MovieCarousel'

const ProfileScreen = ({ navigation }: HomeTabScreenProps<'Profile'>) => {
  const user = getAuth().currentUser;
  const email = user?.email ?? undefined;
  const username = email ? email.split('@')[0] : undefined;


  const handleLogout = () => {
    signOut(getAuth())
    navigation.navigate('Login')
  }
  return (
    <ScrollView style={styles.container}>
      <ProfileCard backgroundImg={require('../../assets/profilepic.jpg')} profileImg={require('../../assets/profilePic.png')} username={username} email={email} onPress={handleLogout} />

      <View style={styles.carousel}>
        <MovieCarousel topic='Favorites' endpoint='favorite' />
        <MovieCarousel topic='Recently Watched Movies' endpoint='watchlist' />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#002335",

  },
  carousel: {
    marginLeft: 10,
    marginTop: 10,
  }
})

export default ProfileScreen