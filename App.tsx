import { NewAppScreen } from '@react-native/new-app-screen';
import { ActivityIndicator, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/RootStack';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/Config/toastConfig';



function App() {


  return (
    <NavigationContainer>
      <RootStack />
      <Toast config={toastConfig} position='bottom' />
    </NavigationContainer>
  );
}


export default App;
