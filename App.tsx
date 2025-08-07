import { NewAppScreen } from '@react-native/new-app-screen';
import { ActivityIndicator, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/RootStack';


function App() {


  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}


export default App;
