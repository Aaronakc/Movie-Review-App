import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../Screens/HomeScreen';
import MovieReviewScreen from '../Screens/MovieReviewScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { BottomTabParamList } from '../types/NavigationTypes';
import { Image, View } from 'react-native';
import SearchScreen from '../Screens/SearchScreen';
import WishListScreen from '../Screens/WishListScreen';


const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === 'BottomHome') {
            iconSource = focused
              ? require('../../assets/focusedHomeIcon.png')
              : require('../../assets/homeIcon.png');
          } else if (route.name === 'Search') {
            iconSource = focused
              ? require('../../assets/focusedSearchIcon.png')
              : require('../../assets/searchIcon.png');
          } else if (route.name === 'Wishlist') {
            iconSource = focused
              ? require('../../assets/FocusedBookMarkIcon.png')
              : require('../../assets/bookmarkIcon.png');
          } else if (route.name === 'Profile') {
            iconSource = focused
              ? require('../../assets/focusedProfile.png')
              : require('../../assets/profileIcon.png');
          }


          return (
            <View style={{ alignItems: "center" }}>
              <Image
                source={iconSource}
                style={{ width: 19, height: 20 }}
                resizeMode="contain"
              />
            </View>
          );
        },
        headerShown: false,
        tabBarLabelStyle: { fontSize: 10, fontWeight: '400', fontFamily: "Poppins-Regular", width: 360, height: 70, marginTop: 4, },
        tabBarStyle: { height: 60, backgroundColor: "#001C29" },
        tabBarActiveTintColor: "#F2C94C",
        tabBarInactiveTintColor: "white",



      })}
    >

      <Tab.Screen name="BottomHome" component={HomeScreen} options={{
        headerShown: true,
        headerTitle: "Home",
        tabBarLabel: 'Home',
        headerStyle: { backgroundColor: '#01293dff' },
        headerTintColor: 'white',
      }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{
        headerShown: true,
        headerTitle: "Search",
        headerStyle: { backgroundColor: '#01293dff' },
        headerTintColor: 'white',
      }} />
      <Tab.Screen name="Wishlist" component={WishListScreen} options={{
        headerShown: true,
        tabBarLabel: "Wishlist",
        headerStyle: { backgroundColor: '#01293dff' },
        headerTintColor: 'white',
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        headerShown: true,
        tabBarLabel: "Profile",
        headerStyle: { backgroundColor: '#01293dff' },
        headerTintColor: 'white',
      }} />

    </Tab.Navigator>
  );
}
