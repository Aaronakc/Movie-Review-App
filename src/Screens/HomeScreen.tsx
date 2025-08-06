import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { getAuth, signOut } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList, HomeTabScreenProps, NonAuthStackParamList } from '../types/NavigationTypes';

const HomeScreen = ({ navigation }: HomeTabScreenProps<'BottomHome'>) => {

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen