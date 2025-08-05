import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { getAuth, signOut } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList, NonAuthStackParamList } from '../types/NavigationTypes';

const HomeScreen = () => {
  const handleLogout = () => {
    signOut(getAuth())
  }
  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen