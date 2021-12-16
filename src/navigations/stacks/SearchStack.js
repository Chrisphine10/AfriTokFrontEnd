import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Browse from '../../screens/Browse';
import Search from '../../screens/Search';
import SearchResults from '../../screens/SearchResults';

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
        <Stack.Screen
            options={{ headerShown: false }}
            name="SearchResults" component={SearchResults}
        />
      </Stack.Navigator>
    );
  }

export default SearchStack;