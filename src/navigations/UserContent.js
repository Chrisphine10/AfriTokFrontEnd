import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Activity from '../screens/profile/Activity';
import Friend from '../screens/profile/Friend';

const UserContent = () => {
    const Tab = createMaterialTopTabNavigator();
    return (   
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Activity" component={Activity} />
                <Tab.Screen name="Friend" component={Friend} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default UserContent;