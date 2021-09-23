import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StatusBar, Platform } from 'react-native';
import {
    MaterialCommunityIcons,
    AntDesign,
    FontAwesome,
} from '@expo/vector-icons';

//components
import HomeStack from './HomeStack';
import New from '../screens/New';
import MeStack from './MeStack';
import InboxStack from './InboxStack';
import SearchStack from './SearchStack';

const BottomTab = createMaterialBottomTabNavigator();
//const Stack = createStackNavigator();

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
            name="HomeFeed" component={HomeStack}
            listeners={({ navigation, route }) => ({
              tabPress: e => {
                navigation.navigate(route.name);
              },
              focus: () => setHome(true),
              blur: () => setHome(false),
            })}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <FontAwesome name="home" size={24} color={color} />
              ),
            }}
            />

            <BottomTab.Screen 
            name="Browse" 
            component={SearchStack}
            listeners={({ navigation, route }) => ({
              tabPress: e => {
                navigation.navigate(route.name);
              },
            })}
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
            listeners={({ navigation, route }) => ({
              tabPress: e => {
                navigation.navigate(route.name);
              },
            })}
            options={{
                tabBarLabel: '',
                tabBarIcon: ({ color }) => (
                    <AntDesign name="plus" size={24} color={color} style={{backgroundColor: "red", borderRadius: 5, }} />
                ),
            }}  
            />

            <BottomTab.Screen 
            name="Activities" 
            component={InboxStack} 
            listeners={({ navigation, route }) => ({
              tabPress: e => {
                navigation.navigate(route.name);
              },
            })}
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
            name="Profile" 
            component={MeStack} 
            listeners={({ navigation, route }) => ({
              tabPress: e => {
                navigation.navigate(route.name);
              },
            })}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                  <AntDesign name="user" size={24} color={color} />
                ),
            }}
            />
        </BottomTab.Navigator>
    )
}

export default Tabs;