import React , { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Friend from '../../screens/profile/Friend';
import ProfileEdit from '../../screens/profile/Edit/';
import Me from '../../screens/profile/Me';
import Setting from '../../screens/setting/Setting';
import Favourite from '../../screens/profile/Favourite';
import Follow from '../../screens/profile/Follow';

const Stack = createStackNavigator();

function MeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
            options={{ 
              headerShown: false,
            }} 
            name="Me" component={Me}
             />
        <Stack.Screen 
            name="Profile Edit" 
            component={ProfileEdit}
             />
        <Stack.Screen 
            name="Friend" 
            component={Friend} 
            />
        <Stack.Screen 
            name="Setting" 
            component={Setting} 
            />
        <Stack.Screen 
            name="Favourite" 
            component={Favourite} 
            />
        <Stack.Screen 
            name="Follow" 
            component={Follow} 
            />
      </Stack.Navigator>
    );
  }

export default MeStack;