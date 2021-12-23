import React , { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Record from '../../screens/camera/Record';
import Post from '../../screens/post/Post';
import Gallery from '../../screens/camera/Gallery';
import Edit from '../../screens/camera/EditVideo';
import SongsList from '../../screens/sauti/SongsList';
import MySauti from '../../components/mysauti';
//import Routes from './../Routes';

const Stack = createStackNavigator();

function CameraStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
            options={{ 
                headerShown: false,
            }} 
            name="Record" component={Record}
             />
        <Stack.Screen 
            options={{ 
              headerShown: false,
            }}
            name="Gallery" component={Gallery}
             />
        <Stack.Screen 
            options={{ 
              headerShown: false,
            }}
            name="SongsList" component={SongsList}
             />
        <Stack.Screen 
            options={{ 
              headerShown: false,
            }}
            name="Edit" component={Edit}
             />
        <Stack.Screen  
            name="Post" component={Post}
             />
        
      </Stack.Navigator>
    );
  }

export default CameraStack;