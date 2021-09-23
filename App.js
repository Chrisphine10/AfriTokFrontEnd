import React, { useState } from 'react'
import Routes from './src/navigations/Routes';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const getFonts = () => Font.loadAsync({
      'AbelRegular' : require('./assets/fonts/Abel-Regular.ttf')
});


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if(fontsLoaded){
    return (
      <Routes/>
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

