import React, { useState } from 'react';
import Routes from './src/navigations/Routes';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Record,
  RecordStack
} from './src/screens/login';

import { Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from './src/api/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './src/core/theme';

const getFonts = () => Font.loadAsync({
      'AbelRegular' : require('./assets/fonts/Abel-Regular.ttf')
});
const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if(fontsLoaded){
    return (
      <PaperProvider theme={theme}>
        <Provider 
        store={store}
        >
          <NavigationContainer
          >
            <Stack.Navigator
              initialRouteName="StartScreen"
              screenOptions={{
                headerShown: false,
              }}
              
            >   
              <Stack.Screen name="StartScreen" component={StartScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen name="Routes" component={Routes}  />
              <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </PaperProvider>
    );
  }
  else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }

}

