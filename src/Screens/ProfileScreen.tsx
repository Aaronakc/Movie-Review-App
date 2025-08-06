import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { getAuth, signOut } from '@react-native-firebase/auth'

const ProfileScreen = () => {
  const handleLogout = () => {
      signOut(getAuth())
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