import { NewAppScreen } from '@react-native/new-app-screen';
import { ActivityIndicator, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/navigation/RootStack';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/Config/toastConfig';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';



function App() {


  return (
    <NavigationContainer>
      <Provider store={store}>
      <RootStack />
      </Provider>
      <Toast config={toastConfig} position='bottom' />
    </NavigationContainer>
  );
}


export default App;
