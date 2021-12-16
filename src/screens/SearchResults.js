import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, SafeAreaView, TouchableOpacity} from 'react-native';
import styles from '../styles/searchstyles';
import { Searchbar } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from '../api/actions/videoActions';
import { fetchAllUsers } from '../api/actions/userDetailsActions';
import { Avatar } from 'react-native-paper';
import { FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import UsersSearch from '../components/searchComponents/users';
import VideosSearch from '../components/searchComponents/videos';

const SearchResults = ({navigation, route}) => {
    const { event, ValueXY } = Animated
    const scrollY = new ValueXY()
   
    const onViewPressed = () => {
        console.log("search");
    }

    const pressSearch = () => {
        navigation.navigate("Search");
    }

    const renderForeground = () => (
        <TouchableOpacity
        onPress={pressSearch}
        style={styles.searchBox}>
            <Searchbar
                style={{
                    borderRadius: 30,
                    height: 40,
                }}
                inputStyle={{
                    fontSize: 14,
                    fontFamily: 'AbelRegular',
                }}
                selectTextOnFocus={false}
                placeholder="Search"
                editable={false}
            />
        </TouchableOpacity>
    );

    const renderHeader = () => (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View style={styles.headerWrapper}></View>
        </SafeAreaView>
    );

    return (
        <StickyParallaxHeader
        headerType="TabbedHeader"
        foreground={renderForeground}
        header={renderHeader}
        transparentHeader={false}
        parallaxHeight={60}
        headerHeight={30}
        snapValue={0}
        snapToEdge={false}
        hasBorderRadius={false}
        backgroundColor="white"
        //headerSize={() => {}}
        //onEndReached={() => {}}
        scrollEvent={event(
            [{ nativeEvent: { contentOffset: { y: scrollY.y } } }],
            { useNativeDriver: false }
        )}
        tabs={[
        {
            title: "Users",
            icon: <MaterialCommunityIcons size={30} name="account" color="#000" />,
            content: <UsersSearch search={route.params.search}/>
        },
        {
            title: "Videos",
            icon: <MaterialCommunityIcons size={30} name="video" color="#000" />,
            content: <VideosSearch login={"admin"}/>
        },
        {
            title: "Songs",
            icon: <MaterialCommunityIcons size={30} name="music-circle" color="#000" />,
            content: <View></View>
        }
        ]}
        tabTextStyle={styles.tabText}
        tabTextContainerStyle={styles.tabTextContainerStyle}
        tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
        tabsWrapperStyle={styles.tabsWrapper}
        >
        </StickyParallaxHeader>
    )
}

export default SearchResults;