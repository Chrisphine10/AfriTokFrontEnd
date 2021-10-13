import React , { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../screens/Home';
import UserProfile from '../../screens/profile/UserProfile';
import Album from '../../screens/post/Album';

const Stack = createStackNavigator();

function MeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
            options={{ headerShown: false }} 
            name="Home" component={Home}
             />
        <Stack.Screen  
            name="User Profile" 
            component={UserProfile}
             />
        <Stack.Screen 
            name="Album" 
            component={Album}
             />
      </Stack.Navigator>
    );
  }

export default MeStack;