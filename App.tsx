/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { ActivityIndicator, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
// import LoginScreen from './src/Screens/LoginScreen';
// import SignUpScreen from './src/Screens/SignupScreen';
import { NavigationContainer } from '@react-navigation/native';
import NonAuthStack from './src/navigation/NonAuthStack';
import AuthStack from './src/navigation/AuthStack';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';


function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function handleAuthStateChanged(user: any) {
    if (
      user && user.metadata && 
      user.metadata?.creationTime === user.metadata?.lastSignInTime
    ) {
      return;
    }
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
    <NavigationContainer>
      {user ? <AuthStack /> : <NonAuthStack />}
    </NavigationContainer>
  );
}


export default App;
