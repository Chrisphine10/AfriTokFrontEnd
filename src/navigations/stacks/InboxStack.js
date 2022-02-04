import React , { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Activity from '../../screens/profile/Activity'
import Inbox from '../../screens/profile/Inbox';

function InboxStack() {
  const Stack = createStackNavigator();
    return (
      <Stack.Navigator
      >
        <Stack.Screen 
            options={{ headerShown: false }} 
            name="Activity" component={Activity}
             />
        <Stack.Screen 
            name="Inbox" component={Inbox}
            listeners={({ navigation, route }) => ({
              tabPress: e => {
                console.log(route.name);
              },
            })}
             />
      </Stack.Navigator>
    );
  }

export default InboxStack;