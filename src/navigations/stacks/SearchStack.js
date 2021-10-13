import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Browse from '../../screens/Browse';
import Search from '../../screens/Search';

const Stack = createStackNavigator();

function SearchStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
        options={{ headerShown: false }} 
          name="Browse " component={Browse}
           />
        <Stack.Screen 
            options={{ headerShown: false }}
            name="Search" component={Search}
             />
      </Stack.Navigator>
    );
  }

export default SearchStack;