import React, { useState,useEffect } from 'react';
import { RefreshControl, View, Animated,  Text, Image } from 'react-native';
import PageView from 'react-native-pager-view';
import Feed from './Feed';
import test from '../../test.json';
import styles from '../styles/homestyles';
//import {Videos} from '../api/containers/Videos';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from '../api/actions/videoActions';
import { removeCurrentLike } from '../api/actions/videoLikeActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserDetails } from '../api/actions/userDetailsActions';
const PagerView = Animated.createAnimatedComponent(PageView);

const Home = ({ navigation }) => {
   
    const [tab, setTab] = useState(1);
    const [active, setActive] = useState(true);
    const [data, setData] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [clip, setClip] = useState(0);
    const [refreshing, setRefreshing] = React.useState(false);
    const [loggedUser, setLoggedUser] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const dispatch = useDispatch();
// const fetchData = async () => {  
//     try {
//         const videos = await Videos();
//         dispatch(fetchVideos(videos));
//         setIsLoading(false);

//     } catch (error) {
//         console.error(error);
//     };
// };
    const videos = useSelector(state => state.allVideos.videos);
    const userDetails = useSelector(state => state.userDetails.details);
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {      
                await setData(videos);
                await setLoggedUser(userDetails[0]);
                if(data && data !== [] && loggedUser) {     
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
            } 
        };
        fetchData();
        return () => isMounted = false;
    }, [videos, userDetails]);

    useEffect(() => {
        let isMounted = true; 
        const fetchLikeData = async () => {
            try { 
                const login = await AsyncStorage.getItem('userName');
                dispatch(await fetchUserDetails(login));
            } catch (e) {
                console.warn(e);
            }
        };
        fetchLikeData();
        return () => {
            isMounted = false;
        }
    }, []);

    useEffect(() => {
        let isMounted = true; 
        try {
        dispatch(fetchVideos());
        } catch (error) {
            console.error(error);
        };

        return () => isMounted = false;
    }, [userDetails]);
    
    //console.log("Videos: ", videos);

    if(isLoading){
        return <View style={{justifyContent: 'center', backgroundColor:'black', alignContent:'center', textAlign: 'center', height: '100%'}}><Text>Loading...</Text></View>;
    }

    const onPageScroll = (event) => {
        const position = event.nativeEvent.position;
        dispatch(removeCurrentLike());
        if(position !== clip) {
            setClip(position);
        }
    }

    return (
        <SafeAreaView style={styles.AndroidSafeArea}>      
            <View>  
                {!isLoading && (
                <View>
                    <View style={styles.header}>
                        <View style={styles.row}>
                            <View 
                            style={styles.headerText}
                            onPress={ () => setTab(1) }
                            >
                                <Text 
                                active={tab === 1}
                                style={styles.text}
                                >Yours</Text>
                            </View>
                            <Image 
                            source ={require('../../assets/images/Afrotok-icon.png')}
                            style={styles.logo}
                            />
                            <View 
                            style={styles.headerText}
                            onPress={ () => setTab(2) }
                            >
                                <Text 
                                    style={styles.text}
                                    active={tab === 1}>Trends
                                </Text>
                            </View>
                        </View>
                    </View>
                    <PagerView 
                    style={styles.pagerView}
                    initialPage={0}
                    orientation= "vertical"
                    onPageScroll={onPageScroll}
                    >
                    {data.map((item, index) => 
                        (
                                <View key={index}>
                                { (clip == index) && (
                                    <Feed 
                                        index={index} 
                                        id={item.id}
                                        item={(clip == index) ? item.clip : null}
                                        navigation={navigation}
                                        music={item.song.name}
                                        tags={item.post} 
                                        username={item.user.login} 
                                        userId={item.user.id}
                                        currentUser={loggedUser.user}
                                        comments={item.comments}
                                        likes={item.likes}
                                        play={(item.id) ? active : !active } 
                                        clip={item}
                                        //image={item.screenshot}
                                    />
                                )}
                                </View>                  
                        )
                    )
                    }
                    </PagerView>
                </View>
                )}
            </View>
        </SafeAreaView>
    )
}
export default Home;
