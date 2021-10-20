import React, { useState,useEffect } from 'react';
import { RefreshControl, View, Animated,  Text, Image } from 'react-native';
import PageView from 'react-native-pager-view';
import Feed from './Feed';
import test from '../../test.json';
import styles from '../styles/homestyles';
import Videos from '../api/containers/Videos';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from "react-redux";
import { setVideos } from '../api/actions/videoActions';

const PagerView = Animated.createAnimatedComponent(PageView);

const Home = ({ navigation }) => {
   
    const [tab, setTab] = useState(1);
    const [active, setActive] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [clip, setClip] = useState(0);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const dispatch = useDispatch();
    const videos = useSelector(state => state.allVideos.videos);
    const fetchData = async () => {  
        try {
            const videos = await Videos();
            dispatch(setVideos(videos));
            setIsLoading(false);

        } catch (error) {
            console.error(error);
        };
    };
    useEffect(() => {
        let isMounted = true;
        fetchData();
        return () => { isMounted = false };
    }, []);
    
    //console.log("Videos: ", videos);

    if(isLoading){
        return <View style={{justifyContent: 'center', backgroundColor:'black', alignContent:'center', textAlign: 'center', height: '100%'}}><Text>Loading...</Text></View>;
    }

    const onPageScroll = (event) => {
        const position = event.nativeEvent.position;
        if(position !== clip) {
            setClip(position);
            console.log("current clip", position);
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
                    {videos.map((item, index) => 
                        (
                                <View key={index}>
                                { (clip == index) && (
                                    <Feed 
                                        index={index} 
                                        item={(clip == index) ? item.clip : null}
                                        navigation={navigation}
                                        music={item.song.name}
                                        tags={item.post} 
                                        username={item.user.login} 
                                        comments={item.comments}
                                        likes={item.likes}
                                        play={(item.id) ? active : !active } 
                                        clip={clip}
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
