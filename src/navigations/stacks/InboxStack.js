import React , { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Activity from '../../screens/profile/Activity'
import Inbox from '../../screens/profile/Inbox';

const Stack = createStackNavigator();

function InboxStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
            options={{ headerShown: false }} 
            name="Activity" component={Activity}
             />
        <Stack.Screen 
            name="Inbox" component={Inbox}
             />
      </Stack.Navigator>
    );
  }

export default InboxStack;