import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { View, StatusBar, Platform } from 'react-native';
import {
    MaterialCommunityIcons,
    AntDesign,
    FontAwesome,
} from '@expo/vector-icons';

//components
import HomeStack from './stacks/HomeStack';
import CameraStack from './stacks/CameraStack';
import MeStack from './stacks/MeStack';
import InboxStack from './stacks/InboxStack';
import SearchStack from './stacks/SearchStack';

const BottomTab = createMaterialBottomTabNavigator();

const Tabs = (route) => {
    const [home, setHome] = useState(true);
    const [tabVisibility, setTabVisibility] = useState(null);
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
            backgroundColor: home ? '#000' : '#fff',
            display: tabVisibility,
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
            name="Camera" 
            component={CameraStack}
            listeners={({ navigation, route }) => ({
              tabPress: e => {
                navigation.navigate(route.name);
                setTabVisibility('none');
              },
            })}
            options={() => ({
                tabBarLabel: '',
                tabBarIcon: ({ color }) => (
                    <View style={{backgroundColor: "red", borderRadius: 5,}} ><AntDesign name="plus" size={24} color={color}/></View>
                ),
            })}  
            />

            <BottomTab.Screen 
            name="Activities" 
            component={InboxStack} 
            listeners={({ navigation, route }) => ({
              tabPress: e => {
                navigation.navigate(route.name);
                //console.log(route.name);
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