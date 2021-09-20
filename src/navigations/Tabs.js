import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StatusBar, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
//icons 
import {
    MaterialCommunityIcons,
    AntDesign,
    FontAwesome,
} from '@expo/vector-icons';

//components
import Home from '../screens/Home';
import Browse from '../screens/Browse';
import New from '../screens/New';
import Inbox from '../screens/profile/Inbox';
import Me from '../screens/profile/Me';

const BottomTab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = () => {

    const [home, setHome] = useState(true);
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') StatusBar.setBackgroundColor('#fff');

    if (home) {
        if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor('#000');
          StatusBar.setBarStyle('light-content');
        }
      } else {
        StatusBar.setHidden(false);
    }

    return (
        <BottomTab.Navigator
        shifting={true} 
        barStyle={{
            backgroundColor: home ? '#000' : '#fff'
        }}
        initialRouteName="Home"
        activeColor={home ? '#fff' : '#000'}
        >
            <BottomTab.Screen 
            name="Home" component={Home}
            listeners={{
                focus: () => setHome(true),
                blur: () => setHome(false),
              }}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                  <FontAwesome name="home" size={24} color={color} />
                ),
              }}
            />

            <BottomTab.Screen 
            name="Browse" 
            component={Browse}
            options={{
                tabBarLabel: 'Browse',
                tabBarIcon: ({ color }) => (
                  <AntDesign name="search1" size={24} color={color} />
                ),
              }}
            />
            <BottomTab.Screen 
            name="New" 
            component={New}
            options={{
                tabBarLabel: '',
                tabBarIcon: ({ color }) => (
                    <AntDesign name="plus" size={24} color={color} style={{backgroundColor: "red", borderRadius: 5, }} />
                ),
            }}  
            />

            <BottomTab.Screen 
            name="Inbox" 
            component={Inbox} 
            options={{
                tabBarLabel: 'Inbox',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="message-text-outline"
                    size={24}
                    color={color}
                  />
                ),
            }}
            />

            <BottomTab.Screen 
            name="Me" 
            component={Me} 
            options={{
                tabBarLabel: 'Me',
                tabBarIcon: ({ color }) => (
                  <AntDesign name="user" size={24} color={color} />
                ),
            }}
            />
        </BottomTab.Navigator>
    )
}

const RootStackScreen = () => {
    return (
        <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Main"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Post"
          component={Post}
        />
        </Stack.Navigator>
    )
}



export default Tabs;