import React, { useState, useEffect } from 'react';
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
import { AuthContext } from './src/core/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authAPI from './src/api/authAPi';
import {decode, encode} from 'base-64';

const getFonts = () => Font.loadAsync({
      'AbelRegular' : require('./assets/fonts/Abel-Regular.ttf')
});
const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const initialLoginState = { 
    isLoading: true,
    userName: null,
    userToken: null,
  };
  function atob(data) { 
    return new Buffer(data, "base64").toString("binary"); 
  }
  const parseJwt = (token) => {
    if (!global.btoa) { 
      global.btoa = encode 
    }
    if (!global.atob) { 
      global.atob = decode 
    }
    try{
      return global.atob(token.split(".")[1]);
    } catch(e){
      console.log(e);
    }
  
  };

  const loginReducer = (prevState = initialLoginState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      default:
        return prevState;
    }
  };
  const authenticateUser = async (login, password, rememberMe) => {
      try {
          let response = await authAPI.post("authenticate", {
            "password": password,
            "rememberMe": rememberMe,
            "username": login
          });
          return response.data.id_token;
      }
      catch (e) {
          console.log(e);
      }
  };
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  const authContext = React.useMemo(() => {
    return {
      signIn: async (userName, password, rememberMe) => {
        let userToken;
        userToken = null;
        let authToken = await authenticateUser(userName, password, rememberMe);
        if(authToken !== undefined){    
          userToken = authToken;
          try {
              await AsyncStorage.setItem('userToken', userToken);
              await AsyncStorage.setItem('userName', userName);
          } 
          catch (e) {
              console.log(e);
          }
        }
        else {
          alert('wrong credentials');
        }
        dispatch({ type: 'LOGIN', id: userName, token: userToken });

      },
      signOut: async() => {
        console.log('sign out');
        try {
            await AsyncStorage.removeItem('userToken');
        }
        catch (e) {
            console.log(e);
        }
        dispatch({ type: 'LOGOUT' });
      },
      signUp: () => {
        console.log('sign up');
      },
      forgotPassword: () => {
        console.log('forgot password');
      },
    };
  }, []);

  useEffect(() => {
    setTimeout( async () => {
      let userToken;
      userToken = null;
      try {
        await AsyncStorage.getItem('userToken').then((value) => {
          userToken = value;
        });
        if(userToken){
          const decodedJwt = parseJwt(userToken);
          const expiration = new Date(decodedJwt.exp);
          const now = new Date();
          const fiveMinutes = 1000 * 60 * 500;

          if( expiration.getTime() - now.getTime() < fiveMinutes ){
            //console.log("JWT has expired or will expire soon");
            authContext.signOut();
          } else {
            //authContext.signOut();
            //console.log("JWT is valid for more than 5 minutes", decodedJwt);
          }
        }
      } 
      catch (e) {
          console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 10);
  }, []);

  if(fontsLoaded){
    return (
      <PaperProvider theme={theme}>
        <Provider 
        store={store}
        >
          <AuthContext.Provider value={authContext}>
            <NavigationContainer
            >
              { loginState.userToken === null ? (
              <Stack.Navigator
                initialRouteName="StartScreen"
                screenOptions={{
                  headerShown: false,
                }}
                
              >   
                  <Stack.Screen name="StartScreen" component={StartScreen} />
                  <Stack.Screen name="LoginScreen" component={LoginScreen} />
                  <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                  <Stack.Screen
                  name="ResetPasswordScreen"
                  component={ResetPasswordScreen}
                  />
              </Stack.Navigator>
                ) : (
                  <Stack.Navigator
                  initialRouteName="Routes"
                  screenOptions={{
                    headerShown: false,
                  }}
                  >
                    <Stack.Screen name="Routes" component={Routes}  />
                  </Stack.Navigator>
                )
              }
            </NavigationContainer>
          </AuthContext.Provider>
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

