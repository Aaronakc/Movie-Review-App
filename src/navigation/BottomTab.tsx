import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../Screens/HomeScreen';
import MovieReviewScreen from '../Screens/MovieReviewScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { BottomTabParamList, HomeTabScreenProps } from '../types/NavigationTypes';


const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIcon: () => null,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
          // textAlign: 'center',
        },
        // tabBarItemStyle: {
        //   justifyContent: 'center',
        //   alignItems: 'center',
        // },
        tabBarStyle: {
          height: 60,
        },
      }}
    >
      <Tab.Screen name="BottomHome" component={HomeScreen} options={{headerShown:true,headerTitle:"Home"}} />
      <Tab.Screen name="Review" component={MovieReviewScreen} options={{headerShown:true}}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{headerShown:true}}/>

    </Tab.Navigator>
  );
}
