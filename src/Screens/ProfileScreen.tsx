import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { getAuth, signOut } from '@react-native-firebase/auth'
import { HomeTabScreenProps } from '../types/NavigationTypes'

const ProfileScreen = ({navigation}:HomeTabScreenProps<'Profile'>) => {
  const handleLogout = () => {
      signOut(getAuth())
      navigation.navigate('Login')
    }
  return (
    <View>
       <TouchableOpacity onPress={handleLogout}>
              <Text>Logout</Text>
            </TouchableOpacity>
    </View>
  )
}

export default ProfileScreen