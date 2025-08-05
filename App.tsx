/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
// import LoginScreen from './src/Screens/LoginScreen';
// import SignUpScreen from './src/Screens/SignupScreen';
import { NavigationContainer } from '@react-navigation/native';
import NonAuthStack from './src/navigation/NonAuthStack';
import AuthStack from './src/navigation/AuthStack';


function App() {


  return (
    <NavigationContainer>
      <NonAuthStack />
    </NavigationContainer>
  );
}


export default App;
