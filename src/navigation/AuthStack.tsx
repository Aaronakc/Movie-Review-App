import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/NavigationTypes';
// import HomeScreen from '../Screens/HomeScreen';
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={BottomTab} options={{headerShown:false}} />
    </Stack.Navigator>
  );
};

export default AuthStack;
