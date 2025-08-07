import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/NavigationTypes';
import BottomTab from './BottomTab';
import MovieDetailScreen from '../Screens/MovieDetailScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignUpScreen from '../Screens/SignupScreen';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { ActivityIndicator, View } from 'react-native';
import MovieReviewScreen from '../Screens/MovieReviewScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();


  function handleAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber;
  }, []);



  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Stack.Navigator initialRouteName={user ? "Home" : "Login"} screenOptions={{ animation: 'none' }}>
      <Stack.Screen name="Home" component={BottomTab} options={{ headerShown: false }} />
      <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} options={{ headerShown: true }} />
      <Stack.Screen name="MovieReviewScreen" component={MovieReviewScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignUpScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default RootStack;
