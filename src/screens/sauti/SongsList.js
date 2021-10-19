import React, { useState,useEffect } from 'react';
import { Animated, BackHandler, useWindowDimensions, TouchableOpacity, ScrollView, SafeAreaView, RefreshControl, View, Text, Image } from 'react-native';
import styles from '../../styles/songsliststyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import MySauti from '../../components/mysauti';
import { Searchbar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

const SongsList = ({navigation}) => {

    const { event, ValueXY } = Animated;
    const scrollY = new ValueXY()

    function goBack () {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Record' }],
            sauti: 'sauti'
          })
    }
    const renderForeground = () => (
        <Image
            source={require('../../../assets/images/test2.jpg')}
            style={styles.banner}
            loading="lazy"
        />
    )

    const gotoRecord = (sauti, uri, duration) => {
        navigation.navigate('Record', {
            sautiName: sauti,
            sautiUri: uri,
            sautiDuration: duration,
        });
    }

    useEffect(() => {
        function handleBackButton() {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Record' }],
            })
          return true;
        }
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
        return () => backHandler.remove();
    }, [navigation]);
    

    const renderHeader = () => (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <View style={styles.headerWrapper}>
                <Animated.View>
                    <View style={styles.container}>
                        <TouchableOpacity
                        onPress={goBack}
                        >
                            <MaterialCommunityIcons size={30} name="arrow-left" color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>My Sauti</Text>
                        <View style={{paddingLeft: 30}}></View>
                    </View>
                    <View>
                    <Searchbar
                        style={{
                            borderRadius: 30,
                            height: 40,
                            marginHorizontal: 25,
                            backgroundColor: '#fff',
                        }}
                        inputStyle={{
                            fontSize: 14,
                            fontFamily: 'AbelRegular',
                        }}
                        selectTextOnFocus={false}
                        placeholder="Search"
                    />
                    </View>
                </Animated.View>
            </View>
        </SafeAreaView>
    )
    const isFocused = useIsFocused();

    return (
        <View style={{flex: 1}}>
            {isFocused && (
                <StickyParallaxHeader
                    headerType="TabbedHeader"
                    foreground={renderForeground}
                    header={renderHeader}
                    scrollEventThrottle={0}
                    transparentHeader={false}
                    parallaxHeight={180}
                    headerHeight={120}
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
                        title: "Yours",
                        icon: <MaterialCommunityIcons size={30} name="view-grid" color="#000" />,
                        content: <MySauti gotoRecord={gotoRecord} />
                    },
                    {
                        title: "Liked",
                        icon: <MaterialCommunityIcons size={30} name="heart-multiple" color="#000" />,
                        content: <MySauti gotoRecord={gotoRecord} />
                    }
                    ]}
                    tabTextStyle={styles.tabText}
                    tabTextContainerStyle={styles.tabTextContainerStyle}
                    tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
                    tabsWrapperStyle={styles.tabsWrapper}
                    >
                </StickyParallaxHeader>
            )}
        </View>
    )
}
export default SongsList;
